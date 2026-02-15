module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const base = "https://anime-api-kappa-one.vercel.app";
  const avatar = "https://i.ibb.co/6RgzrZ7d/baixados.jpg";
  const discordUserUrl = "https://discord.com/users/1295419742475255933";

  const html = `<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>documentação · anime api</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#f5f7fb;
    --text:#111827;
    --muted:#6b7a8f;
    --card:#ffffff;
    --card2:#f9fcff;
    --line:#e2eaf2;
    --line2:#edf2f9;
    --shadow: 0 20px 40px -20px rgba(0,20,40,0.12);
    --shadow2: 0 15px 35px -15px rgba(0,10,30,0.08);
    --codeBg:#0c121c;
    --codeText:#deecff;
    --codeBorder:#1e2a3a;
    --accent:#2266cc;
    --accentSoft:#edf4fe;
    --accentBorder:#ccdefa;
    --methodBg:#0b1e33;
    --methodBorder:#1e3a5f;
    --btnBg:#ffffff;
    --btnBorder:#d7e2ec;
    --btnHover:#f0f4fe;
    --radiusSide:20px;
    --radiusMain:32px;
    --radiusSoft:16px;
  }

  [data-theme="dark"]{
    --bg:#070A12;
    --text:#EAF1FF;
    --muted:rgba(234,241,255,.72);
    --card:#0E1524;
    --card2:#101A2D;
    --line:rgba(255,255,255,.10);
    --line2:rgba(255,255,255,.08);
    --shadow: 0 28px 70px -35px rgba(0,0,0,.65);
    --shadow2: 0 22px 50px -30px rgba(0,0,0,.6);
    --codeBg:#070B12;
    --codeText:#deecff;
    --codeBorder:rgba(255,255,255,.12);
    --accent:#7AA7FF;
    --accentSoft:rgba(122,167,255,.12);
    --accentBorder:rgba(122,167,255,.22);
    --methodBg:#0B1020;
    --methodBorder:rgba(255,255,255,.12);
    --btnBg:rgba(255,255,255,.04);
    --btnBorder:rgba(255,255,255,.12);
    --btnHover:rgba(255,255,255,.08);
  }

  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{
    font-family:'Inter',sans-serif;
    background:var(--bg);
    color:var(--text);
    line-height:1.5;
    -webkit-font-smoothing:antialiased;
    padding:2rem;
  }

  .container{
    max-width:1400px;
    margin:0 auto;
    display:grid;
    grid-template-columns:260px 1fr;
    gap:2rem;
    align-items:start;
  }

  .sidebar{
    background:var(--card);
    border-radius:var(--radiusSide);
    padding:2rem 1.25rem;
    box-shadow:var(--shadow2);
    height:fit-content;
    position:sticky;
    top:2rem;
    border:1px solid rgba(0,0,0,0.02);
  }
  [data-theme="dark"] .sidebar{ border-color: var(--line); }

  .topbar{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:.75rem;
    padding:0 .75rem 1.25rem;
    margin-bottom:1.25rem;
    border-bottom:1px solid var(--line2);
  }

  .brand{
    display:flex;
    flex-direction:column;
    gap:.45rem;
    min-width:0;
  }
  .brand .title{
    font-weight:800;
    letter-spacing:-0.02em;
    font-size:1.05rem;
    display:flex;
    align-items:center;
    gap:.5rem;
    min-width:0;
  }
  .pill{
    font-size:.72rem;
    font-weight:700;
    padding:.22rem .6rem;
    border-radius:999px;
    background:var(--accentSoft);
    color:var(--accent);
    border:1px solid var(--accentBorder);
    flex:0 0 auto;
  }
  .meta{
    color:var(--muted);
    font-size:.84rem;
    line-height:1.35;
  }

  .themeBtn, .copybtn, .btn, .menuBtn{
    border:1px solid var(--btnBorder);
    background:var(--btnBg);
    color:var(--text);
    font-weight:700;
    font-size:.78rem;
    padding:.55rem .7rem;
    border-radius:12px;
    cursor:pointer;
    transition:.15s;
    display:inline-flex;
    align-items:center;
    gap:.45rem;
    white-space:nowrap;
    text-decoration:none;
  }
  .themeBtn:hover, .copybtn:hover, .btn:hover, .menuBtn:hover{ background:var(--btnHover); }
  .themeBtn:active, .copybtn:active, .btn:active, .menuBtn:active{ transform:translateY(1px); }

  .baseRow{
    margin:1rem .75rem 0;
    display:flex;
    gap:.55rem;
    align-items:center;
  }
  .basecode{
    font-family:'SF Mono','Fira Code','JetBrains Mono',monospace;
    font-size:.78rem;
    background:var(--codeBg);
    color:var(--codeText);
    padding:.5rem .65rem;
    border-radius:12px;
    border:1px solid var(--codeBorder);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    flex:1;
    min-width:0;
  }

  .sidebar-section{margin-top:1.5rem}
  .sidebar-section-title{
    font-size:0.7rem;
    font-weight:600;
    text-transform:uppercase;
    letter-spacing:0.06em;
    color:var(--muted);
    margin-bottom:1rem;
    padding-left:0.75rem;
  }
  .sidebar-nav{list-style:none}
  .sidebar-nav-item{margin-bottom:0.2rem}
  .sidebar-nav-link{
    display:block;
    padding:0.6rem 0.75rem;
    color:var(--text);
    text-decoration:none;
    font-size:0.9rem;
    font-weight:500;
    border-radius:12px;
    transition:all 0.15s ease;
    border-left:2px solid transparent;
    opacity:.85;
  }
  .sidebar-nav-link:hover{
    background:var(--btnHover);
    border-left-color:var(--accent);
    opacity:1;
  }
  .sidebar-nav-link.active{
    background:var(--btnHover);
    border-left-color:var(--accent);
    opacity:1;
  }

  .content{
    background:var(--card);
    border-radius:var(--radiusMain);
    padding:3rem;
    box-shadow:var(--shadow);
    border:1px solid rgba(0,0,0,0.02);
  }
  [data-theme="dark"] .content{ border-color: var(--line); }

  .section-title{
    font-size:2rem;
    font-weight:700;
    letter-spacing:-0.015em;
    margin-bottom:1.5rem;
    color:var(--text);
    border-bottom:2px solid var(--line2);
    padding-bottom:0.75rem;
  }
  .subsection-title{
    font-size:1.35rem;
    font-weight:700;
    margin:2.5rem 0 1rem 0;
    color:var(--text);
    letter-spacing:-0.01em;
  }
  .text-large{
    font-size:1.05rem;
    color:var(--muted);
    margin-bottom:1.5rem;
  }

  .endpoint-card{
    background:var(--card2);
    border-radius:20px;
    padding:1.5rem;
    margin:1.5rem 0;
    border:1px solid var(--line);
    transition:all 0.2s;
  }
  .endpoint-card:hover{
    border-color:rgba(34,102,204,.28);
    background:var(--card);
    box-shadow:0 10px 25px -18px rgba(30,58,138,.22);
  }

  .endpoint-head{
    display:flex;
    align-items:center;
    gap:.75rem;
    flex-wrap:wrap;
  }
  .endpoint-method{
    display:inline-block;
    font-weight:800;
    font-size:0.7rem;
    padding:0.25rem 0.9rem;
    border-radius:30px;
    background:var(--methodBg);
    color:white;
    letter-spacing:0.02em;
    text-transform:uppercase;
    border:1px solid var(--methodBorder);
  }
  .endpoint-path{
    font-family:'SF Mono','Fira Code','JetBrains Mono',monospace;
    font-size:1.02rem;
    color:var(--text);
    font-weight:700;
    word-break:break-word;
  }
  .endpoint-actions{
    margin-left:auto;
    display:flex;
    gap:.5rem;
    flex-wrap:wrap;
  }
  .endpoint-description{
    margin:.75rem 0 0 0;
    color:var(--muted);
    font-size:.95rem;
  }

  .code-block{
    background:var(--codeBg);
    color:var(--codeText);
    padding:1.2rem;
    border-radius:18px;
    font-family:'SF Mono','Fira Code','JetBrains Mono',monospace;
    font-size:0.9rem;
    overflow-x:auto;
    margin:1.5rem 0;
    border:1px solid var(--codeBorder);
    box-shadow:inset 0 0 0 1px rgba(255,255,255,0.02);
  }
  .code-block code{color:#b7d1f0}

  .params-table{
    width:100%;
    border-collapse:collapse;
    margin:1.5rem 0;
    font-size:0.9rem;
    border-radius:16px;
    overflow:hidden;
    border:1px solid var(--line);
  }
  .params-table th{
    text-align:left;
    padding:0.9rem 1.2rem;
    background:var(--accentSoft);
    border-bottom:1px solid var(--line);
    color:var(--text);
    font-weight:800;
    font-size:0.8rem;
    text-transform:uppercase;
    letter-spacing:0.03em;
  }
  .params-table td{
    padding:0.9rem 1.2rem;
    border-bottom:1px solid var(--line);
    color:var(--muted);
    vertical-align:top;
  }
  .params-table tr:last-child td{border-bottom:none}
  .param-required{
    color:#cc2e4a;
    font-size:0.7rem;
    font-weight:800;
    margin-left:0.5rem;
    background:#ffeef0;
    padding:0.15rem 0.5rem;
    border-radius:30px;
    display:inline-block;
  }

  .tip-box{
    background:var(--accentSoft);
    border-radius:16px;
    padding:1.25rem;
    margin:1.25rem 0;
    border:1px solid var(--accentBorder);
  }
  .tip-box strong{
    color:var(--text);
    display:block;
    margin-bottom:0.3rem;
    font-size:1rem;
    font-weight:800;
  }
  .tip-box p{color:var(--muted); font-size:0.95rem}
  .tip-box a{
    color:var(--accent);
    text-decoration:none;
    font-weight:800;
    border-bottom:1px solid transparent;
    transition:border 0.1s;
  }
  .tip-box a:hover{border-bottom-color:var(--accent)}

  .grid-2{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:1.25rem;
    margin:1.25rem 0;
  }
  .mini{
    background:var(--card);
    border:1px solid var(--line);
    border-radius:18px;
    padding:1.25rem;
  }
  .tag{
    display:inline-flex;
    align-items:center;
    gap:.4rem;
    padding:.25rem .6rem;
    border-radius:999px;
    font-size:.75rem;
    font-weight:900;
    background:var(--accentSoft);
    border:1px solid var(--accentBorder);
    color:var(--accent);
  }

  .profile{
    margin-top:1.25rem;
    padding:1rem .75rem 0;
    border-top:1px solid var(--line2);
  }
  .profileCard{
    display:flex;
    gap:.85rem;
    align-items:center;
    padding:.85rem;
    border-radius:16px;
    border:1px solid var(--line);
    background:linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.00));
  }
  [data-theme="dark"] .profileCard{
    background:linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.00));
  }
  .avatar{
    width:46px;height:46px;border-radius:50%;
    border:2px solid rgba(255,255,255,.35);
    object-fit:cover;
    background:#000;
  }
  .pmeta{min-width:0}
  .pname{
    font-weight:900;
    letter-spacing:-0.02em;
    line-height:1.1;
  }
  .puser{
    color:var(--muted);
    font-size:.85rem;
    margin-top:.15rem;
    display:flex;
    align-items:center;
    gap:.45rem;
  }
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
  }
  .plink:hover{background:var(--btnHover)}

  .footer{
    max-width:1400px;
    margin:2rem auto 0;
    padding:2rem 0 0;
    color:var(--muted);
    font-size:0.85rem;
    text-align:center;
    border-top:1px solid var(--line);
  }
  .footer a{
    color:var(--text);
    text-decoration:none;
    margin:0 .75rem;
    font-weight:700;
    opacity:.85;
  }
  .footer a:hover{opacity:1}

  /* MOBILE */
  .mobileBar{
    display:none;
    position:sticky;
    top:0;
    z-index:50;
    background:rgba(245,247,251,.85);
    backdrop-filter: blur(10px);
    border-bottom:1px solid var(--line);
    padding:.8rem 1rem;
    margin:-2rem -2rem 1rem;
  }
  [data-theme="dark"] .mobileBar{
    background:rgba(7,10,18,.75);
  }
  .mobileBarInner{
    max-width:1400px;
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
    padding:1.25rem;
    border-right:1px solid var(--line);
    box-shadow: 20px 0 60px rgba(0,0,0,.25);
    overflow:auto;
  }
  .drawerTop{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:.75rem;
    margin-bottom:1rem;
  }

  @media (max-width: 900px){
    body{ padding:1rem; }
    .mobileBar{ display:block; margin:-1rem -1rem 1rem; }
    .container{ grid-template-columns:1fr; }
    .sidebar{ display:none; }
    .content{ padding:1.6rem; border-radius:22px; }
    .grid-2{ grid-template-columns:1fr; }
    .endpoint-actions{ width:100%; margin-left:0; }
    .section-title{ font-size:1.65rem; }
  }

  @media (max-width: 420px){
    .content{ padding:1.2rem; }
    .endpoint-card{ padding:1.1rem; }
    .endpoint-path{ font-size:.95rem; }
    .code-block{ padding:1rem; font-size:.85rem; }
    .params-table th, .params-table td{ padding:.75rem .85rem; }
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
    <button class="themeBtn" id="themeBtnMobile">modo escuro</button>
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
    <div style="margin-top:.8rem; display:flex; gap:.55rem;">
      <button class="copybtn" id="copyBaseMobile">copiar</button>
      <button class="themeBtn" id="themeBtnDrawer">modo escuro</button>
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-title">Primeiros passos</div>
    <ul class="sidebar-nav">
      <li class="sidebar-nav-item"><a href="#introducao" class="sidebar-nav-link active">Introdução</a></li>
      <li class="sidebar-nav-item"><a href="#fluxo" class="sidebar-nav-link">Fluxo (nome → vídeo)</a></li>
      <li class="sidebar-nav-item"><a href="#boaspraticas" class="sidebar-nav-link">Boas práticas</a></li>
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
        <div class="puser">@dvhackzzz</div>
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
      <button class="themeBtn" id="themeBtn">modo escuro</button>
    </div>

    <div class="baseRow">
      <div class="basecode" id="basecode">${base}</div>
      <button class="copybtn" id="copyBase">copiar</button>
    </div>

    <div class="sidebar-section">
      <div class="sidebar-section-title">Primeiros passos</div>
      <ul class="sidebar-nav">
        <li class="sidebar-nav-item"><a href="#introducao" class="sidebar-nav-link active">Introdução</a></li>
        <li class="sidebar-nav-item"><a href="#fluxo" class="sidebar-nav-link">Fluxo (nome → vídeo)</a></li>
        <li class="sidebar-nav-item"><a href="#boaspraticas" class="sidebar-nav-link">Boas práticas</a></li>
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
          <div class="puser">@dvhackzzz</div>
        </div>
        <a class="plink" href="${discordUserUrl}" target="_blank" rel="noreferrer">discord</a>
      </div>
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

    <section id="fluxo" style="margin-top:3.5rem;">
      <h2 class="section-title">Fluxo (nome → vídeo)</h2>
      <p class="text-large">
        Ordem: <strong>Nome</strong> → <strong>anime_id</strong> → <strong>episodes</strong> → <strong>episode_id</strong> → <strong>video_url</strong>.
      </p>
    </section>

    <section id="search" style="margin-top:3.5rem;">
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
      <table class="params-table">
        <thead><tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>keyword <span class="param-required">obrigatório</span></td><td>string</td><td>Termo de busca</td></tr>
        </tbody>
      </table>
    </section>

    <section id="episodes" style="margin-top:3.5rem;">
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
      <table class="params-table">
        <thead><tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>anime_id <span class="param-required">obrigatório</span></td><td>number</td><td>ID do anime obtido em <code>/search</code></td></tr>
        </tbody>
      </table>
    </section>

    <section id="episodevideo" style="margin-top:3.5rem;">
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
      <table class="params-table">
        <thead><tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr><td>episode_id <span class="param-required">obrigatório</span></td><td>number</td><td>ID do episódio obtido em <code>/episodes</code></td></tr>
        </tbody>
      </table>
    </section>

    <section id="lancamentos" style="margin-top:3.5rem;">
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

    <section id="sinopse" style="margin-top:3.5rem;">
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

    <section id="generos" style="margin-top:3.5rem;">
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

    <section id="respostas" style="margin-top:3.5rem;">
      <h2 class="section-title">Respostas</h2>
      <div class="code-block"><code>{
  "sucesso": true,
  "dados": [...]
}</code></div>
    </section>

    <section id="erros" style="margin-top:3.5rem;">
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

    <section id="changelog" style="margin-top:3.5rem;">
      <h2 class="section-title">Changelog</h2>
      <div class="endpoint-card">
        <div class="endpoint-description">
          <strong>v4</strong> • tema claro/escuro + mobile drawer + hash fix.<br>
          <strong>v2</strong> • lançamentos com paginação/limite.<br>
          <strong>v1</strong> • search / episodes / episode-video.
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
  <div style="margin-top:1.5rem;">
    © 2026 anime api · developer by <strong>Lopes</strong> · <strong>dvhackzzz</strong>
  </div>
</footer>

<script>
(function(){
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const themeBtnMobile = document.getElementById('themeBtnMobile');
  const themeBtnDrawer = document.getElementById('themeBtnDrawer');

  function setTheme(next){
    root.setAttribute('data-theme', next);
    localStorage.setItem('anime_api_theme', next);
    const isDark = next === 'dark';
    const label = isDark ? 'modo padrão' : 'modo escuro';
    if(themeBtn) themeBtn.textContent = label;
    if(themeBtnMobile) themeBtnMobile.textContent = label;
    if(themeBtnDrawer) themeBtnDrawer.textContent = label;
  }

  const saved = localStorage.getItem('anime_api_theme');
  if(saved === 'dark' || saved === 'light') setTheme(saved);
  else setTheme('light');

  function toggleTheme(){
    const current = root.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }
  [themeBtn, themeBtnMobile, themeBtnDrawer].forEach(b => b && b.addEventListener('click', toggleTheme));

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

  // active link
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

  // drawer
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

  // hash jump FIX (abre direto no #search etc)
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

})();
</script>

</body>
</html>`;

  return res.status(200).end(html);
};
