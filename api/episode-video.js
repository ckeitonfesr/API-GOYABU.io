export default async function handler(req, res) {
  try {
    const episodeId = String(req.query.episode_id || "").trim();
    if (!episodeId)
      return res.status(400).json({ success: false, error: "episode_id vazio" });

    const pageUrl = `https://goyabu.io/${encodeURIComponent(episodeId)}`;

    return res.json({
      success: true,
      page_url: pageUrl
    });

  } catch (e) {
    return res.status(500).json({ success: false, error: String(e?.message || e) });
  }
}
