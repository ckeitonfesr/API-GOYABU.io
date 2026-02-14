const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = "https://goyabu.io/anime/";

module.exports = async (req, res) => {
  try {
    // Pega o ID da query string (ex: ?id=overlord-4-dublado-online)
    const id = String(req.query.id || "").trim();

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "ID do anime não fornecido. Use ?id=nome-do-anime"
      });
    }

    // Constrói a URL completa
    const url = BASE_URL + id;

    // Verificação básica para evitar injeção ou URLs inválidas
    if (!url.startsWith(BASE_URL)) {
      return res.status(400).json({
        success: false,
        error: "ID inválido"
      });
    }

    console.log(`Buscando sinopse para: ${url}`);

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    const $ = cheerio.load(data);

    // Pegar sinopse (tentando diferentes seletores que podem existir na página)
    let sinopse = $(".sinopse-full").text().trim();
    if (!sinopse) {
      sinopse = $(".sinopse-short").text().trim();
    }
    if (!sinopse) {
      // Se não encontrar com as classes específicas, tenta um seletor mais genérico
      sinopse = $(".anime-sinopse").text().trim() || 
                $(".description p").first().text().trim() ||
                $("meta[name='description']").attr("content");
    }

    // Limpeza básica da sinopse
    sinopse = sinopse.replace(/\s+/g, ' ').trim();

    // Retornar os dados no mesmo formato do seu endpoint de busca
    return res.status(200).json({
      success: true,
      data: {
        id: id,
        url: url,
        sinopse: sinopse || "Sinopse não encontrada"
      }
    });

  } catch (error) {
    console.error("Erro detalhado:", error);
    
    // Tratamento especial para erro 404 (anime não encontrado)
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        error: "Anime não encontrado. Verifique o ID fornecido."
      });
    }

    return res.status(500).json({
      success: false,
      error: error?.message || "Erro interno do servidor"
    });
  }
};
