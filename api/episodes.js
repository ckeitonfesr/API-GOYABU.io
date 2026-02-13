const AJAX = "https://goyabu.io/wp-admin/admin-ajax.php";

export default async function handler(req, res) {
  try {
    const animeId = String(req.query.anime_id || "").trim();
    if (!animeId) return res.status(400).json({ error: "anime_id vazio" });

    const u = new URL(AJAX);
    u.searchParams.set("action", "get_anime_episodes");
    u.searchParams.set("anime_id", animeId);

    const r = await fetch(u.toString(), {
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    const text = await r.text();

    res.status(r.status);
    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.send(text);

  } catch (e) {
    res.status(500).json({ error: String(e?.message || e) });
  }
}
