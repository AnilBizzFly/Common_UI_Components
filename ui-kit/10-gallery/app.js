/* every tile is generated — no assets, no network */
const ART = [
  { t:'Dune ridge, 04:40',   m:'Nevada',   h:1.30, c:['#ff9d4d','#e0455f','#3b2a66'] },
  { t:'Cold harbour',        m:'Bergen',   h:0.78, c:['#7cc4ff','#3f6bd6','#101a33'] },
  { t:'Salt flat, noon',     m:'Uyuni',    h:1.00, c:['#f3f0e4','#9fc6d8','#4a6f88'] },
  { t:'Understorey',         m:'Kerala',   h:1.24, c:['#a9e08a','#2f9b6a','#0e3b34'] },
  { t:'Signal fire',         m:'Reykjavík',h:0.72, c:['#ffd27a','#ff7a59','#3a1d4a'] },
  { t:'Terrace, late light',  m:'Lisbon',   h:1.14, c:['#ffc3a0','#d98074','#4a2b47'] },
  { t:'Pack ice',            m:'Svalbard', h:0.86, c:['#dff3ff','#7fb6d9','#274a68'] },
  { t:'Night market',        m:'Taipei',   h:1.32, c:['#ff8ac4','#a55cff','#1b1436'] },
  { t:'Lava field',          m:'Hawai‘i',  h:0.9,  c:['#ffb057','#c9422e','#241018'] }
];
const svg = (a, w, h, seed) => {
  const [c1, c2, c3] = a.c;
  return `<svg class="art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g${seed}" x1="0" y1="0" x2=".7" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g${seed})"/>
    <circle cx="${w * .72}" cy="${h * .26}" r="${h * .17}" fill="#fff" opacity=".22"/>
    <path d="M0 ${h * .74} Q ${w * .27} ${h * .58} ${w * .5} ${h * .7} T ${w} ${h * .64} L${w} ${h} L0 ${h} Z" fill="#000" opacity=".26"/>
    <path d="M0 ${h * .87} Q ${w * .33} ${h * .77} ${w * .62} ${h * .86} T ${w} ${h * .82} L${w} ${h} L0 ${h} Z" fill="#000" opacity=".34"/>
  </svg>`;
};

const grid = document.getElementById('grid');
grid.innerHTML = ART.map((a, i) =>
  `<figure class="cell" tabindex="0" role="button" data-i="${i}" aria-label="Open ${a.t}">
     ${svg(a, 400, Math.round(400 * a.h), i)}
     <figcaption><b>${a.t}</b><span>${a.m}</span></figcaption>
   </figure>`).join('');

const lb = document.getElementById('lb'), lbArt = document.getElementById('lbArt');
let at = 0;

function open(i){
  at = (i + ART.length) % ART.length;
  const a = ART[at];
  lbArt.innerHTML = svg(a, 1200, Math.round(1200 * a.h * .62), 'L' + at);
  lbArt.firstElementChild.setAttribute('style', 'display:block;width:100%;height:auto;border-radius:18px');
  document.getElementById('lbT').textContent = a.t;
  document.getElementById('lbM').textContent = a.m;
  document.getElementById('count').textContent = (at + 1) + ' / ' + ART.length;
  lb.classList.add('on');
  document.getElementById('x').focus();
}
const close = () => lb.classList.remove('on');

grid.addEventListener('click', e => { const c = e.target.closest('.cell'); if (c) open(+c.dataset.i); });
grid.addEventListener('keydown', e => {
  const c = e.target.closest('.cell');
  if (c && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); open(+c.dataset.i); }
});
document.getElementById('x').addEventListener('click', close);
document.getElementById('prev').addEventListener('click', () => open(at - 1));
document.getElementById('next').addEventListener('click', () => open(at + 1));
lb.addEventListener('pointerdown', e => { if (e.target === lb) close(); });
addEventListener('keydown', e => {
  if (!lb.classList.contains('on')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') open(at + 1);
  if (e.key === 'ArrowLeft') open(at - 1);
});
