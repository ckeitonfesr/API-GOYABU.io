module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const base = "https://anime-api-kappa-one.vercel.app";
  const avatar = "https://i.ibb.co/6RgzrZ7d/baixados.jpg";
  const discordUserUrl = "https://discord.com/users/1295419742475255933";

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>documentação · anime api</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#f6f7fb;
    --text:#0f172a;
    --muted:#526078;
    --card:#ffffff;
    --card2:#fbfcff;
    --line:#e6ebf3;
    --line2:#eef2f8;
    --shadow: 0 20px 40px -22px rgba(15,23,42,0.12);
    --shadow2: 0 15px 35px -20px rgba(15,23,42,0.10);

    --codeBg:#0b1220;
    --codeText:#eaf1ff;
    --codeBorder:#1a2740;

    --accent:#0f172a;
    --accentSoft:#f1f5ff;
    --accentBorder:#dbe6ff;

    --methodBg:#0f172a;
    --methodText:#ffffff;
    --methodBorder:rgba(15,23,42,.25);

    --btnBg:#ffffff;
    --btnBorder:#d7e2ec;
    --btnHover:#f3f6ff;

    --radiusSide:18px;
    --radiusMain:26px;
    --radiusSoft:14px;

    --h1: clamp(1.25rem, 1.05rem + 0.9vw, 1.55rem);
    --p: clamp(.92rem, .88rem + .2vw, 1rem);
    --small: clamp(.78rem, .76rem + .12vw, .86rem);
    --mono: clamp(.84rem, .81rem + .16vw, .92rem);
  }

  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    font-family:'Inter',sans-serif;
    background:var(--bg);
    color:var(--text);
    line-height:1.55;
    -webkit-font-smoothing:antialiased;
    padding:1.25rem;
    font-size:var(--p);
  }

  .container{
    max-width:1280px;
    margin:0 auto;
    display:grid;
    grid-template-columns:250px 1fr;
    gap:1.25rem;
    align-items:start;
  }

  .sidebar{
    background:var(--card);
    border-radius:var(--radiusSide);
    padding:1.2rem 1rem;
    box-shadow:var(--shadow2);
    height:fit-content;
    position:sticky;
    top:1.25rem;
    border:1px solid var(--line);
  }

  .topbar{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:.75rem;
    padding:0 .25rem 1rem;
    margin-bottom:.9rem;
    border-bottom:1px solid var(--line2);
  }

  .brand{
    display:flex;
    flex-direction:column;
    gap:.35rem;
    min-width:0;
  }
  .brand .title{
    font-weight:850;
    letter-spacing:-0.02em;
    font-size:1rem;
    display:flex;
    align-items:center;
    gap:.5rem;
    min-width:0;
  }
  .pill{
    font-size:.70rem;
    font-weight:800;
    padding:.18rem .55rem;
    border-radius:999px;
    background:var(--accentSoft);
    color:var(--accent);
    border:1px solid var(--accentBorder);
    flex:0 0 auto;
  }
  .meta{
    color:var(--muted);
    font-size:var(--small);
    line-height:1.35;
  }

  .copybtn, .btn, .menuBtn{
    border:1px solid var(--btnBorder);
    background:var(--btnBg);
    color:var(--text);
    font-weight:800;
    font-size:.78rem;
    padding:.5rem .65rem;
    border-radius:12px;
    cursor:pointer;
    transition:.15s;
    display:inline-flex;
    align-items:center;
    gap:.45rem;
    white-space:nowrap;
    text-decoration:none;
  }
  .copybtn:hover, .btn:hover, .menuBtn:hover{ background:var(--btnHover); }
  .copybtn:active, .btn:active, .menuBtn:active{ transform:translateY(1px); }

  .baseRow{
    margin:.85rem .25rem 0;
    display:flex;
    gap:.55rem;
    align-items:center;
  }
  .basecode{
    font-family:'SF Mono','Fira Code','JetBrains Mono',monospace;
    font-size:.78rem;
    background:var(--codeBg);
    color:var(--codeText);
    padding:.45rem .6rem;
    border-radius:12px;
    border:1px solid var(--codeBorder);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    flex:1;
    min-width:0;
  }

  .sidebar-section{margin-top:1.05rem}
  .sidebar-section-title{
    font-size:.68rem;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:0.08em;
    color:var(--muted);
    margin-bottom:.7rem;
    padding-left:.25rem;
  }
  .sidebar-nav{list-style:none}
  .sidebar-nav-item{margin-bottom:.15rem}
  .sidebar-nav-link{
    display:block;
    padding:.52rem .65rem;
    color:var(--text);
    text-decoration:none;
    font-size:.90rem;
    font-weight:650;
    border-radius:12px;
    transition:all 0.15s ease;
    border-left:2px solid transparent;
    opacity:.90;
  }
  .sidebar-nav-link:hover{
    background:var(--btnHover);
    border-left-color:rgba(15,23,42,.35);
    opacity:1;
  }
  .sidebar-nav-link.active{
    background:var(--btnHover);
    border-left-color:rgba(15,23,42,.35);
    opacity:1;
  }

  .content{
    background:var(--card);
    border-radius:var(--radiusMain);
    padding:1.85rem;
    box-shadow:var(--shadow);
    border:1px solid var(--line);
  }

  .section-title{
    font-size:var(--h1);
    font-weight:900;
    letter-spacing:-0.02em;
    margin-bottom:1rem;
    color:var(--text);
    border-bottom:1px solid var(--line2);
    padding-bottom:.65rem;
  }

  .text-large{
    font-size:var(--p);
    color:var(--muted);
    margin-bottom:.95rem;
  }

  .endpoint-card{
    background:var(--card2);
    border-radius:18px;
    padding:1.05rem;
    margin:1rem 0;
    border:1px solid var(--line);
    transition:all 0.15s;
  }
  .endpoint-card:hover{
    background:var(--card);
    box-shadow:0 10px 22px -18px rgba(15,23,42,.22);
  }

  .endpoint-head{
    display:flex;
    align-items:center;
    gap:.65rem;
    flex-wrap:wrap;
  }
  .endpoint-method{
    display:inline-block;
    font-weight:900;
    font-size:.68rem;
    padding:0.2rem 0.75rem;
    border-radius:999px;
    background:var(--methodBg);
    color:var(--methodText);
    letter-spacing:0.08em;
    text-transform:uppercase;
    border:1px solid var(--methodBorder);
  }
  .endpoint-path{
    font-family:'SF Mono','Fira Code','JetBrains Mono',monospace;
    font-size:var(--mono);
    color:var(--text);
    font-weight:900;
    word-break:break-word;
  }
  .endpoint-actions{
    margin-left:auto;
    display:flex;
    gap:.45rem;
    flex-wrap:wrap;
  }
  .endpoint-description{
    margin:.6rem 0 0 0;
    color:var(--muted);
    font-size:var(--p);
  }

  .params-table{
    width:100%;
    border-collapse:collapse;
    margin:1rem 0;
    font-size:var(--p);
    border-radius:14px;
    overflow:hidden;
    border:1px solid var(--line);
  }
  .params-table th{
    text-align:left;
    padding:0.75rem 0.95rem;
    background:var(--accentSoft);
    border-bottom:1px solid var(--line);
    color:var(--text);
    font-weight:900;
    font-size:.72rem;
    text-transform:uppercase;
    letter-spacing:0.08em;
  }
  .params-table td{
    padding:0.75rem 0.95rem;
    border-bottom:1px solid var(--line);
    color:var(--muted);
    vertical-align:top;
  }
  .params-table tr:last-child td{border-bottom:none}
  .param-required{
    color:#b4233b;
    font-size:.68rem;
    font-weight:900;
    margin-left:.45rem;
    background:rgba(180,35,59,.10);
    padding:0.12rem 0.5rem;
    border-radius:999px;
    display:inline-block;
    border:1px solid rgba(180,35,59,.20);
  }

  .tip-box{
    background:var(--accentSoft);
    border-radius:14px;
    padding:1rem;
    margin:1rem 0;
    border:1px solid var(--accentBorder);
  }
  .tip-box strong{
    color:var(--text);
    display:block;
    margin-bottom:.25rem;
    font-size:.98rem;
    font-weight:900;
  }
  .tip-box p{color:var(--muted); font-size:var(--p)}
  .tip-box a{
    color:var(--text);
    text-decoration:none;
    font-weight:900;
    border-bottom:1px solid transparent;
    transition:border 0.1s;
  }
  .tip-box a:hover{border-bottom-color:rgba(15,23,42,.35)}

  .codeTabs{
    border:1px solid var(--line);
    border-radius:14px;
    overflow:hidden;
    margin:1rem 0;
    background:var(--card);
  }
  .tabBar{
    display:flex;
    gap:.35rem;
    padding:.45rem;
    border-bottom:1px solid var(--line);
    background:rgba(241,245,255,.55);
  }
  .tabBtn{
    border:1px solid var(--btnBorder);
    background:var(--btnBg);
    color:var(--text);
    font-weight:900;
    font-size:.76rem;
    padding:.42rem .62rem;
    border-radius:12px;
    cursor:pointer;
    transition:.12s;
  }
  .tabBtn:hover{ background:var(--btnHover); }
  .tabBtn.active{
    background:var(--text);
    border-color:var(--text);
    color:#fff;
  }
  .tabPane{ display:none; }
  .tabPane.active{ display:block; }

  .code-block{
    background:var(--codeBg);
    color:var(--codeText);
    padding:1rem;
    font-family:'SF Mono','Fira Code','JetBrains Mono',monospace;
    font-size:var(--mono);
    overflow-x:auto;
    border-top:1px solid rgba(255,255,255,0.08);
  }
  .code-block code{color:rgba(234,241,255,.95)}

  .profile{
    margin-top:1rem;
    padding:1rem .25rem 0;
    border-top:1px solid var(--line2);
  }
  .profileCard{
    display:flex;
    gap:.8rem;
    align-items:center;
    padding:.8rem;
    border-radius:14px;
    border:1px solid var(--line);
    background:linear-gradient(180deg, rgba(15,23,42,0.02), rgba(15,23,42,0.00));
  }
  .avatar{
    width:44px;height:44px;border-radius:50%;
    border:1px solid rgba(15,23,42,.12);
    object-fit:cover;
    background:#000;
  }
  .pmeta{min-width:0}
  .pname{ font-weight:900; letter-spacing:-0.02em; line-height:1.1; }
  .puser{ color:var(--muted); font-size:.85rem; margin-top:.1rem; }

  .plink{
    margin-left:auto;
    font-weight:900;
    font-size:.78rem;
    padding:.45rem .65rem;
    border-radius:12px;
    border:1px solid var(--btnBorder);
    background:var(--btnBg);
    color:var(--text);
    text-decoration:none;
    transition:.15s;
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }
  .plink:hover{background:var(--btnHover)}

  .plinkBelow{
    margin-top:.55rem;
    width:100%;
    display:none;
    padding:.7rem .85rem;
    border-radius:14px;
    border:1px solid var(--btnBorder);
    background:var(--btnBg);
    color:var(--text);
    text-decoration:none;
    font-weight:900;
    font-size:.82rem;
    text-align:center;
    transition:.15s;
  }
  .plinkBelow:hover{ background:var(--btnHover); }

  .footer{
    max-width:1280px;
    margin:1.25rem auto 0;
    padding:1.25rem 0 0;
    color:var(--muted);
    font-size:0.85rem;
    text-align:center;
    border-top:1px solid var(--line);
  }
  .footer a{
    color:var(--text);
    text-decoration:none;
    margin:0 .6rem;
    font-weight:850;
    opacity:.86;
  }
  .footer a:hover{opacity:1}

  .mobileBar{
    display:none;
    position:sticky;
    top:0;
    z-index:50;
    background:rgba(246,247,251,.92);
    backdrop-filter: blur(10px);
    border-bottom:1px solid var(--line);
    padding:.7rem .9rem;
    margin:-1.25rem -1.25rem .9rem;
  }
  .mobileBarInner{
    max-width:1280px;
    margin:0 auto;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:.75rem;
  }
  .mobileTitle{
    font-weight:900;
    letter-spacing:-0.02em;
    display:flex;
    align-items:center;
    gap:.55rem;
    min-width:0;
  }
  .mobileTitle span{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .drawerBackdrop{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.35);
    z-index:60;
  }
  .drawer{
    display:none;
    position:fixed;
    left:0;
    top:0;
    height:100%;
    width:min(86vw, 340px);
    background:var(--card);
    z-index:70;
    padding:1rem;
    border-right:1px solid var(--line);
    box-shadow: 20px 0 60px rgba(0,0,0,.25);
    overflow:auto;
  }
  .drawerTop{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:.75rem;
    margin-bottom:.8rem;
  }

  @media (max-width: 900px){
    body{ padding:1rem; }
    .mobileBar{ display:block; margin:-1rem -1rem .9rem; }
    .container{ grid-template-columns:1fr; }
    .sidebar{ display:none; }
    .content{ padding:1.25rem; border-radius:20px; }
    .endpoint-actions{ width:100%; margin-left:0; }
    .plinkBelow{ display:none !important; }
  }

  @media (min-width: 901px){
    .sidebar .profileCard .plink{ display:none; }
    .sidebar .plinkBelow{ display:block; }
  }
