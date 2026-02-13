const axiosPkg = require("axios");
const cheerioPkg = require("cheerio");

const axios = axiosPkg.default || axiosPkg;
const cheerioLoad = cheerioPkg.load || (cheerioPkg.default && cheerioPkg.default.load);

const SEARCH = "https://goyabu.io/wp-json/animeonline/search/";
const AJAX = "https://goyabu.io/wp-admin/admin-ajax.php";
const NONCE = "5ecb5079b5";

async function fetchText(url, headers = {}) {
  const r = await fetch(url, { headers: { Accept: "*/*", ...headers } });
  const text = await r.text();
  return { status: r.status, contentType: r.headers.get("content-type") || "application/json", text };
}

async function fetchJson(url, headers = {}) {
  const r = await fetch(url, { headers: { Accept: "application/json", ...headers } });
  const data = await r.json();
  return { status: r.status, data };
}

function json(res, status, obj) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(obj));
}

function proxyText(res, status, contentType, text) {
  res.statusCode = status;
  res.setHeader("Content-Type", contentType);
  res.end(text);
}

async function handleSearch(req, res) {
  const keyword = String(req.query.keyword || "").trim();
  if (!keyword) return json(res, 400, { success: false, error: "keyword vazio" });

  const url = new URL(SEARCH);
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("nonce", NONCE);

  const out = await fetchText(url.toString(), { Accept: "application/json" });
  return proxyText(res, out.status, out.contentType, out.text);
}

async function handleEpisodes(req, res) {
  const animeId = String(req.query.anime_id || "").trim();
  if (!animeId) return json(res, 400, { success: false, error: "anime_id vazio" });

  const url = new URL(AJAX);
  url.searchParams.set("action", "get_anime_episodes");
  url.searchParams.set("anime_id", animeId);

  const out = await fetchText(url.toString(), {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest"
  });

  return proxyText(res, out.status, out.contentType, out.text);
}

async function handleEpisodeVideo(req, res) {
  const episodeId = String(req.query.episode_id || "").trim();
  if (!episodeId) return json(res, 400, { success: false, error: "episode_id vazio" });

  if (!cheerioLoad) {
    return json(res, 500, { success: false, error: "Cheerio load() não disponível." });
  }

  const pageUrl = `https://goyabu.io/${encodeURIComponent(episodeId)}`;

  const { data: html } = await axios.get(pageUrl, {
    headers: { "User-Agent": "Mozilla/5.0", Accept: "text/html,*/*" }
  });

  const $ = cheerioLoad(html);

  const encrypted = $('.player-tab[data-player-type="iframe"]').attr("data-blogger-url-encrypted");
  if (encrypted) {
    const decoded = Buffer.from(encrypted, "base64").toString("utf8");
    const link = decoded.split("").reverse().join("");
    return json(res, 200, { success: true, video_url: link, source: "iframe_player" });
  }

  const scriptText = $("script").text();
  const match = scriptText.match(/blogger_token":"([^"]+)"/);
  if (match) {
    const bloggerLink = `https://www.blogger.com/video.g?token=${match[1]}`;
    return json(res, 200, { success: true, video_url: bloggerLink, source: "blogger_token" });
  }

  return json(res, 200, { success: false, error: "Não foi possível extrair o vídeo", page_url: pageUrl });
}

module.exports = async (req, res) => {
  try {
    const endpoint = String(req.query.endpoint || "").trim().toLowerCase();
    if (!endpoint) {
      return json(res, 200, {
        success: true,
        endpoints: {
          search: "/api/all?endpoint=search&keyword=overlord",
          episodes: "/api/all?endpoint=episodes&anime_id=12345",
          episode_video: "/api/all?endpoint=episode-video&episode_id=69695"
        }
      });
    }

    if (endpoint === "search") return await handleSearch(req, res);
    if (endpoint === "episodes") return await handleEpisodes(req, res);
    if (endpoint === "episode-video" || endpoint === "episode_video") return await handleEpisodeVideo(req, res);

    return json(res, 400, { success: false, error: "endpoint inválido", endpoint });
  } catch (err) {
    return json(res, 500, { success: false, error: err?.message || String(err) });
  }
};
