const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  const { pagina = 1 } = req.query;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log(`Buscando pagina ${pagina}`);
    
    const url = pagina == 1 
      ? "https://goyabu.io/lancamentos" 
      : `https://goyabu.io/lancamentos/page/${pagina}/`;
    
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html"
      },
      timeout: 15000
    });

    const $ = cheerio.load(data);
    
    if ($('title').text().includes('404') || data.includes('não encontrada')) {
      return res.status(404).json({
        erro: true,
        mensagem: `Pagina ${pagina} nao existe`,
        pagina: parseInt(pagina)
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
      total_episodios: episodios.length,
      dados: episodios
    });

  } catch (error) {
    return res.status(500).json({
      erro: true,
      mensagem: error.message,
      pagina: parseInt(pagina)
    });
  }
};
