// Shared player identity + per-game leaderboards for the playground.
// localStorage always works as the local cache/fallback; when API is set
// to the deployed Cloudflare Worker URL, boards become global.
const API = 'https://api.bytescribble.com';
const PLAYER_KEY = 'bs-player';
const SCORES_KEY = 'bs-scores-v1';
const KEEP = 25;
const SHOW = 10;

// localStorage override for testing against a local `wrangler dev`:
//   localStorage.setItem('bs-api', 'http://localhost:8787')
function apiBase() {
  try { return localStorage.getItem('bs-api') || API; } catch { return API; }
}

export function getPlayer() {
  try { return localStorage.getItem(PLAYER_KEY) || ''; } catch { return ''; }
}

function setPlayer(name) {
  try { localStorage.setItem(PLAYER_KEY, name); } catch {}
}

function loadAll() {
  try { return JSON.parse(localStorage.getItem(SCORES_KEY)) || {}; } catch { return {}; }
}

function saveAll(data) {
  try { localStorage.setItem(SCORES_KEY, JSON.stringify(data)); } catch {}
}

function boardCfg() {
  const el = document.getElementById('leaderboard');
  if (!el) return null;
  return { el, game: el.dataset.game, mode: el.dataset.mode || 'high', unit: el.dataset.unit || '' };
}

export function submitScore(value) {
  const c = boardCfg();
  if (!c || !Number.isFinite(value)) return;
  const name = getPlayer() || 'Anonymous';
  const all = loadAll();
  const list = all[c.game] || [];
  let entry = list.find((e) => e.name === name);
  if (c.mode === 'tally') {
    if (!entry) { entry = { name, score: 0, at: 0 }; list.push(entry); }
    entry.score += value;
    entry.at = Date.now();
  } else if (!entry) {
    list.push({ name, score: value, at: Date.now() });
  } else if (c.mode === 'low' ? value < entry.score : value > entry.score) {
    entry.score = value;
    entry.at = Date.now();
  }
  list.sort((a, b) => (c.mode === 'low' ? a.score - b.score : b.score - a.score));
  all[c.game] = list.slice(0, KEEP);
  saveAll(all);
  renderList(c, all[c.game], false);

  const base = apiBase();
  if (!base) return;
  fetch(`${base}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game: c.game, name, score: value })
  })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => { if (d?.scores) renderList(c, d.scores, true); })
    .catch(() => {});
}

export function renderBoard() {
  const c = boardCfg();
  if (!c) return;
  renderList(c, loadAll()[c.game] || [], false);
  const base = apiBase();
  if (!base) return;
  fetch(`${base}/scores?game=${encodeURIComponent(c.game)}`)
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => { if (d?.scores) renderList(c, d.scores, true); })
    .catch(() => {});
}

function renderList(c, entries, isGlobal) {
  const label = document.querySelector('.board-label');
  if (label && isGlobal) label.textContent = 'Global leaderboard';
  const list = entries.slice(0, SHOW);
  const me = getPlayer();
  c.el.innerHTML = '';
  if (!list.length) {
    const li = document.createElement('li');
    li.className = 'board-empty';
    li.textContent = 'No scores yet — set the bar.';
    c.el.appendChild(li);
    return;
  }
  list.forEach((e) => {
    const li = document.createElement('li');
    if (me && e.name === me) li.className = 'me';
    const n = document.createElement('span');
    n.className = 'board-name';
    n.textContent = e.name;
    const s = document.createElement('span');
    s.className = 'board-score';
    s.textContent = c.unit ? `${e.score} ${c.unit}` : String(e.score);
    li.append(n, s);
    c.el.appendChild(li);
  });
}

const readyCbs = [];
let readyFired = false;

// Games call ready(init): init runs immediately for a known player,
// otherwise after the name gate is submitted.
export function ready(cb) {
  if (readyFired || getPlayer()) {
    readyFired = true;
    cb();
  } else {
    readyCbs.push(cb);
  }
}

export function initArcade() {
  renderBoard();
  const gate = document.getElementById('name-gate');
  const input = document.getElementById('name-input');
  const chip = document.getElementById('player-chip');
  const change = document.getElementById('change-name');
  if (!gate || !input) return;

  const updateChip = () => { if (chip) chip.textContent = getPlayer() || '—'; };
  const openGate = () => {
    gate.hidden = false;
    input.value = getPlayer();
    setTimeout(() => input.focus(), 0);
  };

  updateChip();
  if (!getPlayer()) openGate();

  // keep name-typing keystrokes away from game key handlers
  input.addEventListener('keydown', (e) => e.stopPropagation());

  gate.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = input.value.trim().slice(0, 18);
    if (!name) return;
    setPlayer(name);
    gate.hidden = true;
    updateChip();
    renderBoard();
    if (!readyFired) {
      readyFired = true;
      readyCbs.splice(0).forEach((cb) => cb());
    }
  });

  change?.addEventListener('click', openGate);
}
