const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id || !/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: "ID inválido. Use apenas número.",
        example: "/api/sinopse/69698"
      });
    }

    const pageUrl = `https://goyabu.io/${id}`;

    const { data } = await axios.get(pageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,*/*"
      }
    });

    const $ = cheerio.load(data);

    const full = $(".sinopse-full").text().trim();
    const short = $(".sinopse-short").text().trim();
    const sinopse = full || short || "Sinopse não encontrada";

    const image =
      $(".anime-thumb img").attr("src") ||
      $("meta[property='og:image']").attr("content") ||
      "";

    const title =
      $("h1").first().text().trim() ||
      $("meta[property='og:title']").attr("content") ||
      "";
    
    // Pegar link do player
    const playerLink = $("#player iframe").attr("src") || "";

    return res.status(200).json({
      success: true,
      id,
      page_url: pageUrl,
      title,
      image,
      sinopse,
      player_link: playerLink // Novo campo com o link do player
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err?.message || String(err)
    });
  }
};
