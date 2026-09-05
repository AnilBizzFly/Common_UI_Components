const I = {
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/>',
  user:'<circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
  cog:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6Z"/>',
  moon:'<path d="M21 13.2A9 9 0 1 1 10.8 3a7 7 0 0 0 10.2 10.2Z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  git:'<circle cx="7" cy="6" r="2.4"/><circle cx="7" cy="18" r="2.4"/><circle cx="17" cy="12" r="2.4"/><path d="M7 8.4v7.2M9.4 6h3a2 2 0 0 1 2 2v2"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'
};
const DATA = [
  { g:'Actions',   t:'New project',        s:'Create a workspace',      k:'⌘ N', i:'plus' },
  { g:'Actions',   t:'Invite teammate',    s:'Send an email invite',    k:'⌘ I', i:'mail' },
  { g:'Actions',   t:'Deploy to production', s:'Runs the release pipeline', k:'⌘ ⇧ D', i:'bolt' },
  { g:'Navigate',  t:'Open settings',      s:'Workspace preferences',   k:'⌘ ,', i:'cog' },
  { g:'Navigate',  t:'Pull requests',      s:'12 open',                 k:'G P', i:'git' },
  { g:'Navigate',  t:'Documentation',      s:'Guides and API reference', k:'G D', i:'doc' },
  { g:'People',    t:'Priya Raman',        s:'Design lead',             k:'',    i:'user' },
  { g:'People',    t:'Marcus Webb',        s:'Platform engineering',    k:'',    i:'user' },
  { g:'People',    t:'Sofia Alvarez',      s:'Product manager',         k:'',    i:'user' },
  { g:'Preferences', t:'Toggle dark mode', s:'Currently dark',          k:'⌘ ⇧ L', i:'moon' }
];

const scrim = document.getElementById('scrim'), q = document.getElementById('q'), list = document.getElementById('list');
let rows = [], sel = 0;

/* subsequence match, so "dpr" finds "Deploy to production" */
function score(item, term){
  if (!term) return { ok:true, marks:null };
  const hay = item.t.toLowerCase(), t = term.toLowerCase();
  const at = hay.indexOf(t);
  if (at > -1) return { ok:true, marks:[[at, at + t.length]] };
  let i = 0, out = [];
  for (let n = 0; n < hay.length && i < t.length; n++){
    if (hay[n] === t[i]){ out.push([n, n + 1]); i++; }
  }
  return i === t.length ? { ok:true, marks:out } : { ok:false };
}
const hl = (s, marks) => {
  if (!marks) return s;
  let out = '', at = 0;
  for (const [a, b] of marks){ out += s.slice(at, a) + '<mark>' + s.slice(a, b) + '</mark>'; at = b; }
  return out + s.slice(at);
};

function render(){
  const term = q.value.trim();
  const hits = DATA.map(d => ({ d, m: score(d, term) })).filter(x => x.m.ok);
  list.innerHTML = '';
  rows = [];
  if (!hits.length){
    list.innerHTML = '<div class="empty"><b>No matches</b>Try “deploy”, “settings” or a name</div>';
    return;
  }
  let group = '';
  hits.forEach(({ d, m }) => {
    if (d.g !== group){ group = d.g; list.insertAdjacentHTML('beforeend', '<div class="grp">' + group + '</div>'); }
    const el = document.createElement('div');
    el.className = 'row'; el.role = 'option';
    el.innerHTML = '<span class="row_ico"><svg viewBox="0 0 24 24">' + I[d.i] + '</svg></span>' +
      '<span class="row_t"><b>' + hl(d.t, m.marks) + '</b><span>' + d.s + '</span></span>' +
      (d.k ? '<span class="row_k">' + d.k + '</span>' : '');
    el.addEventListener('click', () => run(d));
    el.addEventListener('pointermove', () => { sel = rows.indexOf(el); mark(); });
    list.appendChild(el); rows.push(el);
  });
  sel = 0; mark();
}
function mark(){
  rows.forEach((r, i) => r.setAttribute('aria-selected', i === sel));
  rows[sel] && rows[sel].scrollIntoView({ block:'nearest' });
}
function run(d){ close(); setTimeout(() => alert('Ran: ' + d.t), 120); }

function open(){ scrim.classList.add('on'); q.value = ''; render(); setTimeout(() => q.focus(), 40); }
function close(){ scrim.classList.remove('on'); }

document.getElementById('openBtn').addEventListener('click', open);
scrim.addEventListener('pointerdown', e => { if (e.target === scrim) close(); });
q.addEventListener('input', render);

addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); scrim.classList.contains('on') ? close() : open(); return; }
  if (!scrim.classList.contains('on')) return;
  if (e.key === 'Escape'){ close(); }
  else if (e.key === 'ArrowDown'){ e.preventDefault(); if (rows.length){ sel = (sel + 1) % rows.length; mark(); } }
  else if (e.key === 'ArrowUp'){ e.preventDefault(); if (rows.length){ sel = (sel - 1 + rows.length) % rows.length; mark(); } }
  else if (e.key === 'Enter' && rows[sel]){ e.preventDefault(); rows[sel].click(); }
});
render();
