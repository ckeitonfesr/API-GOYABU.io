const axios = require("axios");

const AJAX = "https://goyabu.io/wp-admin/admin-ajax.php";
const BASE = "https://goyabu.io";

async function getEpisodios(animeId) {
  console.log("=".repeat(60));
  console.log(`🎬 BUSCANDO EPISÓDIOS DO ANIME ID: ${animeId}`);
  console.log("=".repeat(60));
  
  try {
    if (!animeId || !/^\d+$/.test(String(animeId))) {
      console.log("❌ anime_id inválido (use apenas números)");
      return;
    }

    const url = new URL(AJAX);
    url.searchParams.set("action", "get_anime_episodes");
    url.searchParams.set("anime_id", animeId);

    console.log(`\n📡 Chamando API: ${url.toString()}\n`);

    const response = await axios.get(url.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "https://goyabu.io/"
      },
      timeout: 10000
    });

    const data = response.data;

    if (data?.success && Array.isArray(data.data)) {
      const episodios = data.data.map(ep => ({
        id: ep.id,
        episodio: ep.episodio,
        link: BASE + ep.link,
        type: ep.type,
        episode_name: ep.episode_name || '',
        audio: ep.audio === 'ptBr' ? 'dublado' : 'legendado',
        imagem: ep.imagem ? BASE + ep.imagem : null,
        update: ep.update,
        status: ep.status || 'disponível'
      }));

      console.log(`✅ Encontrados ${episodios.length} episódios\n`);
      
      // Mostra os primeiros 5 como exemplo
      episodios.slice(0, 5).forEach((ep, index) => {
        console.log(`${index + 1}. Episódio ${ep.episodio}`);
        console.log(`   ID: ${ep.id}`);
        console.log(`   Áudio: ${ep.audio}`);
        console.log(`   Link: ${ep.link}`);
        console.log(`   Imagem: ${ep.imagem || 'Sem imagem'}`);
        console.log('   ---');
      });

      if (episodios.length > 5) {
        console.log(`... e mais ${episodios.length - 5} episódios`);
      }

      console.log("\n" + "=".repeat(60));
      
      // Retorna todos os episódios
      return {
        success: true,
        anime_id: animeId,
        total: episodios.length,
        episodios
      };
      
    } else {
      console.log("❌ Nenhum episódio encontrado para este anime");
      return { success: false, error: "Nenhum episódio encontrado" };
    }

  } catch (error) {
    console.error("\n❌ ERRO:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
    return { success: false, error: error.message };
  }
}

// 🎯 EXECUTAR - Passe o ID do anime
const args = process.argv.slice(2);
let animeId = args.length > 0 ? args[0] : "40927"; // 40927 = Overlord 4 Dublado

// Remove qualquer caractere não numérico
animeId = animeId.replace(/\D/g, '');

if (!animeId) {
  console.log("\n❌ ID inválido! Use: node test.js 40927");
  process.exit(1);
}

getEpisodios(animeId).then(result => {
  if (result?.success) {
    console.log(`\n✅ Total: ${result.total} episódios encontrados`);
  }
});
