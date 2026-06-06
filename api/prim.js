<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transports IDF — Prochains passages</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #f5f4f0; --surface: #ffffff; --border: rgba(0,0,0,0.09);
      --text: #1a1a1a; --muted: #6b6b6b; --accent: #1a56db; --accent-bg: #eef3ff;
      --danger-bg: #fef2f2; --danger-border: #dc2626; --danger-text: #7f1d1d;
      --success: #15803d; --radius: 14px; --radius-sm: 9px;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #111110; --surface: #1c1c1b; --border: rgba(255,255,255,0.09);
        --text: #f0ede8; --muted: #888885; --accent: #5b8af5; --accent-bg: #1a2540;
        --danger-bg: #2a1010; --danger-border: #dc2626; --danger-text: #fca5a5;
      }
    }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
    .app { max-width: 600px; margin: 0 auto; padding: 2rem 1rem 4rem; }
    header { margin-bottom: 2rem; }
    header h1 { font-size: 22px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
    header p { font-size: 13px; color: var(--muted); margin-top: 4px; }
    .search-bar { display: flex; gap: 8px; margin-bottom: 1rem; }
    .search-wrapper { position: relative; flex: 1; }
    .search-wrapper input { width: 100%; }
    .search-bar input {
      height: 42px; padding: 0 14px;
      border: 1px solid var(--border); border-radius: var(--radius-sm);
      background: var(--surface); color: var(--text);
      font-family: inherit; font-size: 14px; outline: none; transition: border-color 0.15s;
    }
    .search-bar input:focus { border-color: var(--accent); }
    .search-bar button {
      height: 42px; padding: 0 18px; border-radius: var(--radius-sm);
      font-family: inherit; font-size: 14px; font-weight: 500;
      cursor: pointer; border: none; background: var(--accent); color: #fff;
    }
    .search-bar button:disabled { opacity: 0.5; cursor: not-allowed; }
    .autocomplete-list {
      position: absolute; top: calc(100% + 4px); left: 0; right: 0;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-sm); box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 100; overflow: hidden; max-height: 320px; overflow-y: auto;
    }
    .autocomplete-list:empty { display: none; }
    .ac-item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 14px; cursor: pointer;
      border-bottom: 1px solid var(--border); transition: background 0.1s;
    }
    .ac-item:last-child { border-bottom: none; }
    .ac-item:hover, .ac-item.active { background: var(--accent-bg); }
    .ac-item-name { font-size: 14px; font-weight: 500; }
    .ac-item-sub  { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .hints { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem; }
    .hint-chip {
      font-size: 12px; padding: 4px 10px; border-radius: 99px;
      border: 1px solid var(--border); background: var(--surface);
      color: var(--muted); cursor: pointer; transition: all 0.12s;
    }
    .hint-chip:hover { border-color: var(--accent); color: var(--accent); }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 8px; }
    .list-item {
      display: flex; align-items: center; gap: 14px;
      padding: 13px 16px; cursor: pointer;
      border-bottom: 1px solid var(--border); transition: background 0.12s;
    }
    .list-item:last-child { border-bottom: none; }
    .list-item:hover { background: var(--bg); }
    .item-info { flex: 1; min-width: 0; }
    .item-name { font-size: 14px; font-weight: 500; }
    .item-sub  { font-size: 12px; color: var(--muted); margin-top: 3px; }
    .dep-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 13px 16px; border-bottom: 1px solid var(--border); gap: 12px;
    }
    .dep-item:last-child { border-bottom: none; }
    .dep-left  { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .dep-dest  { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .dep-mode  { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .dep-right { text-align: right; flex-shrink: 0; }
    .dep-time  { font-size: 20px; font-weight: 600; font-variant-numeric: tabular-nums; }
    .dep-wait  { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .dep-wait.soon { color: var(--success); font-weight: 600; }
    .dep-wait.quai { color: var(--accent); font-weight: 600; }
    .section-label {
      font-size: 12px; font-weight: 600; color: var(--muted);
      text-transform: uppercase; letter-spacing: 0.06em; padding: 0 0 10px;
    }
    .breadcrumb { font-size: 12px; color: var(--muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .breadcrumb span { cursor: pointer; }
    .breadcrumb span:hover { color: var(--accent); text-decoration: underline; }
    .breadcrumb .sep { opacity: 0.4; }
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
    .fresh {
      display: inline-block; font-size: 10px; font-weight: 500; padding: 1px 6px;
      border-radius: 99px; margin-left: 6px; vertical-align: middle;
    }
    .fresh-rt  { background: #dcfce7; color: #166534; }
    .fresh-th  { background: #fef9c3; color: #713f12; }
    @media (prefers-color-scheme: dark) {
      .fresh-rt { background: #14532d; color: #86efac; }
      .fresh-th { background: #422006; color: #fde68a; }
    }
    .refresh-btn {
      width: 100%; height: 38px; border-radius: var(--radius-sm);
      font-family: inherit; font-size: 13px; font-weight: 500;
      cursor: pointer; border: 1px solid var(--border);
      background: var(--surface); color: var(--muted); margin-top: 8px;
    }
    .refresh-btn:hover { background: var(--bg); }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
<div class="app">
  <header>
    <h1>🚇 Transports IDF</h1>
    <p>Horaires temps réel — Bus, Métro, RER, Tram</p>
  </header>

  <div class="search-bar">
    <div class="search-wrapper">
      <input type="text" id="search-input" placeholder="Ex: Châtelet, Les Moulineaux, Nation…" autocomplete="off" />
      <div class="autocomplete-list" id="ac-list"></div>
    </div>
    <button id="search-btn" onclick="searchStops()">Rechercher</button>
  </div>

  <div class="hints">
    <span class="hint-chip" onclick="fillAndSearch('Les Moulineaux')">Les Moulineaux</span>
    <span class="hint-chip" onclick="fillAndSearch('Châtelet')">Châtelet</span>
    <span class="hint-chip" onclick="fillAndSearch('Nation')">Nation</span>
    <span class="hint-chip" onclick="fillAndSearch('Gare du Nord')">Gare du Nord</span>
    <span class="hint-chip" onclick="fillAndSearch('La Défense')">La Défense</span>
  </div>

  <div class="breadcrumb" id="breadcrumb" style="display:none;"></div>

  <div id="view-search">
    <div class="empty" id="search-empty"><div class="icon">🔍</div>Tape le nom d'un arrêt pour commencer.</div>
    <div id="search-results"></div>
  </div>

  <div id="view-lines" style="display:none;">
    <div id="lines-content"></div>
  </div>

  <div id="view-directions" style="display:none;">
    <div id="directions-content"></div>
  </div>

  <div id="view-departures" style="display:none;">
    <div id="departures-content"></div>
  </div>
</div>

<script>
  let state = { stopAreaId:'', stopAreaName:'', lineId:'', lineInfo:null, lineRef:'' };

  // ── Proxy ──────────────────────────────────────────────────────────────────
  async function callProxy(endpoint, params={}) {
    const qs = new URLSearchParams({ endpoint, ...params }).toString();
    const resp = await fetch('/api/prim?' + qs);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    return resp.json();
  }

  // ── Utils ──────────────────────────────────────────────────────────────────
  function showView(name) {
    ['search','lines','directions','departures'].forEach(v =>
      document.getElementById('view-'+v).style.display = v===name?'block':'none'
    );
  }

  function updateBreadcrumb(items) {
    const bc = document.getElementById('breadcrumb');
    if (!items.length) { bc.style.display='none'; return; }
    bc.style.display='flex';
    bc.innerHTML = items.map((it,i) =>
      i < items.length-1
        ? `<span onclick="${it.fn}">${it.label}</span><span class="sep">›</span>`
        : `<strong>${it.label}</strong>`
    ).join('');
  }

  function formatTime(d) {
    return d ? d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) : '—';
  }

  function textColor(hex) {
    const r=parseInt(hex.slice(0,2),16), g=parseInt(hex.slice(2,4),16), b=parseInt(hex.slice(4,6),16);
    return (r*299+g*587+b*114)/1000>128?'#000':'#fff';
  }

  function lineIcon(info, size=30) {
    const code  = String(info.code||info.label||'?');
    const mode  = (info.commercial_mode||'').toLowerCase();
    const bg    = info.color?'#'+info.color.replace('#',''):'#888';
    const fg    = textColor(info.color?info.color.replace('#',''):'888888');
    const cx=size/2, cy=size/2;
    const fs = code.length<=2?Math.round(size*.46):code.length===3?Math.round(size*.34):Math.round(size*.27);
    let shape, w=size;
    if (mode.includes('métro')||mode.includes('metro')) {
      shape=`<circle cx="${cx}" cy="${cy}" r="${cx-.5}" fill="${bg}"/>`;
    } else if (mode.includes('rer')||mode.includes('transilien')||mode.includes('train')) {
      const rx=Math.round(size*.22);
      shape=`<rect x=".5" y=".5" width="${size-1}" height="${size-1}" rx="${rx}" fill="${bg}"/>`;
    } else if (mode.includes('tram')) {
      shape=`<polygon points="${cx},.5 ${size-.5},${cy} ${cx},${size-.5} .5,${cy}" fill="${bg}"/>`;
    } else {
      const charW=fs*.65;
      w=Math.max(size, Math.round(charW*code.length+size*.5));
      const rx=Math.round(size*.22);
      shape=`<rect x=".5" y=".5" width="${w-1}" height="${size-1}" rx="${rx}" fill="${bg}"/>`;
      return `<svg width="${w}" height="${size}" viewBox="0 0 ${w} ${size}" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0;"><title>Ligne ${code}</title>${shape}<text x="${w/2}" y="${cy}" dominant-baseline="central" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="${fs}" font-weight="700" fill="${fg}">${code}</text></svg>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0;"><title>Ligne ${code}</title>${shape}<text x="${cx}" y="${cy}" dominant-baseline="central" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="${fs}" font-weight="700" fill="${fg}">${code}</text></svg>`;
  }

  function getModeIcon(name) {
    const m=(name||'').toLowerCase();
    if (m.includes('métro')||m.includes('metro')) return '🚇';
    if (m.includes('rer')||m.includes('transilien')||m.includes('train')) return '🚆';
    if (m.includes('tram')) return '🚊';
    if (m.includes('bus')||m.includes('noctilien')) return '🚌';
    return '🚉';
  }

  // Extrait le numéro Q: depuis un ID Navitia
  // "stop_point:IDFM:22297" → "22297"
  // "stop_point:IDFM:monomodalStopPlace:45102" → "45102"
  function extractQId(id) {
    if (!id) return null;
    let m = id.match(/monomodalStopPlace:(\d+)/);
    if (m) return m[1];
    m = id.match(/:(\d+)$/);
    if (m) return m[1];
    return null;
  }

  // "line:IDFM:C01390" → "STIF:Line::C01390:"
  function toLineRef(lineId) {
    const m = lineId.match(/IDFM:(C\d+)/);
    return m ? `STIF:Line::${m[1]}:` : null;
  }

  function fillAndSearch(name) {
    document.getElementById('search-input').value = name;
    closeAC(); searchStops();
  }

  // ── Autocomplete ────────────────────────────────────────────────────────────
  let acTimer=null, acIndex=-1, acResults=[];
  const inputEl = document.getElementById('search-input');
  const acList  = document.getElementById('ac-list');

  inputEl.addEventListener('input', () => {
    clearTimeout(acTimer);
    const q = inputEl.value.trim();
    if (q.length < 2) { closeAC(); return; }
    acTimer = setTimeout(() => fetchAC(q), 250);
  });

  inputEl.addEventListener('keydown', e => {
    if (e.key==='Enter') { if (acIndex>=0&&acResults[acIndex]) { selectAC(acResults[acIndex]); return; } closeAC(); searchStops(); return; }
    if (e.key==='ArrowDown')  { e.preventDefault(); moveAC(1); return; }
    if (e.key==='ArrowUp')    { e.preventDefault(); moveAC(-1); return; }
    if (e.key==='Escape')     { closeAC(); return; }
  });

  document.addEventListener('click', e => { if (!e.target.closest('.search-wrapper')) closeAC(); });

  async function fetchAC(q) {
    acList.innerHTML = '<div style="padding:14px;text-align:center;font-size:13px;color:var(--muted);"><span class="spinner"></span></div>';
    try {
      const data = await callProxy('v2/navitia/places', { q, count: 8 });
      acResults = (data.places||[]).filter(p => p.embedded_type==='stop_area'||p.embedded_type==='stop_point');
      renderAC();
    } catch { closeAC(); }
  }

  function renderAC() {
    acIndex=-1;
    if (!acResults.length) { acList.innerHTML=''; return; }
    acList.innerHTML = acResults.map((p,i) => {
      const s = p.stop_area||p.stop_point;
      const modes = (s.physical_modes||[]).map(m=>m.name).join(', ');
      return `<div class="ac-item" data-i="${i}"><div style="font-size:18px;flex-shrink:0;">📍</div><div><div class="ac-item-name">${s.name}</div>${modes?`<div class="ac-item-sub">${modes}</div>`:''}</div></div>`;
    }).join('');
    acList.querySelectorAll('.ac-item').forEach(el => {
      const i=+el.dataset.i;
      el.addEventListener('mousedown', e => { e.preventDefault(); selectAC(acResults[i]); });
    });
  }

  function moveAC(dir) {
    const items=acList.querySelectorAll('.ac-item'); if (!items.length) return;
    items[acIndex]?.classList.remove('active');
    acIndex=Math.max(0,Math.min(acResults.length-1,acIndex+dir));
    items[acIndex]?.classList.add('active');
    items[acIndex]?.scrollIntoView({block:'nearest'});
  }

  function selectAC(place) {
    const s=place.stop_area||place.stop_point;
    inputEl.value=s.name; closeAC();
    loadLines(s.id, s.name);
  }

  function closeAC() { acList.innerHTML=''; acIndex=-1; acResults=[]; }

  // ── Vue 1 : Recherche ───────────────────────────────────────────────────────
  async function searchStops() {
    const q=document.getElementById('search-input').value.trim(); if (!q) return;
    const btn=document.getElementById('search-btn');
    btn.disabled=true; btn.innerHTML='<span class="spinner"></span>';
    showView('search'); updateBreadcrumb([]);
    const empty=document.getElementById('search-empty');
    const results=document.getElementById('search-results');
    empty.innerHTML='<span class="spinner"></span> Recherche en cours…'; empty.style.display='block'; results.innerHTML='';
    try {
      const data=await callProxy('v2/navitia/places',{q,count:10});
      const places=(data.places||[]).filter(p=>p.embedded_type==='stop_area'||p.embedded_type==='stop_point');
      empty.style.display='none';
      if (!places.length) { empty.innerHTML=`<div class="icon">😕</div>Aucun arrêt trouvé pour « ${q} ».`; empty.style.display='block'; btn.disabled=false; btn.textContent='Rechercher'; return; }
      const card=document.createElement('div'); card.className='card';
      places.forEach(p => {
        const s=p.stop_area||p.stop_point; if (!s) return;
        const modes=(s.physical_modes||[]).map(m=>m.name).join(', ');
        const item=document.createElement('div'); item.className='list-item';
        item.innerHTML=`<div style="font-size:22px;">📍</div><div class="item-info"><div class="item-name">${s.name}</div>${modes?`<div class="item-sub">${modes}</div>`:''}</div><span style="color:var(--muted);font-size:20px;">›</span>`;
        item.onclick=()=>loadLines(s.id,s.name);
        card.appendChild(item);
      });
      results.appendChild(card);
    } catch(e) { empty.innerHTML=`<div class="error-box">Erreur : ${e.message}</div>`; empty.style.display='block'; }
    btn.disabled=false; btn.textContent='Rechercher';
  }

  // ── Vue 2 : Lignes ──────────────────────────────────────────────────────────
  async function loadLines(stopAreaId, stopAreaName) {
    state.stopAreaId=stopAreaId; state.stopAreaName=stopAreaName;
    showView('lines');
    updateBreadcrumb([
      {label:document.getElementById('search-input').value, fn:'backToSearch()'},
      {label:stopAreaName}
    ]);
    const el=document.getElementById('lines-content');
    el.innerHTML='<div class="empty"><span class="spinner"></span> Chargement des lignes…</div>';
    try {
      const data=await callProxy('v2/navitia/stop_areas/'+stopAreaId+'/lines',{count:40});
      const lines=data.lines||[];
      el.innerHTML=`<div class="section-label">Lignes disponibles — ${stopAreaName}</div>`;
      if (!lines.length) { el.innerHTML+='<div class="empty"><div class="icon">😕</div>Aucune ligne trouvée.</div>'; return; }

      const byMode=new Map();
      lines.forEach(l => {
        const mode=l.commercial_modes?.[0]?.name||l.physical_modes?.[0]?.name||'Autre';
        if (!byMode.has(mode)) byMode.set(mode,[]);
        byMode.get(mode).push(l);
      });

      byMode.forEach((linesInMode, modeName) => {
        const modeLabel=document.createElement('div');
        modeLabel.style.cssText='font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;padding:12px 16px 4px;';
        modeLabel.textContent=getModeIcon(modeName)+' '+modeName;
        el.appendChild(modeLabel);
        const card=document.createElement('div'); card.className='card';
        linesInMode.forEach(l => {
          const info={code:l.code||l.name, color:l.color, commercial_mode:l.commercial_modes?.[0]?.name||''};
          const termini=[...new Set((l.routes||[]).map(r=>r.direction?.stop_area?.name||r.name||'').filter(Boolean))].slice(0,3).join(' · ');
          const item=document.createElement('div'); item.className='list-item';
          item.innerHTML=`<div style="flex-shrink:0;">${lineIcon(info,34)}</div><div class="item-info"><div class="item-name">${l.name||l.code}</div>${termini?`<div class="item-sub">${termini}</div>`:''}</div><span style="color:var(--muted);font-size:20px;">›</span>`;
          item.onclick=()=>loadDirections(stopAreaId,stopAreaName,l.id,info,l.name||l.code);
          card.appendChild(item);
        });
        el.appendChild(card);
      });
    } catch(e) { el.innerHTML=`<div class="error-box">Erreur : ${e.message}</div>`; }
  }

  // ── Vue 3 : Directions ──────────────────────────────────────────────────────
  async function loadDirections(stopAreaId, stopAreaName, lineId, lineInfo, lineName) {
    state.lineId=lineId; state.lineInfo=lineInfo;
    state.lineRef=toLineRef(lineId);
    showView('directions');
    updateBreadcrumb([
      {label:document.getElementById('search-input').value, fn:'backToSearch()'},
      {label:stopAreaName, fn:`loadLines('${stopAreaId}','${stopAreaName.replace(/'/g,"\\'")}')` },
      {label:lineName}
    ]);
    const el=document.getElementById('directions-content');
    el.innerHTML='<div class="empty"><span class="spinner"></span> Chargement des directions…</div>';

    try {
      // Récupère les stop_points de cette ligne sur cet arrêt
      const data=await callProxy('v2/navitia/stop_areas/'+stopAreaId+'/lines/'+lineId+'/stop_points',{count:30});
      const stopPoints=data.stop_points||[];

      if (!stopPoints.length) throw new Error('Aucun quai trouvé');

      // Construit la map des directions depuis les routes de chaque stop_point
      const dirMap=new Map();
      stopPoints.forEach(sp => {
        const qId=extractQId(sp.id);
        (sp.routes||[]).forEach(r => {
          const terminus=r.direction?.stop_area?.name||r.name||'?';
          if (!dirMap.has(r.id)) dirMap.set(r.id,{terminus, qIds:[qId], routeId:r.id});
          else if (qId && !dirMap.get(r.id).qIds.includes(qId)) dirMap.get(r.id).qIds.push(qId);
        });
      });

      el.innerHTML=`<div class="section-label">${lineIcon(lineInfo,22)}&nbsp; ${lineName} — Choisir une direction</div>`;

      if (!dirMap.size) {
        el.innerHTML+='<div class="empty"><div class="icon">😕</div>Aucune direction trouvée.</div>'; return;
      }

      const card=document.createElement('div'); card.className='card';
      dirMap.forEach(({terminus, qIds}) => {
        const item=document.createElement('div'); item.className='list-item';
        item.innerHTML=`<div style="flex-shrink:0;">${lineIcon(lineInfo,36)}</div><div class="item-info"><div class="item-name">→ ${terminus}</div></div><span style="color:var(--muted);font-size:20px;">›</span>`;
        item.onclick=()=>loadDepartures(terminus, qIds, stopAreaId, stopAreaName, lineName);
        card.appendChild(item);
      });
      el.appendChild(card);
    } catch(e) {
      el.innerHTML=`<div class="error-box">Erreur : ${e.message}</div>`;
    }
  }

  // ── Vue 4 : Horaires temps réel via estimated-timetable ─────────────────────
  async function loadDepartures(terminus, qIds, stopAreaId, stopAreaName, lineName) {
    showView('departures');
    updateBreadcrumb([
      {label:document.getElementById('search-input').value, fn:'backToSearch()'},
      {label:stopAreaName, fn:`loadLines('${stopAreaId}','${stopAreaName.replace(/'/g,"\\'")}')` },
      {label:lineName, fn:`loadDirections('${stopAreaId}','${stopAreaName.replace(/'/g,"\\'")}','${state.lineId}',${JSON.stringify(state.lineInfo)},'${lineName.replace(/'/g,"\\'")}')` },
      {label:'→ '+terminus}
    ]);
    state.currentTerminus=terminus;
    state.currentQIds=qIds;
    state.currentStopAreaId=stopAreaId;
    state.currentStopAreaName=stopAreaName;
    state.currentLineName=lineName;
    await refreshDepartures();
  }

  async function refreshDepartures() {
    const el=document.getElementById('departures-content');
    el.innerHTML='<div class="empty"><span class="spinner"></span> Chargement des horaires temps réel…</div>';

    const {currentTerminus:terminus, currentQIds:qIds, lineRef, lineInfo, lineId} = state;

    try {
      if (!lineRef) throw new Error('LineRef manquant');

      // Appel estimated-timetable = temps réel SIRI
      const data=await callProxy('estimated-timetable',{LineRef:lineRef});

      const departures=parseEstimatedTimetable(data, qIds, terminus);

      el.innerHTML='';

      // Header
      const header=document.createElement('div');
      header.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:14px;';
      header.innerHTML=`${lineIcon(lineInfo,30)}<span style="font-size:15px;font-weight:500;">→ ${terminus}</span><span class="fresh fresh-rt">⚡ Temps réel</span>`;
      el.appendChild(header);

      if (!departures.length) {
        el.innerHTML+='<div class="empty"><div class="icon">🕐</div>Aucun passage imminent trouvé.</div>';
        renderRefreshBtn(el); return;
      }

      const card=document.createElement('div'); card.className='card';

      departures.forEach(dep => {
        const expected=new Date(dep.expectedTime);
        const aimed=dep.aimedTime?new Date(dep.aimedTime):null;
        const timeStr=formatTime(expected);
        const waitMin=Math.round((expected-Date.now())/60000);
        let waitLabel='', waitClass='';
        if (dep.vehicleAtStop) { waitLabel='À quai'; waitClass='quai'; }
        else if (waitMin<=0)   { waitLabel='À quai'; waitClass='quai'; }
        else if (waitMin<=1)   { waitLabel='1 min';  waitClass='soon'; }
        else                   { waitLabel=waitMin+' min'; waitClass=waitMin<=4?'soon':''; }

        // Calcul du retard
        let delayBadge='';
        if (aimed) {
          const delayMin=Math.round((expected-aimed)/60000);
          if (delayMin>0)      delayBadge=`<span style="font-size:11px;color:#dc2626;font-weight:600;margin-left:4px;">+${delayMin} min</span>`;
          else if (delayMin<0) delayBadge=`<span style="font-size:11px;color:#15803d;font-weight:600;margin-left:4px;">${delayMin} min</span>`;
        }

        const cancelBadge=dep.cancelled?'<span style="font-size:11px;color:#dc2626;font-weight:600;margin-left:4px;">Supprimé</span>':'';

        const item=document.createElement('div'); item.className='dep-item';
        item.innerHTML=`
          <div class="dep-left">
            ${lineIcon(lineInfo,32)}
            <div style="min-width:0;">
              <div class="dep-dest">${dep.destination||terminus}</div>
              <div class="dep-mode">${lineInfo.commercial_mode||''}</div>
            </div>
          </div>
          <div class="dep-right">
            <div class="dep-time">${timeStr}${delayBadge}${cancelBadge}</div>
            <div class="dep-wait ${waitClass}">${waitLabel}</div>
          </div>`;
        card.appendChild(item);
      });

      el.appendChild(card);
      renderRefreshBtn(el);
    } catch(e) {
      el.innerHTML=`<div class="error-box">Erreur : ${e.message}</div>`;
      renderRefreshBtn(el);
    }
  }

  // Parse estimated-timetable et filtre sur les qIds et le terminus
  function parseEstimatedTimetable(data, qIds, terminus) {
    const frame=data?.Siri?.ServiceDelivery?.EstimatedTimetableDelivery?.[0]
      ?.EstimatedJourneyVersionFrame?.[0];
    const journeys=frame?.EstimatedVehicleJourney||[];
    const now=Date.now();
    const result=[];

    journeys.forEach(vj => {
      const calls=vj.EstimatedCalls?.EstimatedCall||[];
      calls.forEach(call => {
        // Vérifie que c'est bien un de nos quais
        const spRef=call.StopPointRef?.value||'';
        const matchesStop=qIds.some(id => id && spRef.includes(':Q:'+id+':'));
        if (!matchesStop) return;

        // Destination
        const dest=call.DestinationDisplay?.[0]?.value
          ||vj.DestinationName?.[0]?.value
          ||vj.DestinationShortName?.[0]?.value||'';

        // Filtre terminus souple
        if (terminus && dest) {
          const t=terminus.toLowerCase(), d=dest.toLowerCase();
          if (!t.includes(d.split(' ')[0]) && !d.includes(t.split(' ')[0])) return;
        }

        const expectedTime=call.ExpectedDepartureTime||call.ExpectedArrivalTime
          ||call.AimedDepartureTime||call.AimedArrivalTime;
        const aimedTime=call.AimedDepartureTime||call.AimedArrivalTime;

        if (!expectedTime) return;
        if (new Date(expectedTime).getTime() < now-60000) return;

        result.push({
          expectedTime,
          aimedTime,
          destination: dest||terminus,
          vehicleAtStop: call.VehicleAtStop===true,
          cancelled: call.DepartureStatus==='cancelled'||call.ArrivalStatus==='cancelled',
          status: call.DepartureStatus||''
        });
      });
    });

    result.sort((a,b)=>new Date(a.expectedTime)-new Date(b.expectedTime));
    return result;
  }

  function renderRefreshBtn(el) {
    const btn=document.createElement('button');
    btn.className='refresh-btn';
    btn.textContent='↻ Actualiser';
    btn.onclick=refreshDepartures;
    el.appendChild(btn);
  }

  function backToSearch() { showView('search'); updateBreadcrumb([]); }
</script>
</body>
</html>
