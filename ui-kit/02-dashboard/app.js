const $ = s => document.querySelector(s);
const S = ['var(--series-1)','var(--series-2)','var(--series-3)'];
const NS = 'http://www.w3.org/2000/svg';
const el = (n, a) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };

/* ---------- data ---------- */
const DAYS = ['Aug 7','Aug 8','Aug 9','Aug 10','Aug 11','Aug 12','Aug 13','Aug 14','Aug 15','Aug 16','Aug 17','Aug 18','Aug 19','Aug 20'];
const REQ  = [980,1042,1015,1130,1188,905,860,1210,1265,1240,1302,1348,1120,1284];
const WEEKS = ['Wk 30','Wk 31','Wk 32','Wk 33','Wk 34'];
const SERIES = [
  { name:'Web',    data:[3.1,3.4,3.2,3.9,4.2] },
  { name:'Mobile', data:[2.2,2.4,2.9,3.1,3.6] },
  { name:'API',    data:[1.4,1.6,1.5,1.9,2.1] }
];

/* ---------- line + area, one series ---------- */
(function lineChart(){
  const svg = $('#c1'), tip = $('#t1'), W = 660, H = 200, P = { l:40, r:10, t:14, b:26 };
  const max = 1450, min = 700;
  const x = i => P.l + i * (W - P.l - P.r) / (REQ.length - 1);
  const y = v => P.t + (1 - (v - min) / (max - min)) * (H - P.t - P.b);

  const defs = el('defs');
  const g = el('linearGradient', { id:'fade', x1:0, y1:0, x2:0, y2:1 });
  g.appendChild(el('stop', { offset:'0', 'stop-color':'#3987e5', 'stop-opacity':'.34' }));
  g.appendChild(el('stop', { offset:'1', 'stop-color':'#3987e5', 'stop-opacity':'0' }));
  defs.appendChild(g); svg.appendChild(defs);

  [700,950,1200,1450].forEach(v => {
    svg.appendChild(el('line', { class:'grid', x1:P.l, x2:W - P.r, y1:y(v), y2:y(v) }));
    const t = el('text', { class:'axis', x:P.l - 8, y:y(v) + 3.5, 'text-anchor':'end' });
    t.textContent = (v / 1000).toFixed(2).replace(/0$/,'') + 'M'; svg.appendChild(t);
  });
  [0, 4, 9, 13].forEach(i => {
    const t = el('text', { class:'axis', x:x(i), y:H - 8, 'text-anchor':i === 0 ? 'start' : i === 13 ? 'end' : 'middle' });
    t.textContent = DAYS[i]; svg.appendChild(t);
  });

  const pts = REQ.map((v, i) => x(i).toFixed(1) + ' ' + y(v).toFixed(1));
  svg.appendChild(el('path', { class:'area', d:'M' + pts.join(' L') + ' L' + x(13) + ' ' + y(min) + ' L' + x(0) + ' ' + y(min) + ' Z' }));
  svg.appendChild(el('path', { class:'line', d:'M' + pts.join(' L') }));

  const cross = el('line', { class:'cross', y1:P.t, y2:H - P.b }); svg.appendChild(cross);
  const knob = el('circle', { class:'knob', r:5 }); svg.appendChild(knob);

  svg.addEventListener('pointermove', e => {
    const r = svg.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width * W;
    let i = Math.round((px - P.l) / ((W - P.l - P.r) / 13));
    i = Math.max(0, Math.min(13, i));
    cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.style.opacity = 1;
    knob.setAttribute('cx', x(i)); knob.setAttribute('cy', y(REQ[i])); knob.style.opacity = 1;
    tip.innerHTML = '<b>' + DAYS[i] + '</b><u><i style="background:var(--series-1)"></i>' +
      (REQ[i] / 1000).toFixed(3) + 'M requests</u>';
    tip.style.left = (x(i) / W * 100) + '%';
    tip.style.top = (y(REQ[i]) / H * 100) + '%';
    tip.style.opacity = 1;
  });
  svg.addEventListener('pointerleave', () => { tip.style.opacity = 0; cross.style.opacity = 0; knob.style.opacity = 0; });
})();