</style>
</head>
<body>

<div class="mobileBar">
  <div class="mobileBarInner">
    <div class="mobileTitle">
      <button class="menuBtn" id="openMenu">menu</button>
      <span>Anime API <span class="pill">docs</span></span>
    </div>
  </div>
</div>

<div class="drawerBackdrop" id="backdrop"></div>
<aside class="drawer" id="drawer">
  <div class="drawerTop">
    <div style="font-weight:900;">Navegação</div>
    <button class="menuBtn" id="closeMenu">fechar</button>
  </div>

  <div class="tip-box" style="margin-top:0;">
    <strong>Base URL</strong>
    <p><code>${base}</code></p>
    <div style="margin-top:.65rem; display:flex; gap:.55rem;">
      <button class="copybtn" id="copyBaseMobile">copiar</button>
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-title">Primeiros passos</div>
    <ul class="sidebar-nav">
      <li class="sidebar-nav-item"><a href="#introducao" class="sidebar-nav-link active">Introdução</a></li>
      <li class="sidebar-nav-item"><a href="#fluxo" class="sidebar-nav-link">Fluxo (nome → vídeo)</a></li>
    </ul>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-title">Endpoints</div>
    <ul class="sidebar-nav">
      <li class="sidebar-nav-item"><a href="#search" class="sidebar-nav-link">Search</a></li>
      <li class="sidebar-nav-item"><a href="#episodes" class="sidebar-nav-link">Episódios</a></li>
      <li class="sidebar-nav-item"><a href="#episodevideo" class="sidebar-nav-link">Vídeo do episódio</a></li>
      <li class="sidebar-nav-item"><a href="#lancamentos" class="sidebar-nav-link">Lançamentos</a></li>
      <li class="sidebar-nav-item"><a href="#sinopse" class="sidebar-nav-link">Sinopse</a></li>
      <li class="sidebar-nav-item"><a href="#generos" class="sidebar-nav-link">Gêneros</a></li>
    </ul>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-title">Referência</div>
    <ul class="sidebar-nav">
      <li class="sidebar-nav-item"><a href="#respostas" class="sidebar-nav-link">Respostas</a></li>
      <li class="sidebar-nav-item"><a href="#erros" class="sidebar-nav-link">Erros</a></li>
      <li class="sidebar-nav-item"><a href="#changelog" class="sidebar-nav-link">Changelog</a></li>
    </ul>
  </div>

  <div class="profile">
    <div class="profileCard">
      <img class="avatar" src="${avatar}" alt="Lopes">
      <div class="pmeta">
        <div class="pname">Lopes</div>
        <div class="puser">@dvhackz</div>
      </div>
      <a class="plink" href="${discordUserUrl}" target="_blank" rel="noreferrer">discord</a>
    </div>
  </div>
