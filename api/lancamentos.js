const axios = require("axios");

async function getLancamentos(pagina) {
  try {
    console.log(`Pagina ${pagina}...`);
    
    const { data } = await axios.get(`https://goyabu.io/lancamentos/page/${pagina}/`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html"
      },
      timeout: 10000
    });

    return {
      sucesso: true,
      pagina: pagina,
      dados: data.substring(0, 200)
    };

  } catch (error) {
    return {
      sucesso: false,
      pagina: pagina,
      erro: error.message
    };
  }
}

async function main() {
  const pagina = 10;
  const resultado = await getLancamentos(pagina);
  console.log(resultado);
}

main();
