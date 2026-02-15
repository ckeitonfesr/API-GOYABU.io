const SEARCH = "https://goyabu.io/wp-json/animeonline/search/";
const NONCE = "5ecb5079b5";

module.exports = async (req, res) => {
  try {
    const keyword = String(req.query.keyword || "").trim();

    if (!keyword) {
      return res.status(400).json({ success: false, error: "keyword vazio" });
    }

    const url = new URL(SEARCH);
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("nonce", NONCE);

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" }
    });

    const data = await response.json();

    const normalizeItem = (item) => {
      const { genres, status, audio, ...rest } = item || {};
      return {
        ...rest,
        dublado: /dublado/i.test((item?.title || ""))
      };
    };

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

    return res.status(response.status).json(modified);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: String(err?.message || err)
    });
  }
};