/* ---------- grouped bars, three series ---------- */
(function barChart(){
  const svg = $('#c2'), tip = $('#t2'), W = 660, H = 200, P = { l:34, r:10, t:14, b:26 };
  const max = 5;
  const y = v => P.t + (1 - v / max) * (H - P.t - P.b);
  const base = y(0);
  const bandW = (W - P.l - P.r) / WEEKS.length;
  const GAP = 2;                                   // 2px surface gap between adjacent bars
  const barW = (bandW * .66 - GAP * 2) / 3;

  [0,1,2,3,4,5].forEach(v => {
    svg.appendChild(el('line', { class:'grid', x1:P.l, x2:W - P.r, y1:y(v), y2:y(v) }));
    const t = el('text', { class:'axis', x:P.l - 8, y:y(v) + 3.5, 'text-anchor':'end' });
    t.textContent = v; svg.appendChild(t);
  });

  /* 4px rounded data-end, square where it meets the baseline */
  const cap = (bx, by, w, h, r) => {
    r = Math.min(r, h, w / 2);
    return `M${bx} ${by + h} L${bx} ${by + r} Q${bx} ${by} ${bx + r} ${by}` +
           ` L${bx + w - r} ${by} Q${bx + w} ${by} ${bx + w} ${by + r} L${bx + w} ${by + h} Z`;
  };

  WEEKS.forEach((wk, gi) => {
    const gx = P.l + gi * bandW + bandW * .17;
    SERIES.forEach((s, si) => {
      const bx = gx + si * (barW + GAP), v = s.data[gi];
      const p = el('path', { d:cap(bx, y(v), barW, base - y(v), 4), fill:S[si] });
      p.style.cursor = 'crosshair';
      p.addEventListener('pointerenter', () => {
        tip.innerHTML = '<b>' + wk + ' &middot; ' + s.name + '</b><u><i style="background:' + S[si] + '"></i>' + v.toFixed(1) + 'M requests</u>';
        tip.style.left = ((bx + barW / 2) / W * 100) + '%';
        tip.style.top = (y(v) / H * 100) + '%';
        tip.style.opacity = 1;
      });
      p.addEventListener('pointerleave', () => tip.style.opacity = 0);
      svg.appendChild(p);
    });
    const t = el('text', { class:'axis', x:P.l + gi * bandW + bandW / 2, y:H - 8, 'text-anchor':'middle' });
    t.textContent = wk; svg.appendChild(t);
  });

  $('#lg').innerHTML = SERIES.map((s, i) =>
    '<span><i style="background:' + S[i] + '"></i>' + s.name + '</span>').join('');
})();

/* ---------- the same numbers, readable without colour ---------- */
$('#tableView').innerHTML =
  '<div class="panel"><div class="panel_hd"><h2>Requests per day</h2></div><table><thead><tr><th>Day</th><th>Requests</th></tr></thead><tbody>' +
  DAYS.map((d, i) => '<tr><td>' + d + '</td><td>' + REQ[i].toLocaleString() + 'K</td></tr>').join('') +
  '</tbody></table></div>' +
  '<div class="panel"><div class="panel_hd"><h2>Requests by surface</h2></div><table><thead><tr><th>Week</th>' +
  SERIES.map(s => '<th>' + s.name + '</th>').join('') + '</tr></thead><tbody>' +
  WEEKS.map((w, i) => '<tr><td>' + w + '</td>' + SERIES.map(s => '<td>' + s.data[i].toFixed(1) + 'M</td>').join('') + '</tr>').join('') +
  '</tbody></table></div>';

const panels = document.querySelectorAll('.dash > .panel');
function view(isChart){
  panels.forEach(p => p.hidden = !isChart);
  $('#tableView').hidden = isChart;
  $('#vChart').setAttribute('aria-pressed', isChart);
  $('#vTable').setAttribute('aria-pressed', !isChart);
}
$('#vChart').addEventListener('click', () => view(true));
$('#vTable').addEventListener('click', () => view(false));