</aside>

<div class="container">

  <aside class="sidebar">
    <div class="topbar">
      <div class="brand">
        <div class="title">Anime API <span class="pill">docs</span></div>
        <div class="meta">Busca animes, episódios, lançamentos e link de vídeo.</div>
      </div>
    </div>

    <div class="codeTabs" data-tabs>
      <div class="tabBar">
        <button class="tabBtn active" data-tab="baseTab">base url</button>
        <button class="tabBtn" data-tab="baseFetch">fetch</button>
      </div>
      <div class="tabPane active" id="baseTab">
        <div class="baseRow" style="margin:.75rem;">
          <div class="basecode" id="basecode">${base}</div>
          <button class="copybtn" id="copyBase">copiar</button>
        </div>
      </div>
      <div class="tabPane" id="baseFetch">
        <div class="code-block"><code>fetch("${base}/api/search?keyword=overlord")
  .then(r =&gt; r.json())
  .then(console.log);</code></div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-title">Primeiros passos</div>
      <ul class="sidebar-nav">
        <li class="sidebar-nav-item"><a href="#introducao" class="sidebar-nav-link active">Introdução</a></li>
        <li class="sidebar-nav-item"><a href="#fluxo" class="sidebar-nav-link">Fluxo (nome → vídeo)</a></li>
      </ul>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-title">Endpoints</div>
      <ul class="sidebar-nav">
        <li class="sidebar-nav-item"><a href="#search" class="sidebar-nav-link">Search</a></li>
        <li class="sidebar-nav-item"><a href="#episodes" class="sidebar-nav-link">Episódios</a></li>
        <li class="sidebar-nav-item"><a href="#episodevideo" class="sidebar-nav-link">Vídeo do episódio</a></li>
        <li class="sidebar-nav-item"><a href="#lancamentos" class="sidebar-nav-link">Lançamentos</a></li>
        <li class="sidebar-nav-item"><a href="#sinopse" class="sidebar-nav-link">Sinopse</a></li>
        <li class="sidebar-nav-item"><a href="#generos" class="sidebar-nav-link">Gêneros</a></li>
      </ul>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-title">Referência</div>
      <ul class="sidebar-nav">
        <li class="sidebar-nav-item"><a href="#respostas" class="sidebar-nav-link">Respostas</a></li>
        <li class="sidebar-nav-item"><a href="#erros" class="sidebar-nav-link">Erros</a></li>
        <li class="sidebar-nav-item"><a href="#changelog" class="sidebar-nav-link">Changelog</a></li>
      </ul>
    </div>

    <div class="profile">
      <div class="profileCard">
        <img class="avatar" src="${avatar}" alt="Lopes">
        <div class="pmeta">
          <div class="pname">Lopes</div>
          <div class="puser">@dvhackz</div>
        </div>
        <a class="plink" href="${discordUserUrl}" target="_blank" rel="noreferrer">discord</a>
      </div>
      <a class="plinkBelow" href="${discordUserUrl}" target="_blank" rel="noreferrer">entrar no discord</a>
    </div>
  </aside>

  <main class="content">
    <section id="introducao">
      <h2 class="section-title">Introdução</h2>
      <p class="text-large">
        Documentação oficial da <strong>Anime API</strong>. Fluxo correto para buscar anime, listar episódios e pegar o <strong>link do vídeo</strong>.
      </p>

      <div class="tip-box">
        <strong>Início rápido</strong>
        <p>
          1) <a href="${base}/api/search?keyword=overlord" target="_blank" rel="noreferrer">Search</a> → pegue o <code>anime_id</code><br>
          2) <a href="${base}/api/episodes?anime_id=40927" target="_blank" rel="noreferrer">Episodes</a> → pegue o <code>episode_id</code><br>
          3) <a href="${base}/api/episode-video?episode_id=40930" target="_blank" rel="noreferrer">Episode Video</a> → use o <code>video_url</code>
        </p>
      </div>
    </section>

    <section id="fluxo" style="margin-top:2.1rem;">
      <h2 class="section-title">Fluxo (nome → vídeo)</h2>
      <p class="text-large">
        Ordem: <strong>Nome</strong> → <strong>anime_id</strong> → <strong>episodes</strong> → <strong>episode_id</strong> → <strong>video_url</strong>.
      </p>
    </section>

    <section id="search" style="margin-top:2.1rem;">
      <h2 class="section-title">Search</h2>
      <p class="text-large">Busca por palavra-chave. Parâmetro obrigatório: <code>keyword</code>.</p>

      <div class="endpoint-card">
        <div class="endpoint-head">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/search?keyword=overlord</span>
          <div class="endpoint-actions">
            <a class="btn" href="${base}/api/search?keyword=overlord" target="_blank" rel="noreferrer">abrir</a>
            <button class="btn" data-copy="${base}/api/search?keyword=overlord">copiar</button>
          </div>
        </div>
        <div class="endpoint-description">Retorna itens com <strong>id</strong> (anime_id) e <strong>dublado</strong> (true/false).</div>
      </div>

      <div class="codeTabs" data-tabs>
        <div class="tabBar">
          <button class="tabBtn active" data-tab="sCurl">cURL</button>
          <button class="tabBtn" data-tab="sFetch">fetch</button>
        </div>
        <div class="tabPane active" id="sCurl">
          <div class="code-block"><code>curl "${base}/api/search?keyword=overlord"</code></div>
        </div>
        <div class="tabPane" id="sFetch">
          <div class="code-block"><code>fetch("${base}/api/search?keyword=overlord")
  .then(r =&gt; r.json())
  .then(console.log);</code></div>
        </div>
      </div>

      <table class="params-table">
        <thead><tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>keyword <span class="param-required">obrigatório</span></td><td>string</td><td>Termo de busca</td></tr>
        </tbody>
      </table>
    </section>

    <section id="episodes" style="margin-top:2.1rem;">
      <h2 class="section-title">Episódios</h2>
      <p class="text-large">Lista episódios usando <strong>anime_id</strong>.</p>

      <div class="endpoint-card">
        <div class="endpoint-head">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/episodes?anime_id=40927</span>
          <div class="endpoint-actions">
            <a class="btn" href="${base}/api/episodes?anime_id=40927" target="_blank" rel="noreferrer">abrir</a>
            <button class="btn" data-copy="${base}/api/episodes?anime_id=40927">copiar</button>
          </div>
        </div>
        <div class="endpoint-description">Parâmetro obrigatório: <code>anime_id</code>. Retorna episódios com <code>id</code> (episode_id).</div>
      </div>

      <div class="codeTabs" data-tabs>
        <div class="tabBar">
          <button class="tabBtn active" data-tab="eCurl">cURL</button>
          <button class="tabBtn" data-tab="eFetch">fetch</button>
        </div>
        <div class="tabPane active" id="eCurl">
          <div class="code-block"><code>curl "${base}/api/episodes?anime_id=40927"</code></div>
        </div>
        <div class="tabPane" id="eFetch">
          <div class="code-block"><code>fetch("${base}/api/episodes?anime_id=40927")
  .then(r =&gt; r.json())
  .then(console.log);</code></div>
        </div>
      </div>

      <table class="params-table">
        <thead><tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>anime_id <span class="param-required">obrigatório</span></td><td>number</td><td>ID do anime obtido em <code>/search</code></td></tr>
        </tbody>
      </table>
    </section>

    <section id="episodevideo" style="margin-top:2.1rem;">
      <h2 class="section-title">Vídeo do episódio</h2>
      <p class="text-large">Retorna o <strong>video_url</strong> usando <strong>episode_id</strong>.</p>

      <div class="endpoint-card">
        <div class="endpoint-head">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/episode-video?episode_id=40930</span>
          <div class="endpoint-actions">
            <a class="btn" href="${base}/api/episode-video?episode_id=40930" target="_blank" rel="noreferrer">abrir</a>
            <button class="btn" data-copy="${base}/api/episode-video?episode_id=40930">copiar</button>
          </div>
        </div>
        <div class="endpoint-description">Parâmetro obrigatório: <code>episode_id</code>. Resposta: <code>{ success, video_url }</code>.</div>
      </div>

      <div class="codeTabs" data-tabs>
        <div class="tabBar">
          <button class="tabBtn active" data-tab="vCurl">cURL</button>
          <button class="tabBtn" data-tab="vFetch">fetch</button>
        </div>
        <div class="tabPane active" id="vCurl">
          <div class="code-block"><code>curl "${base}/api/episode-video?episode_id=40930"</code></div>
        </div>
        <div class="tabPane" id="vFetch">
          <div class="code-block"><code>fetch("${base}/api/episode-video?episode_id=40930")
  .then(r =&gt; r.json())
  .then(console.log);</code></div>
        </div>
      </div>

      <table class="params-table">
        <thead><tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>episode_id <span class="param-required">obrigatório</span></td><td>number</td><td>ID do episódio obtido em <code>/episodes</code></td></tr>
        </tbody>
      </table>
    </section>

    <section id="lancamentos" style="margin-top:2.1rem;">
      <h2 class="section-title">Lançamentos</h2>
      <p class="text-large"><strong>Único endpoint que aceita</strong> <code>limite</code>. Paginação via <code>pagina</code>.</p>

      <div class="endpoint-card">
        <div class="endpoint-head">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/lancamentos?pagina=1&limite=20</span>
          <div class="endpoint-actions">
            <a class="btn" href="${base}/api/lancamentos?pagina=1&limite=20" target="_blank" rel="noreferrer">abrir</a>
            <button class="btn" data-copy="${base}/api/lancamentos?pagina=1&limite=20">copiar</button>
          </div>
        </div>
        <div class="endpoint-description">Parâmetros opcionais: <code>pagina</code> e <code>limite</code>.</div>
      </div>

      <table class="params-table">
        <thead><tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>pagina</td><td>number</td><td>Página (padrão: 1)</td></tr>
          <tr><td>limite</td><td>number</td><td>Quantidade por página (padrão: 30)</td></tr>
        </tbody>
      </table>
    </section>

    <section id="sinopse" style="margin-top:2.1rem;">
      <h2 class="section-title">Sinopse</h2>
      <p class="text-large">Busca sinopse via <code>nome</code>.</p>

      <div class="endpoint-card">
        <div class="endpoint-head">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/sinopse?nome=Overlord-4-Dublado</span>
          <div class="endpoint-actions">
            <a class="btn" href="${base}/api/sinopse?nome=Overlord-4-Dublado" target="_blank" rel="noreferrer">abrir</a>
            <button class="btn" data-copy="${base}/api/sinopse?nome=Overlord-4-Dublado">copiar</button>
          </div>
        </div>
        <div class="endpoint-description">Parâmetro obrigatório: <code>nome</code>.</div>
      </div>
    </section>

    <section id="generos" style="margin-top:2.1rem;">
      <h2 class="section-title">Gêneros</h2>
      <p class="text-large">Lista por gênero via <code>genero</code>.</p>

      <div class="endpoint-card">
        <div class="endpoint-head">
          <span class="endpoint-method">GET</span>
          <span class="endpoint-path">/api/generos?genero=acao</span>
          <div class="endpoint-actions">
            <a class="btn" href="${base}/api/generos?genero=acao" target="_blank" rel="noreferrer">abrir</a>
            <button class="btn" data-copy="${base}/api/generos?genero=acao">copiar</button>
          </div>
        </div>
        <div class="endpoint-description">Parâmetro obrigatório: <code>genero</code>.</div>
      </div>
    </section>

    <section id="respostas" style="margin-top:2.1rem;">
      <h2 class="section-title">Respostas</h2>
      <div class="codeTabs" data-tabs>
        <div class="tabBar">
          <button class="tabBtn active" data-tab="rOk">sucesso</button>
          <button class="tabBtn" data-tab="rErr">erro</button>
        </div>
        <div class="tabPane active" id="rOk">
          <div class="code-block"><code>{
  "sucesso": true,
  "dados": [...]
}</code></div>
        </div>
        <div class="tabPane" id="rErr">
          <div class="code-block"><code>{
  "sucesso": false,
  "erro": "mensagem"
}</code></div>
        </div>
      </div>
    </section>

    <section id="erros" style="margin-top:2.1rem;">
      <h2 class="section-title">Erros</h2>
      <table class="params-table">
        <thead><tr><th>Status</th><th>Quando acontece</th><th>Como resolver</th></tr></thead>
        <tbody>
          <tr><td>400</td><td>Parâmetro obrigatório ausente</td><td>Envie o parâmetro correto</td></tr>
          <tr><td>404</td><td>Anime não encontrado (sinopse)</td><td>Revise o nome/slug</td></tr>
          <tr><td>500</td><td>Timeout/erro interno</td><td>Tente novamente / retry no front</td></tr>
        </tbody>
      </table>
    </section>

    <section id="changelog" style="margin-top:2.1rem;">
      <h2 class="section-title">Changelog</h2>
      <div class="endpoint-card">
        <div class="endpoint-description">
          <strong>v5</strong> • tema claro sem modo escuro + layout mais compacto + tabs de código.<br>
          <strong>v4</strong> • docs com navegação + hash fix.
        </div>
      </div>
    </section>
  </main>
