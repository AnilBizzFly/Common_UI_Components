const MN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const TODAY = new Date(2026, 7, 20);                       // fixed so the demo is reproducible
const key = d => d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
const addD = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const fmt = d => d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });

let cursor = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1);
let from = addD(TODAY, -29), to = new Date(TODAY), hover = null, picking = false;

function month(base, off){
  const d = new Date(base.getFullYear(), base.getMonth() + off, 1);
  const first = (d.getDay() + 6) % 7;                       // Monday-first
  const len = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  let cells = '';
  for (let i = 0; i < first; i++) cells += '<button disabled></button>';
  for (let n = 1; n <= len; n++){
    const cur = new Date(d.getFullYear(), d.getMonth(), n), k = key(cur);
    const end = picking && hover ? (key(hover) > key(from) ? hover : from) : to;
    const start = picking && hover ? (key(hover) > key(from) ? from : hover) : from;
    const isEnd = (start && k === key(start)) || (end && k === key(end));
    const inRange = start && end && k >= key(start) && k <= key(end);
    const cls = [
      inRange ? (picking ? 'pv in' : 'in') : '',
      isEnd ? 'end' : '',
      start && k === key(start) ? 's1' : '',
      end && k === key(end) ? 's2' : '',
      k === key(TODAY) ? 'today' : ''
    ].filter(Boolean).join(' ');
    cells += `<button class="${cls}" data-d="${cur.toISOString().slice(0,10)}">${n}</button>`;
  }
  return `<div class="m"><h3>${MN[d.getMonth()]} ${d.getFullYear()}</h3>
    <div class="dow"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
    <div class="days">${cells}</div></div>`;
}

function render(){
  document.getElementById('months').innerHTML = month(cursor, 0) + month(cursor, 1);
  const a = new Date(cursor), b = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  document.getElementById('span').textContent = MN[a.getMonth()].slice(0,3) + ' – ' + MN[b.getMonth()].slice(0,3) + ' ' + b.getFullYear();
  const days = from && to ? Math.round((to - from) / 864e5) + 1 : 0;
  document.getElementById('out').innerHTML = from && to
    ? `<b>${fmt(from)} → ${fmt(to)}</b><span>${days} days</span>`
    : `<b>Pick a start date</b><span>then an end date</span>`;
}

document.getElementById('months').addEventListener('click', e => {
  const b = e.target.closest('button[data-d]'); if (!b) return;
  const d = new Date(b.dataset.d + 'T00:00:00');
  if (!picking){ from = d; to = null; picking = true; hover = null; }
  else {
    if (key(d) < key(from)){ to = from; from = d; } else to = d;
    picking = false;
  }
  document.querySelectorAll('[data-p]').forEach(p => p.setAttribute('aria-pressed','false'));
  render();
});
document.getElementById('months').addEventListener('pointermove', e => {
  if (!picking) return;
  const b = e.target.closest('button[data-d]'); if (!b) return;
  const d = new Date(b.dataset.d + 'T00:00:00');
  if (!hover || key(hover) !== key(d)){ hover = d; render(); }
});

document.getElementById('presets').addEventListener('click', e => {
  const b = e.target.closest('button[data-p]'); if (!b) return;
  document.querySelectorAll('[data-p]').forEach(p => p.setAttribute('aria-pressed', p === b));
  const p = b.dataset.p;
  picking = false; hover = null; to = new Date(TODAY);
  if (p === 'tm'){ from = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1); }
  else if (p === 'lm'){ from = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1);
                        to = new Date(TODAY.getFullYear(), TODAY.getMonth(), 0); }
  else if (p === 'ytd'){ from = new Date(TODAY.getFullYear(), 0, 1); }
  else from = addD(TODAY, -(+p - 1));
  cursor = new Date(from.getFullYear(), from.getMonth(), 1);
  if (key(to) > key(new Date(cursor.getFullYear(), cursor.getMonth() + 2, 0)))
    cursor = new Date(to.getFullYear(), to.getMonth() - 1, 1);
  render();
});

document.getElementById('back').addEventListener('click', () => { cursor.setMonth(cursor.getMonth() - 1); render(); });
document.getElementById('fwd').addEventListener('click', () => { cursor.setMonth(cursor.getMonth() + 1); render(); });
document.getElementById('clear').addEventListener('click', () => { from = to = hover = null; picking = false; render(); });
document.getElementById('apply').addEventListener('click', () =>
  alert(from && to ? 'Applied ' + fmt(from) + ' → ' + fmt(to) : 'Pick a range first'));

render();
