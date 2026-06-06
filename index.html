<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transports IDF — Prochains passages</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #f5f4f0; --surface: #ffffff; --border: rgba(0,0,0,0.1);
      --text: #1a1a1a; --muted: #6b6b6b; --accent: #1a56db; --accent-bg: #eef3ff;
      --danger-bg: #fef2f2; --danger-border: #dc2626; --danger-text: #7f1d1d;
      --warn-bg: #fffbeb; --warn-border: #d97706; --warn-text: #92400e;
      --success: #15803d; --radius: 12px; --radius-sm: 8px;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #111110; --surface: #1c1c1b; --border: rgba(255,255,255,0.1);
        --text: #f0ede8; --muted: #888885; --accent: #5b8af5; --accent-bg: #1a2540;
        --danger-bg: #2a1010; --danger-border: #dc2626; --danger-text: #fca5a5;
        --warn-bg: #2a2010; --warn-border: #d97706; --warn-text: #fbbf24;
      }
    }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
    .app { max-width: 600px; margin: 0 auto; padding: 2rem 1rem 4rem; }
    header { margin-bottom: 2rem; }
    header h1 { font-size: 22px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
    header p { font-size: 13px; color: var(--muted); margin-top: 4px; }
    .search-bar { display: flex; gap: 8px; margin-bottom: 1rem; }
    .search-bar input {
      flex: 1; height: 42px; padding: 0 14px;
      border: 1px solid var(--border); border-radius: var(--radius-sm);
      background: var(--surface); color: var(--text);
      font-family: inherit; font-size: 14px; outline: none;
      transition: border-color 0.15s;
    }
    .search-bar input:focus { border-color: var(--accent); }
    .search-bar button {
      height: 42px; padding: 0 18px; border-radius: var(--radius-sm);
      font-family: inherit; font-size: 14px; font-weight: 500;
      cursor: pointer; border: none; background: var(--accent); color: #fff;
      transition: opacity 0.15s;
    }
    .search-bar button:hover { opacity: 0.9; }
    .search-bar button:disabled { opacity: 0.5; cursor: not-allowed; }
    .hints { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem; }
    .hint-chip {
      font-size: 12px; padding: 4px 10px; border-radius: 99px;
      border: 1px solid var(--border); background: var(--surface);
      color: var(--muted); cursor: pointer; transition: all 0.12s;
    }
    .hint-chip:hover { border-color: var(--accent); color: var(--accent); }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 8px; }
    .stop-item {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; cursor: pointer;
      border-bottom: 1px solid var(--border);
      transition: background 0.12s;
    }
    .stop-item:last-child { border-bottom: none; }
    .stop-item:hover { background: var(--bg); }
    .stop-icon {
      width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
      background: var(--accent-bg); color: var(--accent);
      display: flex; align-items: center; justify-content: center; font-size: 16px;
    }
    .stop-name { font-size: 14px; font-weight: 500; }
    .stop-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .stop-lines { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
    .badge {
      font-size: 11px; font-weight: 500; padding: 2px 8px;
      border-radius: 4px; border: 1px solid var(--border);
      background: var(--bg); color: var(--muted);
    }
    .departure-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 13px 16px; border-bottom: 1px solid var(--border);
    }
    .departure-item:last-child { border-bottom: none; }
    .departure-dest { font-size: 14px; font-weight: 500; }
    .departure-line { margin-top: 4px; }
    .departure-time { font-size: 20px; font-weight: 600; text-align: right; }
    .departure-wait { font-size: 12px; color: var(--muted); text-align: right; margin-top: 2px; }
    .departure-wait.soon { color: var(--success); font-weight: 600; }
    .section-label {
      font-size: 12px; font-weight: 600; color: var(--muted);
      text-transform: uppercase; letter-spacing: 0.06em;
      padding: 0 0 10px;
    }
    .back-btn {
      display: none; align-items: center; gap: 6px;
      font-family: inherit; font-size: 13px; color: var(--muted);
      background: none; border: none; cursor: pointer; margin-bottom: 1rem; padding: 0;
    }
    .back-btn:hover { color: var(--text); }
    .empty { text-align: center; padding: 3rem 1rem; color: var(--muted); font-size: 14px; }
    .empty .icon { font-size: 36px; margin-bottom: 12px; }
    .error-box {
      background: var(--danger-bg); border: 1px solid var(--danger-border);
      border-radius: var(--radius-sm); padding: 12px 16px;
      font-size: 13px; color: var(--danger-text);
    }
    .spinner {
      display: inline-block; width: 16px; height: 16px;
      border: 2px solid var(--border); border-top-color: var(--muted);
      border-radius: 50%; animation: spin 0.7s linear infinite;
      vertical-align: -3px; margin-right: 6px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
<div class="app">
  <header>
    <h1>🚇 Transports IDF</h1>
    <p>Recherche un arrêt pour voir les prochains passages en temps réel</p>
  </header>

  <div class="search-bar">
    <input type="text" id="search-input" placeholder="Ex: Châtelet, Nation, Montparnasse…" />
    <button id="search-btn" onclick="searchStops()">Rechercher</button>
  </div>

  <div class="hints">
    <span class="hint-chip" onclick="fillAndSearch('Châtelet')">Châtelet</span>
    <span class="hint-chip" onclick="fillAndSearch('Nation')">Nation</span>
    <span class="hint-chip" onclick="fillAndSearch('Montparnasse')">Montparnasse</span>
    <span class="hint-chip" onclick="fillAndSearch('La Défense')">La Défense</span>
    <span class="hint-chip" onclick="fillAndSearch('Gare du Nord')">Gare du Nord</span>
    <span class="hint-chip" onclick="fillAndSearch('Saint-Lazare')">Saint-Lazare</span>
  </div>

  <button class="back-btn" id="back-btn" onclick="backToResults()">← Retour aux résultats</button>

  <div id="view-search">
    <div class="empty" id="search-empty">
      <div class="icon">🔍</div>
      Tape le nom d'un arrêt et clique sur Rechercher.
    </div>
    <div id="search-results"></div>
  </div>

  <div id="view-departures" style="display:none;">
    <div id="departures-content"></div>
  </div>
</div>

<script>
  async function callProxy(endpoint, params = {}) {
    const qs = new URLSearchParams({ endpoint, ...params }).toString();
    const resp = await fetch('/api/prim?' + qs);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    return resp.json();
  }

  function fillAndSearch(name) {
    document.getElementById('search-input').value = name;
    searchStops();
  }

  document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') searchStops();
  });

  async function searchStops() {
    const q = document.getElementById('search-input').value.trim();
    if (!q) return;

    const btn = document.getElementById('search-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>';

    document.getElementById('view-search').style.display = 'block';
    document.getElementById('view-departures').style.display = 'none';
    document.getElementById('back-btn').style.display = 'none';

    const empty = document.getElementById('search-empty');
    const results = document.getElementById('search-results');
    empty.innerHTML = '<span class="spinner"></span> Recherche en cours…';
    empty.style.display = 'block';
    results.innerHTML = '';

    try {
      const data = await callProxy('v2/navitia/places', { q, count: 10 });
      const places = (data.places || []).filter(p =>
        p.embedded_type === 'stop_point' || p.embedded_type === 'stop_area'
      );

      empty.style.display = 'none';

      if (!places.length) {
        empty.innerHTML = '<div class="icon">😕</div>Aucun arrêt trouvé pour « ' + q + ' ».';
        empty.style.display = 'block';
        btn.disabled = false; btn.textContent = 'Rechercher';
        return;
      }

      const card = document.createElement('div');
      card.className = 'card';

      places.forEach(p => {
        const s = p.stop_point || p.stop_area;
        if (!s) return;
        const modes = (s.physical_modes || []).map(m => m.name).join(', ') || '';
        const lines = (s.lines || []).slice(0, 6)
          .map(l => `<span class="badge">${l.code || l.name || '?'}</span>`).join('');

        const item = document.createElement('div');
        item.className = 'stop-item';
        item.innerHTML = `
          <div class="stop-icon">📍</div>
          <div style="flex:1; min-width:0;">
            <div class="stop-name">${s.name}</div>
            ${modes ? `<div class="stop-meta">${modes}</div>` : ''}
            ${lines ? `<div class="stop-lines">${lines}</div>` : ''}
          </div>
          <span style="color:var(--muted); font-size:20px;">›</span>
        `;
        item.onclick = () => openStop(s, p.embedded_type);
        card.appendChild(item);
      });

      results.appendChild(card);
    } catch (e) {
      empty.innerHTML = `<div class="error-box">Erreur : ${e.message}</div>`;
      empty.style.display = 'block';
    }

    btn.disabled = false;
    btn.textContent = 'Rechercher';
  }

  async function openStop(stop, type) {
    document.getElementById('view-search').style.display = 'none';
    document.getElementById('view-departures').style.display = 'block';
    document.getElementById('back-btn').style.display = 'flex';

    const el = document.getElementById('departures-content');
    el.innerHTML = '<div class="empty"><span class="spinner"></span> Chargement des passages…</div>';

    // Pour les stop_area on utilise StopArea, pour stop_point on utilise StopPoint
    const monitoringRef = type === 'stop_area'
      ? stop.id.replace('stop_area:', 'STIF:StopArea:SP:').replace('IDFM:', '')
      : stop.id;

    try {
      const data = await callProxy('stop-monitoring', {
        MonitoringRef: stop.id,
        MaximumStopVisits: 20
      });

      const visits = data.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit || [];

      el.innerHTML = `<div class="section-label">📍 ${stop.name}</div>`;

      if (!visits.length) {
        el.innerHTML += '<div class="empty"><div class="icon">🕐</div>Aucun passage imminent trouvé pour cet arrêt.</div>';
        return;
      }

      const card = document.createElement('div');
      card.className = 'card';

      visits.forEach(v => {
        const j = v.MonitoredVehicleJourney;
        const call = j.MonitoredCall;
        const expected = call?.ExpectedDepartureTime || call?.AimedDepartureTime
                      || call?.ExpectedArrivalTime  || call?.AimedArrivalTime;
        const dest = j.DestinationName?.[0]?.value || j.DirectionName?.[0]?.value || '?';
        const lineName = j.PublishedLineName?.[0]?.value || '?';
        const timeStr = expected ? formatTime(expected) : '—';
        const waitMin = expected ? Math.round((new Date(expected) - Date.now()) / 60000) : null;
        const waitLabel = waitMin === null ? '' : waitMin <= 0 ? 'À quai' : waitMin + ' min';
        const soonClass = waitMin !== null && waitMin <= 2 ? ' soon' : '';

        const item = document.createElement('div');
        item.className = 'departure-item';
        item.innerHTML = `
          <div>
            <div class="departure-dest">${dest}</div>
            <div class="departure-line"><span class="badge">${lineName}</span></div>
          </div>
          <div>
            <div class="departure-time">${timeStr}</div>
            <div class="departure-wait${soonClass}">${waitLabel}</div>
          </div>
        `;
        card.appendChild(item);
      });

      el.appendChild(card);
    } catch (e) {
      el.innerHTML = `<div class="error-box">Erreur : ${e.message}</div>`;
    }
  }

  function backToResults() {
    document.getElementById('view-search').style.display = 'block';
    document.getElementById('view-departures').style.display = 'none';
    document.getElementById('back-btn').style.display = 'none';
  }

  function formatTime(iso) {
    return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
</script>
</body>
</html>