</div>

<footer class="footer">
  <div>
    <a href="${base}/api/intro">docs</a> ·
    <a href="${base}/api/search?keyword=overlord">search</a> ·
    <a href="${base}/api/lancamentos?pagina=1&limite=20">lancamentos</a> ·
    <a href="${base}/api/generos?genero=acao">generos</a> ·
    <a href="${discordUserUrl}" target="_blank" rel="noreferrer">discord</a>
  </div>
  <div style="margin-top:1rem;">
    © 2026 anime api · developer by <strong>Lopes</strong> · <strong>dvhackz</strong>
  </div>
</footer>

<script>
(function(){
  async function copyText(text, btn){
    const old = btn.textContent;
    try{
      await navigator.clipboard.writeText(text);
      btn.textContent = 'copiado';
      setTimeout(()=>btn.textContent = old, 900);
    }catch{
      btn.textContent = 'erro';
      setTimeout(()=>btn.textContent = old, 900);
    }
  }

  const copyBase = document.getElementById('copyBase');
  const basecode = document.getElementById('basecode');
  if(copyBase && basecode) copyBase.addEventListener('click', ()=>copyText(basecode.textContent.trim(), copyBase));

  const copyBaseMobile = document.getElementById('copyBaseMobile');
  if(copyBaseMobile) copyBaseMobile.addEventListener('click', ()=>copyText('${base}', copyBaseMobile));

  document.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click', ()=>copyText(btn.getAttribute('data-copy')||'', btn));
  });

  const navLinks = Array.from(document.querySelectorAll('.sidebar-nav-link'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function setActive(hash){
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
  }

  navLinks.forEach(a => {
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(!href || href[0] !== '#') return;
      const el = document.querySelector(href);
      if(!el) return;
      e.preventDefault();
      history.pushState(null, '', href);
      el.scrollIntoView({behavior:'smooth', block:'start'});
      setActive(href);
      closeDrawer();
    });
  });

  const io = new IntersectionObserver((entries)=>{
    const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible && visible.target && visible.target.id){
      const hash = '#' + visible.target.id;
      setActive(hash);
      if(location.hash !== hash) history.replaceState(null, '', hash);
    }
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.1,0.2,0.35,0.5,0.65] });
  sections.forEach(s=>io.observe(s));

  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('backdrop');
  const openMenu = document.getElementById('openMenu');
  const closeMenuBtn = document.getElementById('closeMenu');

  function openDrawer(){
    if(!drawer || !backdrop) return;
    drawer.style.display = 'block';
    backdrop.style.display = 'block';
  }
  function closeDrawer(){
    if(!drawer || !backdrop) return;
    drawer.style.display = 'none';
    backdrop.style.display = 'none';
  }
  if(openMenu) openMenu.addEventListener('click', openDrawer);
  if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeDrawer);
  if(backdrop) backdrop.addEventListener('click', closeDrawer);

  (function jumpToHashOnLoad(){
    const go = () => {
      const h = location.hash;
      if (!h) return;
      const el = document.querySelector(h);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(h);
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => setTimeout(go, 50));
    } else {
      setTimeout(go, 50);
    }
    window.addEventListener("hashchange", go);
  })();

  document.querySelectorAll('[data-tabs]').forEach(group=>{
    const btns = Array.from(group.querySelectorAll('.tabBtn'));
    const panes = Array.from(group.querySelectorAll('.tabPane'));
    btns.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-tab');
        btns.forEach(b=>b.classList.toggle('active', b===btn));
        panes.forEach(p=>p.classList.toggle('active', p.id === id));
      });
    });
  });
})();
</script>

</body>
</html>`;

  return res.status(200).end(html);
};
