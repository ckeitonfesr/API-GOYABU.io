import axios from "axios";
import * as cheerio from "cheerio";
import axiosRetry from "axios-retry";

const BASE_URL = "https://animefire.io";

// Lista de User-Agents para rotacionar
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0"
];

// Configurar retry para axios
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return error.response?.status === 403 || error.response?.status === 429 || error.code === 'ECONNRESET';
  }
});

// Headers base
const getHeaders = (userIp = null, customUserAgent = null) => {
  const headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": BASE_URL,
    "Origin": BASE_URL,
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0",
    "User-Agent": customUserAgent || USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
  };

  // Adicionar IP do usuário se disponível
  if (userIp) {
    headers["X-Forwarded-For"] = userIp;
    headers["X-Real-IP"] = userIp;
    headers["X-Forwarded-Host"] = req?.headers?.host || BASE_URL;
    headers["X-Forwarded-Proto"] = req?.headers?.['x-forwarded-proto'] || 'https';
    headers["CF-Connecting-IP"] = userIp; // Cloudflare
    headers["True-Client-IP"] = userIp; // Akamai
  }

  return headers;
};

// Função com proxy (se disponível)
async function fetchWithProxy(url, headers, useProxy = false) {
  if (!useProxy) {
    return await axios.get(url, { 
      headers, 
      timeout: 15000,
      maxRedirects: 5
    });
  }

  // Se quiser usar proxy, configure aqui
  // const proxyConfig = {
  //   host: 'proxy-server.com',
  //   port: 8080,
  //   auth: { username: 'user', password: 'pass' }
  // };
  // return await axios.get(url, { headers, timeout: 15000, proxy: proxyConfig });
}

// ==================== MÉTODO 1: Últimos Episódios ====================
async function getUltimosEpisodios(page = 1, userIp = null, useProxy = false) {
  const url = page === 1 ? BASE_URL : `${BASE_URL}/home/${page}`;
  
  // Tentar com 3 User-Agents diferentes
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const headers = getHeaders(userIp, USER_AGENTS[attempt]);
      const response = await fetchWithProxy(url, headers, useProxy);
      
      const $ = cheerio.load(response.data);
      const episodios = [];

      $(".divCardUltimosEpsHome").each((i, el) => {
        const link = $(el).find("a").first();
        const href = link.attr("href");
        if (!href) return;

        const titulo = $(el).find(".animeTitle").text().trim() || 
                      $(el).attr("title")?.replace(/\s*-\s*Episódio\s+\d+$/, "") || 
                      "N/A";

        const img = $(el).find("img");
        let imgSrc = img.attr("src") || img.attr("data-src") || "";
        if (imgSrc && !imgSrc.startsWith("http")) {
          imgSrc = `${BASE_URL}${imgSrc}`;
        }

        const match = href.match(/\/animes\/(.+?)\/(\d+)$/);
        if (!match) return;

        episodios.push({
          id: i + 1,
          titulo: titulo,
          animeId: match[1],
          episodio: match[2],
          url: href.startsWith("http") ? href : `${BASE_URL}${href}`,
          imagem: imgSrc,
          data: $(el).find(".ep-dateModified").text().trim() || "N/A"
        });
      });

      // Verificar próxima página
      const nextPageLink = $('.pagination .page-item:last-child a[href*="home"]').attr('href');
      
      return {
        success: true,
        method: "ultimos_episodios",
        page: page,
        total: episodios.length,
        userAgent: headers["User-Agent"],
        hasNextPage: !!nextPageLink,
        nextPage: nextPageLink ? page + 1 : null,
        episodios: episodios
      };

    } catch (error) {
      console.log(`⚠️ Tentativa ${attempt + 1} falhou:`, error.message);
      if (attempt === 2) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

// ==================== MÉTODO 2: Buscar por ID do Anime ====================
async function getAnimeInfo(animeId, userIp = null) {
  try {
    const url = `${BASE_URL}/animes/${animeId}`;
    const headers = getHeaders(userIp);
    
    const response = await axios.get(url, { headers, timeout: 10000 });
    const $ = cheerio.load(response.data);

    const info = {
      titulo: $('h1').first().text().trim() || "N/A",
      tituloOriginal: $('.text-gray').first().text().trim() || "N/A",
      score: $('#anime_score').text().trim() || "N/A",
      sinopse: $('.divSinopse .spanAnimeInfo').text().trim() || "N/A",
      generos: [],
      imagem: $('.divImgAnimePageInfo img').attr('src') || ""
    };

    $('.spanGenerosLink').each((i, el) => {
      info.generos.push($(el).text().trim());
    });

    return {
      success: true,
      method: "anime_info",
      ...info
    };

  } catch (error) {
    throw error;
  }
}

// ==================== MÉTODO 3: Episódios de um Anime ====================
async function getAnimeEpisodios(animeId, userIp = null) {
  try {
    const url = `${BASE_URL}/animes/${animeId}-todos-os-episodios`;
    const headers = getHeaders(userIp);
    
    const response = await axios.get(url, { headers, timeout: 10000 });
    const $ = cheerio.load(response.data);
    const episodios = [];

    $('a[href*="/animes/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (!href) return;
      
      const match = href.match(new RegExp(`${animeId}/(\\d+)$`));
      if (match) {
        episodios.push({
          numero: parseInt(match[1]),
          url: href.startsWith('http') ? href : `${BASE_URL}${href}`,
          titulo: $(el).text().trim() || `Episódio ${match[1]}`
        });
      }
    });

    return {
      success: true,
      method: "anime_episodios",
      animeId: animeId,
      total: episodios.length,
      episodios: episodios.sort((a, b) => a.numero - b.numero)
    };

  } catch (error) {
    throw error;
  }
}

