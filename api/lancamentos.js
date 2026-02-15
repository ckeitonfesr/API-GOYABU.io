const axios = require("axios");
const cheerio = require("cheerio");

async function getTotalPaginas() {
  try {
    const { data } = await axios.get("https://goyabu.io/lancamentos", {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 10000
    });

    const $ = cheerio.load(data);
    
    // Tenta encontrar o total de páginas no texto da paginação
    const paginationText = $('.pagination, .wp-pagenavi, .nav-links').text();
    const match = paginationText.match(/de (\d+)/i) || paginationText.match(/(\d+)$/);
    
    if (match) return parseInt(match[1]);
    
    // Se não achar, pega o maior número nos links
    let total = 1;
    $('.page-numbers, .pagination a').each((i, el) => {
      const num = parseInt($(el).text().trim());
      if (!isNaN(num) && num > total) total = num;
    });
    
    return total;
  } catch {
    return 1571; // valor fallback
  }
}

module.exports = async (req, res) => {
  const { pagina = 1 } = req.query;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Busca total de páginas UMA VEZ (cache simples)
    if (!global.totalPaginas) {
      global.totalPaginas = await getTotalPaginas();
    }
    
    const url = pagina == 1 
      ? "https://goyabu.io/lancamentos" 
      : `https://goyabu.io/lancamentos/page/${pagina}/`;
    
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15000
    });

    const $ = cheerio.load(data);
    
    if (data.includes('404') || data.includes('não encontrada')) {
      return res.status(404).json({
        sucesso: false,
        mensagem: `Página ${pagina} não existe`,
        pagina: parseInt(pagina),
        total_paginas: global.totalPaginas
      });
    }
    
    const episodios = [];
    
    $('.boxEP.grid-view').each((i, el) => {
      const $el = $(el);
      const link = $el.find('a').first().attr('href') || '';
      const id = link.match(/\/(\d+)\/?$/)?.[1];
      const titulo = $el.find('.title').first().text().trim();
      const ep = $el.find('.ep-type b').text().replace('Episódio', '').trim();
      const dublado = $el.find('.audio-box.dublado').length > 0;
      
      const thumbStyle = $el.find('.coverImg').attr('style') || '';
      const thumb = thumbStyle.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || 
                    $el.find('.thumb.contentImg').attr('data-thumb');
      
      if (id && titulo) {
        episodios.push({
          id,
          titulo,
          link: link.startsWith('http') ? link : `https://goyabu.io${link}`,
          episodio: ep || 'N/A',
          dublado,
          thumb: thumb || null
        });
      }
    });

    return res.status(200).json({
      sucesso: true,
      pagina: parseInt(pagina),
      total_paginas: global.totalPaginas,
      total_episodios: episodios.length,
      dados: episodios
    });

  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message,
      pagina: parseInt(pagina)
    });
  }
};
