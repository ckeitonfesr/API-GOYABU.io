module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const base = "https://anime-api-kappa-one.vercel.app";

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
  <title>Anime API • Documentação Oficial</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-primary: #0a0c14;
      --bg-secondary: #11131f;
      --bg-card: #1a1d2b;
      --bg-hover: #232635;
      --accent-primary: #6366f1;
      --accent-secondary: #8b5cf6;
      --accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
      --text-primary: #ffffff;
      --text-secondary: #a0a8c0;
      --text-muted: #6b7280;
      --border: #2a2f3f;
      --success: #10b981;
      --warning: #f59e0b;
      --error: #ef4444;
      --code-bg: #0e111b;
      --glow: 0 0 20px rgba(99, 102, 241, 0.15);
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
      padding: 1rem;
    }

    /* Background animado */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    /* Header com gradiente */
    .header {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--glow);
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--accent-gradient);
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .header-icon {
      font-size: 3rem;
      background: var(--bg-card);
      padding: 1rem;
      border-radius: 20px;
      border: 1px solid var(--border);
    }

    .header-title h1 {
      font-size: 2.5rem;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
    }

    .header-title p {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }

    .base-url {
      background: var(--bg-card);
      padding: 0.75rem 1.5rem;
      border-radius: 100px;
      border: 1px solid var(--border);
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      color: var(--accent-primary);
      margin-top: 1rem;
      display: inline-block;
    }

    /* Grid de cards */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    /* Cards */
    .card {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-primary);
      box-shadow: var(--glow);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .card-icon {
      font-size: 1.5rem;
      background: var(--bg-card);
      padding: 0.5rem;
      border-radius: 12px;
      border: 1px solid var(--border);
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .badge {
      background: var(--accent-gradient);
      padding: 0.25rem 0.75rem;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-left: 0.5rem;
    }

    .badge-new {
      background: var(--success);
    }

    .badge-warning {
      background: var(--warning);
    }

    .description {
      color: var(--text-secondary);
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    /* Bloco de código */
    .code-block {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1rem;
      margin: 1rem 0;
      position: relative;
    }

    .code-block pre {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.85rem;
      color: var(--text-secondary);
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0;
    }

    .code-block .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .code-block .copy-btn:hover {
      background: var(--accent-primary);
      color: white;
    }

    /* Parâmetros */
    .params {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 1rem;
      margin-top: 1rem;
      border: 1px solid var(--border);
    }

    .params-title {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.7;
    }

    .param-item {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.9rem;
    }

    .param-item:last-child {
      border-bottom: none;
    }

    .param-name {
      color: var(--accent-primary);
      font-family: monospace;
      font-weight: 600;
      min-width: 80px;
    }

    .param-desc {
      color: var(--text-secondary);
    }

    .param-required {
      color: var(--error);
      font-size: 0.75rem;
      margin-left: 0.25rem;
    }

    .param-optional {
      color: var(--text-muted);
      font-size: 0.75rem;
    }

    /* Fluxo de uso */
    .flow-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 2rem;
      margin: 2rem 0;
    }

    .flow-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .flow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .step {
      background: var(--bg-card);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid var(--border);
      position: relative;
    }

    .step-number {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 30px;
      height: 30px;
      background: var(--accent-gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1rem;
      border: 2px solid var(--bg-secondary);
    }

    .step-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .step-desc {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .step-example {
      background: var(--code-bg);
      padding: 0.75rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-family: monospace;
      font-size: 0.8rem;
      color: var(--accent-primary);
    }

    /* Exemplo de resposta */
    .response-example {
      background: var(--code-bg);
      border-radius: 16px;
      padding: 1.5rem;
      margin: 1.5rem 0;
      border: 1px solid var(--border);
    }

    .response-example pre {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: var(--text-secondary);
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    /* Footer */
    .footer {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 2rem;
      margin-top: 2rem;
      text-align: center;
    }

    .footer .developer {
      font-size: 1.1rem;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 600;
    }

    .footer .discord {
      background: var(--bg-card);
      padding: 0.5rem 1rem;
      border-radius: 100px;
      display: inline-block;
      margin-top: 1rem;
      border: 1px solid var(--border);
    }

    /* Animações */
    @keyframes glow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .glow {
      animation: glow 2s ease-in-out infinite;
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .header-title h1 {
        font-size: 1.8rem;
      }
      
      .grid {
        grid-template-columns: 1fr;
      }
      
      .flow-steps {
        grid-template-columns: 1fr;
      }
      
      .param-item {
        flex-direction: column;
        gap: 0.25rem;
      }
      
      .param-name {
        min-width: auto;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="header-icon">🎬</div>
        <div class="header-title">
          <h1>Anime API</h1>
          <p>Documentação completa e interativa • v2.0</p>
        </div>
      </div>
      <div class="base-url">
        <span>🌐 Base URL: </span>
        <strong>${base}</strong>
      </div>
    </header>

    <!-- Guia Rápido de Uso -->
    <section class="flow-section">
      <div class="flow-title">
        <span>🔄</span>
        <h2>Fluxo de Uso da API</h2>
      </div>
      
      <div class="flow-steps">
        <!-- Step 1 -->
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-title">Buscar Anime</div>
          <div class="step-desc">
            Primeiro, use o endpoint de busca para encontrar o anime desejado e obter seu ID
          </div>
          <div class="step-example">
            GET /api/search?keyword=naruto
          </div>
        </div>
        
        <!-- Step 2 -->
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-title">Listar Episódios</div>
          <div class="step-desc">
            Com o anime_id, busque todos os episódios disponíveis
          </div>
          <div class="step-example">
            GET /api/episodes?anime_id=40927
          </div>
        </div>
        
        <!-- Step 3 -->
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-title">Obter Vídeo</div>
          <div class="step-desc">
            Use o episode_id para conseguir o link direto do vídeo
          </div>
          <div class="step-example">
            GET /api/episode-video?episode_id=40930
          </div>
        </div>
      </div>
    </section>

    <!-- Grid de Endpoints -->
    <div class="grid">
      
      <!-- Lançamentos -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon">📅</span>
          <span class="card-title">Lançamentos</span>
          <span class="badge badge-new">NOVO</span>
        </div>
        <p class="description">
          Endpoint principal para ver os episódios mais recentes. Suporta paginação completa e limite personalizado.
        </p>
        
        <div class="code-block">
          <pre>${base}/api/lancamentos?pagina=10</pre>
          <pre>${base}/api/lancamentos?pagina=11&limite=5</pre>
          <button class="copy-btn" onclick="copyToClipboard('${base}/api/lancamentos?pagina=10')">📋</button>
        </div>
        
        <div class="params">
          <div class="params-title">📌 Parâmetros</div>
          <div class="param-item">
            <span class="param-name">pagina</span>
            <span class="param-desc">Número da página desejada <span class="param-optional">(padrão: 1)</span></span>
          </div>
          <div class="param-item">
            <span class="param-name">limite</span>
            <span class="param-desc">Máximo de episódios por página <span class="param-optional">(padrão: 20, máx: 30)</span></span>
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon">🔍</span>
          <span class="card-title">Search</span>
        </div>
        <p class="description">
          Busca avançada de animes. Retorna informações detalhadas incluindo ID para uso em outras rotas.
        </p>
        
        <div class="code-block">
          <pre>${base}/api/search?keyword=overlord</pre>
          <pre>${base}/api/search?keyword=naruto&limite=5</pre>
          <button class="copy-btn" onclick="copyToClipboard('${base}/api/search?keyword=overlord')">📋</button>
        </div>
        
        <div class="params">
          <div class="params-title">📌 Parâmetros</div>
          <div class="param-item">
            <span class="param-name">keyword</span>
            <span class="param-desc">Termo de busca <span class="param-required">*obrigatório</span></span>
          </div>
          <div class="param-item">
            <span class="param-name">limite</span>
            <span class="param-desc">Limitar resultados <span class="param-optional">(opcional)</span></span>
          </div>
        </div>
      </div>

      <!-- Episódios -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon">📺</span>
          <span class="card-title">Episódios</span>
        </div>
        <p class="description">
          Lista todos os episódios de um anime específico. Use o anime_id obtido na busca.
        </p>
        
        <div class="code-block">
          <pre>${base}/api/episodes?anime_id=40927</pre>
          <pre>${base}/api/episodes?anime_id=40927&limite=10</pre>
          <button class="copy-btn" onclick="copyToClipboard('${base}/api/episodes?anime_id=40927')">📋</button>
        </div>
        
        <div class="params">
          <div class="params-title">📌 Parâmetros</div>
          <div class="param-item">
            <span class="param-name">anime_id</span>
            <span class="param-desc">ID do anime <span class="param-required">*obrigatório</span></span>
          </div>
          <div class="param-item">
            <span class="param-name">limite</span>
            <span class="param-desc">Limitar resultados <span class="param-optional">(opcional)</span></span>
          </div>
        </div>
      </div>

      <!-- Vídeo do Episódio -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon">🎥</span>
          <span class="card-title">Vídeo</span>
        </div>
        <p class="description">
          Retorna o link direto do vídeo para assistir. Use o episode_id obtido na lista de episódios.
        </p>
        
        <div class="code-block">
          <pre>${base}/api/episode-video?episode_id=40930</pre>
          <button class="copy-btn" onclick="copyToClipboard('${base}/api/episode-video?episode_id=40930')">📋</button>
        </div>
        
        <div class="params">
          <div class="params-title">📌 Parâmetros</div>
          <div class="param-item">
            <span class="param-name">episode_id</span>
            <span class="param-desc">ID do episódio <span class="param-required">*obrigatório</span></span>
          </div>
        </div>
      </div>

      <!-- Sinopse -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon">📖</span>
          <span class="card-title">Sinopse</span>
        </div>
        <p class="description">
          Busca detalhes e sinopse do anime pelo nome. Espaços são convertidos para hífen automaticamente.
        </p>
        
        <div class="code-block">
          <pre>${base}/api/sinopse?nome=Overlord-4-Dublado</pre>
          <pre>${base}/api/sinopse?nome=Solo-Leveling-2</pre>
          <button class="copy-btn" onclick="copyToClipboard('${base}/api/sinopse?nome=Overlord-4-Dublado')">📋</button>
        </div>
        
        <div class="params">
          <div class="params-title">📌 Parâmetros</div>
          <div class="param-item">
            <span class="param-name">nome</span>
            <span class="param-desc">Nome do anime com hífens <span class="param-required">*obrigatório</span></span>
          </div>
        </div>
      </div>

      <!-- Gêneros -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon">🏷️</span>
          <span class="card-title">Gêneros</span>
        </div>
        <p class="description">
          Lista animes por categoria/gênero. Suporta todos os gêneros disponíveis no site.
        </p>
        
        <div class="code-block">
          <pre>${base}/api/genero?genero=acao</pre>
          <pre>${base}/api/genero?genero=comedia</pre>
          <button class="copy-btn" onclick="copyToClipboard('${base}/api/genero?genero=acao')">📋</button>
        </div>
        
        <div class="params">
          <div class="params-title">📌 Parâmetros</div>
          <div class="param-item">
            <span class="param-name">genero</span>
            <span class="param-desc">Gênero desejado (ex: acao, romance, etc) <span class="param-required">*obrigatório</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Exemplo Completo de Resposta -->
    <section class="flow-section">
      <div class="flow-title">
        <span>📦</span>
        <h2>Exemplo de Resposta (Lançamentos)</h2>
      </div>
      
      <div class="response-example">
        <pre>{
  "sucesso": true,
  "pagina": 10,
  "total_paginas": 1571,
  "total_disponivel": 30,
  "total_retornado": 20,
  "limite": 20,
  "dados": [
    {
      "id": "123456",
      "titulo": "Exemplo de Episódio",
      "episodio": "12",
      "dublado": true,
      "thumb": "https://...",
      "data_publicacao": "2024-01-20"
    }
  ]
}</pre>
      </div>
    </section>

    <!-- Dicas de Uso -->
    <section class="flow-section">
      <div class="flow-title">
        <span>💡</span>
        <h2>Dicas de Implementação</h2>
      </div>
      
      <div style="display: grid; gap: 1rem;">
        <div style="background: var(--bg-card); padding: 1rem; border-radius: 12px;">
          <strong style="color: var(--accent-primary);">1. Busca → Episódios → Vídeo</strong>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">
            Fluxo recomendado: Primeiro busque o anime com /search, pegue o ID, use em /episodes, 
            e por fim use o episode_id em /episode-video para obter o link do vídeo.
          </p>
        </div>
        
        <div style="background: var(--bg-card); padding: 1rem; border-radius: 12px;">
          <strong style="color: var(--accent-primary);">2. Paginação Inteligente</strong>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">
            Use o parâmetro "pagina" em /lancamentos para navegar. O campo "total_paginas" 
            na resposta ajuda a criar uma navegação completa.
          </p>
        </div>
        
        <div style="background: var(--bg-card); padding: 1rem; border-radius: 12px;">
          <strong style="color: var(--accent-primary);">3. Limite de Resultados</strong>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">
            Use "limite" para controlar a quantidade de resultados. Recomendado: 20-30 para 
            melhor performance.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="developer">🚀 Desenvolvido por Lopes DVHACKZZ</div>
      <div class="discord">
        <span>💬 Discord: dvhackzz</span>
      </div>
      <div style="margin-top: 1.5rem; color: var(--text-muted); font-size: 0.9rem;">
        <p>📍 Todas as rotas retornam JSON • Cache implementado para melhor performance</p>
        <p style="margin-top: 0.5rem;">📱 Design responsivo • Otimizado para mobile e desktop</p>
      </div>
      <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.8rem;">
        <p>Anime API v2.0 • © 2024 • Todos os direitos reservados</p>
      </div>
    </footer>
  </div>

  <script>
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('URL copiada!');
      });
    }

    // Adicionar efeito de hover nos cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
      });
    });
  </script>
</body>
</html>`;

  return res.status(200).end(html);
};
