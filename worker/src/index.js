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
  'https://chats.bytescribble.com',
  'http://localhost:4321',
  'http://localhost:4325',
  'http://localhost:4330'
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

/* ============================================================
   /chat — grounded answers for chats.bytescribble.com (Bolo).

   Retrieval happens in the browser; this endpoint only turns the passages
   the client already found into a natural reply. The prompt forbids using
   anything outside those passages, so the model can summarise but not
   invent — and if the notes don't cover it, it says so.
   ============================================================ */

// Llama 3.3 70B (fp8, fast variant) — strong multilingual quality, which
// matters for the Hindi and Hinglish replies. Check `wrangler ai models`
// before changing: Workers AI retires models periodically.
const CHAT_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const MAX_QUESTION = 500;
const MAX_PASSAGES = 5;
const MAX_PASSAGE_CHARS = 1100;

const LANG_RULE = {
  en: 'Answer in clear English.',
  hi: 'उत्तर सरल हिन्दी में दें (देवनागरी लिपि में)। तकनीकी शब्द अंग्रेज़ी में रख सकते हैं।',
  hinglish:
    'Answer in Hinglish — conversational Hindi written in Latin script, mixing English technical terms naturally. Do not use Devanagari.'
};

async function chat(req, env, cors) {
  if (!env.AI) {
    return json({ error: 'ai binding missing' }, 503, cors);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid json' }, 400, cors);
  }

  const question = String(body.question || '').slice(0, MAX_QUESTION).trim();
  const lang = LANG_RULE[body.lang] ? body.lang : 'en';
  const passages = Array.isArray(body.passages) ? body.passages.slice(0, MAX_PASSAGES) : [];

  if (!question) return json({ error: 'question required' }, 400, cors);
  if (!passages.length) return json({ error: 'passages required' }, 400, cors);

  const context = passages
    .map((p, i) => {
      const doc = String(p.doc || '').slice(0, 120);
      const section = String(p.section || '').slice(0, 120);
      const text = String(p.text || '').slice(0, MAX_PASSAGE_CHARS);
      return `[${i + 1}] ${doc} — ${section}\n${text}`;
    })
    .join('\n\n');

  const system = [
    'You are Bolo, a study companion for ByteScribble Notes.',
    'Answer ONLY from the numbered notes provided. Never add facts, numbers, section references or examples that are not in them.',
    "If the notes do not contain the answer, say so plainly and suggest what the student could ask instead. Do not guess.",
    'Be concise: 2-4 short sentences, or a short list when the notes are a list. This will be read aloud, so avoid markdown, symbols and headings.',
    'Preserve every number, section reference and technical term exactly as written in the notes.',
    LANG_RULE[lang]
  ].join(' ');

  try {
    const res = await env.AI.run(CHAT_MODEL, {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: `Notes:\n\n${context}\n\nQuestion: ${question}` }
      ],
      max_tokens: 380,
      temperature: 0.2
    });

    const answer = (res?.response || '').trim();
    if (!answer) return json({ error: 'empty answer' }, 502, cors);
    return json({ answer, model: CHAT_MODEL }, 200, cors);
  } catch (err) {
    // The client falls back to its own extract, so a failure here is not fatal.
    return json({ error: 'generation failed', detail: String(err?.message || err).slice(0, 300) }, 502, cors);
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = corsHeaders(req.headers.get('Origin') || '');

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    if (url.pathname === '/chat') {
      if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405, cors);
      return chat(req, env, cors);
    }

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