// ==================== MÉTODO 4: Busca por Nome ====================
async function searchAnime(query, userIp = null) {
  try {
    const url = `${BASE_URL}/pesquisar/${encodeURIComponent(query)}`;
    const headers = getHeaders(userIp);
    
    const response = await axios.get(url, { headers, timeout: 10000 });
    const $ = cheerio.load(response.data);
    const resultados = [];

    $('.col-6.col-sm-4.col-md-3.col-lg-2.mb-1.minWDanime').each((i, el) => {
      const link = $(el).find('a').first();
      const href = link.attr('href');
      
      const match = href?.match(/\/animes\/(.+?)(-todos-os-episodios)?$/);
      if (!match) return;

      resultados.push({
        id: i + 1,
        titulo: $(el).find('.animeTitle').text().trim() || $(el).attr('title') || "N/A",
        animeId: match[1].replace('-todos-os-episodios', ''),
        score: $(el).find('.horaUltimosEps').text().trim() || "N/A",
        imagem: $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || ""
      });
    });

    return {
      success: true,
      method: "search",
      query: query,
      total: resultados.length,
      resultados: resultados
    };

  } catch (error) {
    throw error;
  }
}

// ==================== HANDLER PRINCIPAL ====================
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

  // Responder preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Pegar IP do usuário
  const userIp = req.headers['x-forwarded-for']?.split(',')[0] || 
                 req.headers['x-real-ip'] || 
                 req.socket.remoteAddress ||
                 'unknown';

  // Parâmetros da query
  const { 
    page,           // página para últimos episódios
    method,         // 'ultimos', 'info', 'episodios', 'search'
    animeId,        // ID do anime para info/episodios
    query,          // termo de busca
    useProxy        // usar proxy? (true/false)
  } = req.query;

  console.log(`📡 Requisição: method=${method}, page=${page}, ip=${userIp}`);

  try {
    let result;

    // ROTEAMENTO DOS MÉTODOS
    switch(method) {
      case 'info':
        if (!animeId) throw new Error("animeId é obrigatório");
        result = await getAnimeInfo(animeId, userIp);
        break;

      case 'episodios':
        if (!animeId) throw new Error("animeId é obrigatório");
        result = await getAnimeEpisodios(animeId, userIp);
        break;

      case 'search':
        if (!query) throw new Error("query é obrigatório");
        result = await searchAnime(query, userIp);
        break;

      case 'ultimos':
      default:
        const pageNum = parseInt(page) || 1;
        result = await getUltimosEpisodios(pageNum, userIp, useProxy === 'true');
        break;
    }

    return res.status(200).json({
      ...result,
      userIp: userIp,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Erro:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data?.substring(0, 200)
    });

    // Se for erro 403, sugere usar proxy
    const suggestion = error.response?.status === 403 
      ? "Tente adicionar &useProxy=true ou tente novamente em alguns segundos"
      : null;

    return res.status(error.response?.status || 500).json({
      success: false,
      error: error.message,
      status: error.response?.status,
      suggestion: suggestion,
      userIp: userIp,
      method: method || 'ultimos',
      timestamp: new Date().toISOString()
    });
  }
}
