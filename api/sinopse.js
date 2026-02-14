const axios = require("axios");
const cheerio = require("cheerio");

async function test() {
  try {
    const url = "https://goyabu.io/anime/douse-koishite-shimaunda-2";

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(data);

    // 📖 SINOPSE
    const full = $(".sinopse-full").text().trim();
    const short = $(".sinopse-short").text().trim();
    const sinopse = full || short || "Sinopse não encontrada";

    // 🖼️ IMAGEM (poster)
    const image =
      $(".anime-thumb img").attr("src") ||
      $(".poster img").attr("src") ||
      $("meta[property='og:image']").attr("content") ||
      "Imagem não encontrada";

    // 🎬 LINK PLAYER
    const playerLink =
      $("#player iframe").attr("src") ||
      $("iframe").attr("src") ||
      "Player não encontrado";

    console.log("=================================");
    console.log("📖 SINOPSE:");
    console.log(sinopse);

    console.log("\n🖼️ IMAGEM:");
    console.log(image);

    console.log("\n🎬 PLAYER:");
    console.log(playerLink);
    console.log("=================================");

  } catch (err) {
    console.error("ERRO:", err.message);
  }
}

test();
