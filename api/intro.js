// intro.js
// Rode com: node intro.js

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",

  white: "\x1b[37m",
  gray: "\x1b[90m",

  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",

  cyan: "\x1b[36m",
};

function line(char = "─", size = 70) {
  return char.repeat(size);
}

function title(text) {
  console.log(`${C.blue}${C.bold}${text}${C.reset}`);
}

function section(label, color = C.white) {
  console.log(`\n${color}${C.bold}➤ ${label}${C.reset}`);
  console.log(`${C.gray}${line()}${C.reset}`);
}

function bullet(color, text) {
  console.log(`${color}•${C.reset} ${C.white}${text}${C.reset}`);
}

function code(text) {
  console.log(`${C.gray}${text}${C.reset}`);
}

function url(text) {
  console.log(`${C.cyan}${text}${C.reset}`);
}

console.clear();

title("🟦 Anime API — INTRO (Goyabu Scraper)");
console.log(`${C.gray}Arquivo de introdução/documentação em JS (console).${C.reset}`);
console.log(`${C.gray}${line("═")}${C.reset}`);

section("⬜ O que essa API faz?", C.white);
bullet(C.blue, "Busca animes no goyabu.io e retorna dados em JSON.");
bullet(C.blue, "Pega sinopse/título por nome (slug).");
bullet(C.green, "Lista episódios por anime_id.");
bullet(C.red, "Extrai link do player por episode_id.");

section("🟩 Dependências (instalar uma vez)", C.green);
bullet(C.green, "axios  → faz requisições HTTP");
bullet(C.green, "cheerio → lê HTML e extrai elementos (scraping)");
console.log();
code("npm install axios cheerio");

section("🟦 Endpoints disponíveis", C.blue);

console.log(`${C.blue}${C.bold}\n1) SEARCH — buscar anime por palavra${C.reset}`);
bullet(C.white, "Arquivo: api/search.js");
bullet(C.white, "Parâmetro: keyword");
url("Exemplo:");
code("GET /api/search?keyword=overlord");
console.log(`${C.gray}Retorna: JSON do próprio endpoint wp-json do site.${C.reset}`);

console.log(`${C.green}${C.bold}\n2) EPISODES — listar episódios por anime_id${C.reset}`);
bullet(C.white, "Arquivo: api/episodes.js");
bullet(C.white, "Parâmetro: anime_id");
url("Exemplo:");
code("GET /api/episodes?anime_id=69624");
console.log(`${C.gray}Retorna: lista de episódios (admin-ajax.php).${C.reset}`);

console.log(`${C.red}${C.bold}\n3) EPISODE VIDEO — pegar link do vídeo por episode_id${C.reset}`);
bullet(C.white, "Arquivo: api/episode-video.js");
bullet(C.white, "Parâmetro: episode_id");
url("Exemplo:");
code("GET /api/episode-video?episode_id=123456");
console.log(`${C.gray}Métodos de extração:${C.reset}`);
bullet(C.red, '1) data-blogger-url-encrypted (decodifica base64 + reverse)');
bullet(C.red, '2) blogger_token dentro de <script> (gera link blogger.com/video.g?token=...)');

console.log(`${C.blue}${C.bold}\n4) SINOPSE — título + sinopse por NOME (slugify)${C.reset}`);
bullet(C.white, "Arquivo: api/sinopse/[nome].js (rota dinâmica)");
bullet(C.white, "Parâmetro: nome vem pela URL (/sinopse/<nome>)");
url("Exemplo:");
code("GET /api/sinopse/isekai%20dark%20web");
console.log(`${C.gray}O nome vira slug:${C.reset}`);
code('"isekai dark web" -> "isekai-dark-web"');
console.log(`${C.gray}Retorna só:${C.reset}`);
code('{ "title": "...", "sinopse": "..." }');

section("🟥 Problemas comuns (e solução)", C.red);
bullet(C.red, "404 NOT_FOUND na sua API?");
bullet(C.white, "→ Você chamou /api/sinopse/NOME mas não criou rota dinâmica.");
bullet(C.white, "→ Solução: criar api/sinopse/[nome].js");
console.log();
bullet(C.red, "404 ao buscar no goyabu?");
bullet(C.white, "→ O slug gerado não existe. O site pode usar outro slug.");
bullet(C.white, "→ Solução avançada: usar search endpoint pra obter a URL correta.");

section("🟩 Dicas de uso", C.green);
bullet(C.green, "Sempre encode o nome na URL (espaço vira %20).");
bullet(C.green, "Cache ajuda muito (pra não bater no site toda hora).");
bullet(C.green, "Timeouts evitam travar a função.");
bullet(C.green, "Se o site mudar HTML, atualize os seletores do cheerio.");

section("⬜ Testes rápidos", C.white);
url("Testar sinopse:");
code("curl \"http://localhost:3000/api/sinopse/isekai%20dark%20web\"");
console.log();
url("Testar search:");
code("curl \"http://localhost:3000/api/search?keyword=overlord\"");
console.log();
url("Testar episodes:");
code("curl \"http://localhost:3000/api/episodes?anime_id=69624\"");
console.log();
url("Testar episode-video:");
code("curl \"http://localhost:3000/api/episode-video?episode_id=123456\"");

console.log(`\n${C.gray}${line("═")}${C.reset}`);
console.log(`${C.white}${C.bold}Pronto.${C.reset} ${C.gray}Rode este arquivo sempre que quiser ver a introdução.${C.reset}`);
console.log(`${C.gray}Comando:${C.reset} ${C.white}node intro.js${C.reset}\n`);
