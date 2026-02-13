const SEARCH = "https://goyabu.io/wp-json/animeonline/search/";
const NONCE = "5ecb5079b5";

export default async function handler(req, res) {
  try {
    const keyword = String(req.query.keyword || "").trim();
    if (!keyword) return res.status(400).json({ error: "keyword vazio" });

    const u = new URL(SEARCH);
    u.searchParams.set("keyword", keyword);
    u.searchParams.set("nonce", NONCE);

    const r = await fetch(u.toString(), {
      headers: { Accept: "application/json" }
    });

    const text = await r.text();

    res.status(r.status);
    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.send(text);

  } catch (e) {
    res.status(500).json({ error: String(e?.message || e) });
  }
}
