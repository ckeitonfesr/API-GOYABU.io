const axios = require("axios");
const cheerio = require("cheerio");

const SEARCH_API = "https://goyabu.io/wp-json/animeonline/search/";
const NONCE = "5ecb5079b5";

async function getGeneros(slug) {
  try {
    const { data } = await axios.get(`https://goyabu.io/anime/${slug}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 3000
    });
    const $ = cheerio.load(data);
    const generos = [];
    $('.filter-btn[href*="generos"]').each((i, el) => {
      const genero = $(el).text().trim();
      if (genero) generos.push(genero);
    });
    return generos;
  } catch {
    return [];
  }
}

module.exports = async (req, res) => {
  try {
    const keyword = String(req.query.keyword || "").trim();
    if (!keyword) return res.status(400).json({ error: "keyword vazio" });

    const url = new URL(SEARCH_API);
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("nonce", NONCE);

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" }
    });

    const data = await response.json();
    if (!data || !data.length) return res.status(200).json([]);

    const resultados = [];
    for (const item of data) {
      const generos = await getGeneros(item.slug);
      resultados.push({
        id: item.id,
        slug: item.slug,
        titulo: item.title,
        thumb: item.thumb || null,
        url: `https://goyabu.io/anime/${item.slug}`,
        generos: generos.length ? generos : ["Não informado"]
      });
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return res.status(200).json(resultados);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
