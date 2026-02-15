const SEARCH = "https://goyabu.io/wp-json/animeonline/search/";
const NONCE = "5ecb5079b5";

module.exports = async (req, res) => {
  try {
    const keyword = String(req.query.keyword || "").trim();

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: "keyword vazio"
      });
    }

    const url = new URL(SEARCH);
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("nonce", NONCE);

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json"
      }
    });

    const data = await response.json();

    const modified = Array.isArray(data)
      ? data.map(item => ({
          ...item,
          dublado: /dublado/i.test(item.title || "")
        }))
      : data;

    return res.status(response.status).json(modified);

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: String(err?.message || err)
    });
  }
};
