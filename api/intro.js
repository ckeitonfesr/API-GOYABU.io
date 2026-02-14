module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const base = "https://anime-api-kappa-one.vercel.app";

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>Anime API — Docs</title>
  <meta name="description" content="Documentação da Anime API (Goyabu). Search, Episodes, Episode Video e Sinopse." />
  <meta name="theme-color" content="#0b0f1a" />
  <style>
    :root{
      --bg0:#070912;
      --bg1:#0a1022;
      --panel: rgba(255,255,255,.06);
      --panel2: rgba(255,255,255,.085);
      --stroke: rgba(255,255,255,.10);
      --stroke2: rgba(255,255,255,.14);
      --text:#eaf1ff;
      --muted: rgba(234,241,255,.72);
      --muted2: rgba(234,241,255,.55);
      --accent:#7c5cff;
      --accent2:#23d5ab;
      --danger:#ff4d7d;
      --warn:#ffd24d;
      --radius: 18px;
      --shadow: 0 30px 100px rgba(0,0,0,.55);
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family:var(--sans);
      color:var(--text);
      background:
        radial-gradient(900px 500px at 15% -10%, rgba(124,92,255,.28), transparent 55%),
        radial-gradient(800px 520px at 95% 10%, rgba(35,213,171,.18), transparent 55%),
        radial-gradient(900px 520px at 50% 120%, rgba(255,77,125,.12), transparent 55%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow-x:hidden;
    }
    a{color:inherit;text-decoration:none}
    .wrap{max-width:1120px;margin:0 auto;padding:18px 14px 60px}
    .nav{
      position:sticky; top:0; z-index:50;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      background: rgba(7,9,18,.65);
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .navin{
      max-width:1120px;margin:0 auto;
      display:flex;align-items:center;justify-content:space-between;gap:12px;
      padding:10px 14px;
    }
    .logo{
      display:flex;align-items:center;gap:10px;
      font-weight:900; letter-spacing:.2px;
    }
    .mark{
      width:34px;height:34px;border-radius:12px;
      background:
        radial-gradient(18px 18px at 30% 30%, rgba(255,255,255,.35), transparent 60%),
        linear-gradient(135deg, rgba(124,92,255,1), rgba(35,213,171,1));
      box-shadow: 0 18px 40px rgba(124,92,255,.20);
      border:1px solid rgba(255,255,255,.14);
    }
    .navlinks{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
    .chip{
      font-family:var(--mono);
      font-size:12px;
      padding:7px 10px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.20);
      color: rgba(234,241,255,.82);
    }
    .chip b{color:var(--text)}
    .btn{
      display:inline-flex;align-items:center;gap:10px;
      padding:10px 12px;border-radius:14px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.06);
      font-weight:800;
      transition:.18s transform ease,.18s background ease;
    }
    .btn:hover{transform:translateY(-1px);background: rgba(255,255,255,.10)}
    .hero{
      margin-top:18px;
      border:1px solid rgba(255,255,255,.10);
      background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03));
      border-radius: 26px;
      padding: 18px;
      box-shadow: var(--shadow);
      position:relative;
      overflow:hidden;
    }
    .hero:before{
      content:"";
      position:absolute; inset:-2px;
      background:
        radial-gradient(680px 260px at 20% 10%, rgba(124,92,255,.30), transparent 60%),
        radial-gradient(620px 260px at 95% 20%, rgba(35,213,171,.18), transparent 60%),
        radial-gradient(520px 240px at 55% 120%, rgba(255,77,125,.14), transparent 60%);
      filter: blur(16px);
      opacity: .9;
      pointer-events:none;
    }
    .hero > *{position:relative}
    .heroin{
      display:grid;
      grid-template-columns: 1.25fr .75fr;
      gap: 14px;
      align-items:stretch;
    }
    @media (max-width: 900px){
      .heroin{grid-template-columns:1fr}
    }
    h1{
      margin:0;
      font-size: clamp(22px, 3.2vw, 34px);
      letter-spacing: -.6px;
      line-height:1.15;
    }
    .sub{
      margin:10px 0 0;
      color: var(--muted);
      line-height:1.65;
      max-width: 70ch;
      font-size: 14px;
    }
    .badges{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
    .badge{
      display:inline-flex;align-items:center;gap:8px;
      padding:8px 10px;border-radius:999px;
      border:1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.18);
      font-family: var(--mono);
      font-size:12px;
      color: rgba(234,241,255,.80);
    }
    .dot{width:8px;height:8px;border-radius:99px;background:var(--accent2);box-shadow:0 0 0 4px rgba(35,213,171,.15)}
    .panel{
      border:1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.18);
      border-radius: 20px;
      padding: 14px;
    }
    .panel h3{margin:0 0 8px;font-size:14px}
    .panel p{margin:0;color:var(--muted);line-height:1.6;font-size:13px}
    .credits{
      margin-top:10px;
      font-family: var(--mono);
      color: rgba(234,241,255,.78);
      font-size:12px;
    }
    .credits b{color:var(--text)}
    .grid{
      margin-top:14px;
      display:grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 12px;
    }
    .card{
      grid-column: span 6;
      border:1px solid rgba(255,255,255,.10);
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
      border-radius: var(--radius);
      padding: 14px;
      position:relative;
      overflow:hidden;
    }
    .card:before{
      content:"";
      position:absolute; inset:-2px;
      background: radial-gradient(450px 180px at 10% 10%, rgba(124,92,255,.10), transparent 60%);
      opacity:.8;
      pointer-events:none;
    }
    .card > *{position:relative}
    @media (max-width: 900px){ .card{grid-column: span 12} }
    .k{
      display:flex;align-items:center;justify-content:space-between;gap:10px;
      flex-wrap:wrap;
      margin-bottom:8px;
    }
    .method{
      font-family: var(--mono);
      font-weight:900;
      font-size:12px;
      padding:6px 10px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.20);
    }
    .m-blue{color:#8fb2ff}
    .m-green{color:#7bf0c8}
    .m-red{color:#ff85a6}
    .m-yellow{color:#ffe08a}
    .route{
      font-family: var(--mono);
      font-size:12px;
      color: rgba(234,241,255,.86);
      word-break: break-word;
    }
    .desc{
      margin:0;
      color: var(--muted);
      font-size:13px;
      line-height:1.6;
    }
    pre{
      margin:12px 0 0;
      padding:12px;
      border-radius: 16px;
      border:1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.30);
      overflow:auto;
      font-family: var(--mono);
      font-size:12.5px;
      line-height:1.55;
      color: rgba(234,241,255,.92);
    }
    .row{
      display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;
    }
    .mini{
      display:inline-flex;align-items:center;gap:8px;
      padding:9px 10px;border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background: rgba(255,255,255,.06);
      font-weight:800;
      cursor:pointer;
      user-select:none;
    }
    .mini:hover{background: rgba(255,255,255,.10)}
    .note{
      margin-top:12px;
      border:1px solid rgba(255,255,255,.10);
      background: rgba(0,0,0,.18);
      border-radius: 20px;
      padding: 14px;
      color: var(--muted);
      line-height: 1.65;
      font-size: 13px;
    }
    .note b{color:var(--text)}
    .note code{
      font-family: var(--mono);
      font-size: 12px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.10);
      padding: 2px 6px;
      border-radius: 10px;
      color: rgba(234,241,255,.90);
    }
    .footer{
      margin-top:14px;
      display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;
      color: rgba(234,241,255,.60);
      font-size: 12px;
      font-family: var(--mono);
      padding: 10px 2px;
    }
    .toast{
      position:fixed;
      left:50%;
      bottom:18px;
      transform:translateX(-50%);
      padding:10px 12px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.65);
      color: rgba(234,241,255,.9);
      font-family: var(--mono);
      font-size: 12px;
      opacity:0;
      pointer-events:none;
      transition:.2s ease;
    }
    .toast.on{opacity:1}
  </style>
</head>
<body>
  <div class="nav">
    <div class="navin">
      <div class="logo">
        <div class="mark"></div>
        <div>Anime API</div>
      </div>
      <div class="navlinks">
        <div class="chip">owner: <b>DVHACKZ</b></div>
        <div class="chip">status: <b>online</b></div>
        <a class="btn" href="/api/search?keyword=overlord">test search</a>
      </div>
    </div>
  </div>

  <div class="wrap">
    <section class="hero">
      <div class="heroin">
        <div>
          <h1>Documentação oficial da Anime API</h1>
          <p class="sub">
            Aqui você encontra os endpoints prontos para buscar animes, listar episódios, extrair link do vídeo
            e pegar sinopse. Tudo em JSON e no estilo simples: você chama a rota e recebe o resultado.
          </p>

          <div class="badges">
            <span class="badge"><span class="dot"></span>online</span>
            <span class="badge">base: ${base}</span>
            <span class="badge">source: goyabu.io</span>
            <span class="badge">credits: DVHACKZ</span>
          </div>
        </div>

        <div class="panel">
          <h3>Como funciona a sinopse por nome?</h3>
          <p>
            Você pode passar o nome do anime com espaços (na URL vira <b>%20</b>).
            A API recebe esse nome, faz a conversão automática para um <b>slug</b> e monta a URL certa do site.
          </p>
          <div class="credits">
            exemplo: <b>isekai dark web</b> vira <b>isekai-dark-web</b>
          </div>
        </div>
      </div>

      <div class="note">
        Dica importante: no navegador, espaço na URL vira <code>%20</code>.
        Então você pode chamar assim:
        <b>${base}/api/sinopse/isekai%20dark%20web</b>
        e a própria API converte para a página:
        <code>https://goyabu.io/anime/isekai-dark-web</code>.
      </div>
    </section>

    <section class="grid">
      <article class="card">
        <div class="k">
          <span class="method m-blue">GET</span>
          <div class="route">/api/search?keyword=nome</div>
        </div>
        <p class="desc">Busca anime por palavra-chave usando o endpoint wp-json do site.</p>
        <pre id="c1">${base}/api/search?keyword=overlord</pre>
        <div class="row">
          <a class="mini" href="/api/search?keyword=overlord">abrir</a>
          <div class="mini" data-copy="c1">copiar</div>
        </div>
      </article>

      <article class="card">
        <div class="k">
          <span class="method m-green">GET</span>
          <div class="route">/api/episodes?anime_id=ID</div>
        </div>
        <p class="desc">Lista episódios pelo anime_id via admin-ajax (action=get_anime_episodes).</p>
        <pre id="c2">${base}/api/episodes?anime_id=69624</pre>
        <div class="row">
          <a class="mini" href="/api/episodes?anime_id=69624">abrir</a>
          <div class="mini" data-copy="c2">copiar</div>
        </div>
      </article>

      <article class="card">
        <div class="k">
          <span class="method m-red">GET</span>
          <div class="route">/api/episode-video?episode_id=ID</div>
        </div>
        <p class="desc">
          Extrai link do vídeo do episódio. Primeiro tenta iframe criptografado e depois token do blogger.
        </p>
        <pre id="c3">${base}/api/episode-video?episode_id=123456</pre>
        <div class="row">
          <div class="mini" data-copy="c3">copiar</div>
        </div>
      </article>

      <article class="card">
        <div class="k">
          <span class="method m-yellow">GET</span>
          <div class="route">/api/sinopse/NOME_DO_ANIME</div>
        </div>
        <p class="desc">
          Retorna <b>title</b> e <b>sinopse</b>. Você pode enviar o nome com espaços na URL (%20) que a API transforma em slug com hífen (-).
        </p>
        <pre id="c4">${base}/api/sinopse/isekai%20dark%20web</pre>
        <div class="row">
          <a class="mini" href="/api/sinopse/isekai%20dark%20web">abrir</a>
          <div class="mini" data-copy="c4">copiar</div>
        </div>
      </article>
    </section>

    <div class="footer">
      <div>Anime API Docs — credits DVHACKZ</div>
      <div>Tip: se o slug não existir, use search para encontrar o nome correto.</div>
    </div>
  </div>

  <div class="toast" id="toast">copied</div>

  <script>
    const toast = document.getElementById("toast");
    function showToast(msg){
      toast.textContent = msg;
      toast.classList.add("on");
      clearTimeout(window.__t);
      window.__t = setTimeout(()=>toast.classList.remove("on"), 900);
    }
    document.querySelectorAll("[data-copy]").forEach(el=>{
      el.addEventListener("click", async ()=>{
        const id = el.getAttribute("data-copy");
        const pre = document.getElementById(id);
        const text = pre ? pre.textContent.trim() : "";
        try{
          await navigator.clipboard.writeText(text);
          showToast("copied");
        }catch(e){
          showToast("copy failed");
        }
      });
    });
  </script>
</body>
</html>`;

  return res.status(200).end(html);
};
