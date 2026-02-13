import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const episodeId = String(req.query.episode_id || "").trim();
    if (!episodeId) {
      return res.status(400).json({ success: false });
    }

    const pageUrl = `https://goyabu.io/${episodeId}`;

    const { data } = await axios.get(pageUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);

    const encrypted = $('.player-tab[data-player-type="iframe"]').attr("data-blogger-url-encrypted");

    if (encrypted) {
      const decoded = Buffer.from(encrypted, "base64").toString("utf8");
      const link = decoded.split("").reverse().join("");

      return res.status(200).json({
        success: true,
        video_url: link
      });
    }

    return res.status(200).json({
      success: false,
      error: "Não encontrou vídeo"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
