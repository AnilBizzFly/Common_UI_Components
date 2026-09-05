const feed = document.getElementById('feed'), ta = document.getElementById('ta'),
      send = document.getElementById('send'), chips = document.getElementById('chips');
let streaming = null;

const REPLIES = [
  "Deploys are healthy. 27 shipped last week across 4 services, with 2 rollbacks — both on `checkout-api`, both triggered by the same failing migration.\n\nThe pattern worth watching: every rollback happened inside the Friday freeze window. Worth moving that job to Tuesday.",
  "p95 moved from 180ms to 340ms on Wednesday 14:20, and it tracks exactly with the `search-index` rebuild.\n\nThe rebuild holds a read lock for about 40 seconds per shard, and with 6 shards running serially you get a ~4 minute window where queries queue. Parallelising the shards should flatten it.",
  "Here's a draft:\n\n**v2.4.0** — Faster search, calmer alerts.\n\n• Search index rebuilds now run in parallel, cutting p95 during reindex by roughly 60%\n• Alert rules support inhibition windows\n• Fixed a rollback loop in `checkout-api` migrations\n\nWant it longer, or is that the right length?"
];
let turn = 0;

function bubble(who, text){
  const m = document.createElement('div');
  m.className = 'msg ' + who;
  m.innerHTML = '<span class="av">' + (who === 'me' ? 'You' : 'A') + '</span>' +
                '<div><div class="bub"></div></div>';
  m.querySelector('.bub').textContent = text;
  feed.appendChild(m);
  feed.scrollTop = feed.scrollHeight;
  return m.querySelector('.bub');
}
const fmt = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');

/* token-by-token, the way a real stream arrives */
function stream(bub, text, done){
  const words = text.split(/(\s+)/);
  let i = 0;
  bub.innerHTML = '<span class="caret"></span>';
  const tick = () => {
    if (streaming === null) return;
    i += 1 + Math.floor(Math.random() * 2);
    const part = words.slice(0, i).join('');
    bub.innerHTML = fmt(part) + (i < words.length ? '<span class="caret"></span>' : '');
    feed.scrollTop = feed.scrollHeight;
    if (i < words.length) streaming = setTimeout(tick, 22 + Math.random() * 46);
    else done();
  };
  streaming = setTimeout(tick, 260);
}

function ask(text){
  if (streaming) return;
  bubble('me', text);
  ta.value = ''; sizeTa(); gate();
  chips.style.display = 'none';

  const wrap = document.createElement('div');
  wrap.className = 'msg ai';
  wrap.innerHTML = '<span class="av">A</span><div><div class="bub"></div>' +
    '<div class="tools"><button type="button" data-copy>copy</button>' +
    '<button type="button" data-again>regenerate</button></div></div>';
  feed.appendChild(wrap);
  const bub = wrap.querySelector('.bub');
  const body = REPLIES[turn % REPLIES.length]; turn++;

  send.classList.add('stop');
  send.innerHTML = '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" stroke="none"/></svg>';
  send.disabled = false;

  stream(bub, body, () => {
    streaming = null;
    send.classList.remove('stop');
    send.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
    gate();
  });

  wrap.querySelector('[data-copy]').addEventListener('click', e => {
    navigator.clipboard && navigator.clipboard.writeText(bub.textContent);
    e.target.textContent = 'copied'; setTimeout(() => e.target.textContent = 'copy', 1400);
  });
  wrap.querySelector('[data-again]').addEventListener('click', () => {
    if (streaming) return;
    stream(bub, REPLIES[(turn++) % REPLIES.length], () => streaming = null);
  });
}

function sizeTa(){ ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 130) + 'px'; }
function gate(){ if (!streaming) send.disabled = !ta.value.trim(); }

ta.addEventListener('input', () => { sizeTa(); gate(); });
ta.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); if (ta.value.trim() && !streaming) ask(ta.value.trim()); }
});
send.addEventListener('click', () => {
  if (streaming){ clearTimeout(streaming); streaming = null;
    send.classList.remove('stop');
    send.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
    document.querySelectorAll('.caret').forEach(c => c.remove()); gate(); return; }
  if (ta.value.trim()) ask(ta.value.trim());
});
chips.addEventListener('click', e => { if (e.target.classList.contains('chip')) ask(e.target.textContent); });

bubble('ai', 'Hi — I can read your deploys, metrics and issues. Ask me anything, or pick a starting point below.');
