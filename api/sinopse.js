const cheerio = require("cheerio");

function slugify(text = "") {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanSinopse(s = "", title = "") {
  let text = String(s || "").replace(/\r/g, "").trim();

  text = text.replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").trim();

  const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (title) {
    const t = esc(title.trim());
    text = text.replace(new RegExp(`^${t}\\s*`, "i"), "").trim();
  }

  text = text
    .replace(
      /^.*?\b(Todos\s+os\s+Epis[oó]dios\s+Online|Assistir\s+.+?\s+Online|Anime\s+Completo)\b.*?\n+/i,
      ""
    )
    .trim();

  text = text.replace(/\b(Assistir|Baixar)\s+[^.\n]{0,80}\s+Online\b\.?/gi, "");
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  return text;
}

async function fetchText(url, timeoutMs = 12000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  try {
    const r = await fetch(url, {
      method: "GET",
      signal: ac.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      redirect: "follow",
    });

    const status = r.status;
    const text = await r.text();

    return { status, ok: r.ok, text };
  } finally {
    clearTimeout(t);
  }
}

module.exports = async (req, res) => {
  try {
    const raw = Array.isArray(req.query.nome) ? req.query.nome[0] : req.query.nome;
    const nome = decodeURIComponent(String(raw || "")).trim();
    if (!nome) return res.status(400).json({ error: "nome vazio" });

    const slug = slugify(nome);
    const url = `https://goyabu.io/anime/${slug}`;

    const { ok, status, text: html } = await fetchText(url, 12000);

    if (!ok) {
      if (status === 404) return res.status(404).json({ error: "Anime não encontrado" });
      return res.status(status || 502).json({ error: "Falha ao buscar página do anime" });
    }

    const $ = cheerio.load(html);

    const title =
      $("h1").first().text().trim() ||
      $("meta[property='og:title']").attr("content") ||
      nome;

    const full = $(".sinopse-full").text().trim();
    const short = $(".sinopse-short").text().trim();
    const rawSinopse = full || short || "";

    const sinopse = cleanSinopse(rawSinopse, title) || "Sinopse não encontrada";

    return res.status(200).json({ title, sinopse });
  } catch (err) {
    const isAbort = String(err?.name || "").includes("AbortError");
    return res.status(isAbort ? 504 : 500).json({
      error: isAbort ? "timeout ao buscar sinopse" : String(err?.message || err),
    });
  }
};
