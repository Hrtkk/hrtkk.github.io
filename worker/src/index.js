// Global leaderboard for bytescribble.com/playground.
// Storage: one KV entry per game holding the top KEEP entries as JSON.
// KV is read-modify-write without locks; concurrent submits can race.
// Fine for a hobby leaderboard — last write wins and the lists re-heal.

const KEEP = 50;
const SHOW = 10;
const NAME_MAX = 18;

// Per-game score rules; caps keep drive-by junk out of the board.
const GAMES = {
  snake: { mode: 'high', min: 0, max: 4000 },
  breakout: { mode: 'high', min: 0, max: 450 },
  pong: { mode: 'high', min: 0, max: 7 },
  flappy: { mode: 'high', min: 0, max: 1000 },
  'balloon-pop': { mode: 'high', min: 0, max: 500000 },
  memory: { mode: 'low', min: 16, max: 2000 },
  'typing-test': { mode: 'high', min: 0, max: 250 },
  'tic-tac-toe': { mode: 'tally', min: 1, max: 1 }
};

const ALLOWED_ORIGINS = [
  'https://bytescribble.com',
  'https://www.bytescribble.com',
  'http://localhost:4321',
  'http://localhost:4325'
];

const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
});

const json = (body, status, cors) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors }
  });

const cleanName = (raw) =>
  String(raw ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX);

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = corsHeaders(req.headers.get('Origin') || '');

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (url.pathname !== '/scores') return json({ error: 'not found' }, 404, cors);

    if (req.method === 'GET') {
      const game = url.searchParams.get('game');
      if (!GAMES[game]) return json({ error: 'unknown game' }, 400, cors);
      const list = JSON.parse((await env.SCORES.get(game)) || '[]');
      return json({ scores: list.slice(0, SHOW) }, 200, cors);
    }

    if (req.method === 'POST') {
      let body;
      try {
        body = await req.json();
      } catch {
        return json({ error: 'invalid json' }, 400, cors);
      }
      const game = body.game;
      const rules = GAMES[game];
      const name = cleanName(body.name);
      const score = Number(body.score);
      if (!rules) return json({ error: 'unknown game' }, 400, cors);
      if (!name) return json({ error: 'name required' }, 400, cors);
      if (!Number.isFinite(score) || score < rules.min || score > rules.max) {
        return json({ error: 'score out of range' }, 400, cors);
      }

      const list = JSON.parse((await env.SCORES.get(game)) || '[]');
      let entry = list.find((e) => e.name === name);
      if (rules.mode === 'tally') {
        if (!entry) { entry = { name, score: 0, at: 0 }; list.push(entry); }
        entry.score += 1;
        entry.at = Date.now();
      } else if (!entry) {
        list.push({ name, score, at: Date.now() });
      } else if (rules.mode === 'low' ? score < entry.score : score > entry.score) {
        entry.score = score;
        entry.at = Date.now();
      }
      list.sort((a, b) => (rules.mode === 'low' ? a.score - b.score : b.score - a.score));
      const trimmed = list.slice(0, KEEP);
      await env.SCORES.put(game, JSON.stringify(trimmed));
      return json({ scores: trimmed.slice(0, SHOW) }, 200, cors);
    }

    return json({ error: 'method not allowed' }, 405, cors);
  }
};
