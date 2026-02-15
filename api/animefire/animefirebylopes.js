import axios from "axios";
import cheerio from "cheerio";

const baseUrl = "https://animefire.io";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
};

// ==================== LANÇAMENTOS ====================
async function getLancamentos() {
  const response = await axios.get(baseUrl, { headers });
  const $ = cheerio.load(response.data);
  const lancamentos = [];

  $(".owl-carousel-home .owl-item .divArticleLancamentos").each(
    (i, el) => {
      const card = $(el);
      const link = card.find("a").first();
      const href = link.attr("href");

      const titulo =
        card.find(".animeTitle").text().trim() ||
        card.attr("title") ||
        "N/A";

      const imgSrc =
        card.find("img").attr("src") ||
        card.find("img").attr("data-src") ||
        "";

      const imagem = imgSrc.startsWith("http")
        ? imgSrc
        : `${baseUrl}${imgSrc}`;

      const score =
        card.find(".horaUltimosEps").text().trim() || "N/A";

      let animeId = null;
      if (href) {
        const match = href.match(
          /\/animes\/(.+?)(-todos-os-episodios)?$/
        );
        if (match) animeId = match[1];
      }

      if (animeId) {
        lancamentos.push({
          titulo,
          animeId,
          url: href.startsWith("http")
            ? href
            : `${baseUrl}${href}`,
          imagem,
          score,
          tipo: "lancamento",
        });
      }
    }
  );

  return lancamentos;
}

// ==================== DESTAQUES ====================
async function getDestaquesSemana() {
  const response = await axios.get(baseUrl, { headers });
  const $ = cheerio.load(response.data);
  const destaques = [];

  $(".owl-carousel-semana .owl-item .divArticleLancamentos").each(
    (i, el) => {
      const card = $(el);
      const link = card.find("a").first();
      const href = link.attr("href");

      const titulo =
        card.find(".animeTitle").text().trim() ||
        card.attr("title") ||
        "N/A";

      const posicao =
        card.find(".numbTopTen").text().trim() || "N/A";

      let animeId = null;
      if (href) {
        const match = href.match(
          /\/animes\/(.+?)(-todos-os-episodios)?$/
        );
        if (match) animeId = match[1];
      }

      if (animeId) {
        destaques.push({
          posicao,
          titulo,
          animeId,
          url: href.startsWith("http")
            ? href
            : `${baseUrl}${href}`,
          tipo: "destaque",
        });
      }
    }
  );

  return destaques;
}

// ==================== ÚLTIMOS EPISÓDIOS ====================
async function getUltimosEpisodios(page = 1) {
  const url =
    page === 1 ? baseUrl : `${baseUrl}/home/${page}`;

  const response = await axios.get(url, { headers });
  const $ = cheerio.load(response.data);
  const episodios = [];

  $(".divCardUltimosEpsHome").each((i, el) => {
    const card = $(el);
    const link = card.find("a").first();
    const href = link.attr("href");

    const titulo =
      card.find(".animeTitle").text().trim() ||
      card.attr("title") ||
      "N/A";

    const numEp =
      card.find(".numEp").text().trim() || "N/A";

    let animeId = null;
    let epNum = null;

    if (href) {
      const match = href.match(
        /\/animes\/(.+?)\/(\d+)$/
      );
      if (match) {
        animeId = match[1];
        epNum = match[2];
      }
    }

    if (animeId) {
      episodios.push({
        titulo,
        animeId,
        episodio: epNum || numEp,
        url: href.startsWith("http")
          ? href
          : `${baseUrl}${href}`,
        tipo: "episodio",
      });
    }
  });

  return {
    currentPage: page,
    total: episodios.length,
    episodios,
  };
}

// ==================== TODAS PÁGINAS ====================
async function getAllUltimosEpisodios(maxPages = 5) {
  let all = [];

  for (let i = 1; i <= maxPages; i++) {
    const data = await getUltimosEpisodios(i);
    all = [...all, ...data.episodios];
  }

  return {
    total: all.length,
    episodios: all,
  };
}

// ==================== HANDLER VERCEL ====================
export default async function handler(req, res) {
  const { type, page, maxPages } = req.query;

  if (!type) {
    return res.status(400).json({
      error:
        "Informe o parâmetro ?type=lancamentos|destaques|episodios|all",
    });
  }

  try {
    if (type === "lancamentos") {
      const data = await getLancamentos();
      return res.status(200).json({ total: data.length, data });
    }

    if (type === "destaques") {
      const data = await getDestaquesSemana();
      return res.status(200).json({ total: data.length, data });
    }

    if (type === "episodios") {
      const data = await getUltimosEpisodios(
        parseInt(page) || 1
      );
      return res.status(200).json(data);
    }

    if (type === "all") {
      const data = await getAllUltimosEpisodios(
        parseInt(maxPages) || 5
      );
      return res.status(200).json(data);
    }

    return res.status(400).json({
      error: "Tipo inválido.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno",
      message: error.message,
    });
  }
}
