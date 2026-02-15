const SEARCH = "https://goyabu.io/wp-json/animeonline/search/";
const NONCE = "5ecb5079b5";

const CACHE_TTL_MS = 60_000; // 60s
const cache = globalThis.__SEARCH_CACHE__ || (globalThis.__SEARCH_CACHE__ = new Map());

function cacheGet(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.exp) { cache.delete(key); return null; }
  return hit.val;
}

function cacheSet(key, val, ttl = CACHE_TTL_MS) {
  cache.set(key, { val, exp: Date.now() + ttl });
}

function normalizeItem(item) {
  const { genres, status, audio, ...rest } = item || {};
  return { ...rest, dublado: /dublado/i.test(item?.title || "") };
}

module.exports = async (req, res) => {
  try {
    const keyword = String(req.query.keyword || "").trim();
    if (!keyword) return res.status(400).json({ success: false, error: "keyword vazio" });

    const cacheKey = `search:${keyword.toLowerCase()}`;
    const cached = cacheGet(cacheKey);
    if (cached) {
      res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cached);
    }

    const url = new URL(SEARCH);
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("nonce", NONCE);

    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 12_000);

    const response = await fetch(url.toString(), {
      signal: ac.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    }).finally(() => clearTimeout(t));

    const data = await response.json();

    let modified;
    if (Array.isArray(data)) {
      modified = data.map(normalizeItem);
    } else if (data && typeof data === "object") {
      modified = Object.fromEntries(
        Object.entries(data).map(([id, item]) => [id, normalizeItem(item)])
      );
    } else {
      modified = data;
    }

    if (response.ok) cacheSet(cacheKey, modified);

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
    res.setHeader("X-Cache", "MISS");
    return res.status(response.status).json(modified);
  } catch (err) {
    const isTimeout = String(err?.name || "").includes("AbortError");
    return res.status(isTimeout ? 504 : 500).json({
      success: false,
      error: isTimeout ? "timeout ao buscar search externo" : String(err?.message || err)
    });
  }
};
