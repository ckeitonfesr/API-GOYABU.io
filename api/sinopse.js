const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const episodeId = String(req.query.episode_id || "").trim();
    const rawUrl = String(req.query.url || "").trim();

    if (!episodeId && !rawUrl) {
      return res.status(200).json({
        success: true,
        how_to_use: {
          by_episode_id: "/api/sinopse?episode_id=69698",
          by_url: "/api/sinopse?url=https://goyabu.io/anime/douse-koishite-shimaunda-2"
        }
      });
    }

    const pageUrl = rawUrl
      ? rawUrl
      : `https://goyabu.io/${encodeURIComponent(episodeId)}`;

    const { data } = await axios.get(pageUrl, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "text/html,*/*" }
    });

    const $ = cheerio.load(data);

    const full = $(".sinopse-full").text().trim();
    const short = $(".sinopse-short").text().trim();
    const sinopse = full || short || "";

    const playerLink = $("#player iframe").attr("src") || $("iframe").attr("src") || "";

    const image =
      $(".anime-thumb img").attr("src") ||
      $(".poster img").attr("src") ||
      $("meta[property='og:image']").attr("content") ||
      "";

    return res.status(200).json({
      success: true,
      page_url: pageUrl,
      sinopse,
      image,
      player_iframe: playerLink
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err?.message || String(err)
    });
  }
};
