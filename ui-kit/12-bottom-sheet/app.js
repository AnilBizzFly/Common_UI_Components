const phone = document.getElementById('phone'), sheet = document.getElementById('sheet'),
      grab = document.getElementById('grab'), scrim = document.getElementById('scrim');
const STOPS = [0.82, 0.46, 0.04];        // fraction of sheet height hidden below: peek / half / full
let snap = 1, y = 0, drag = null;

const H = () => sheet.offsetHeight;
const settle = i => {
  snap = i;
  y = STOPS[i] * H();
  sheet.style.transition = 'transform .42s cubic-bezier(.25,1.12,.4,1)';
  paint();
  document.querySelectorAll('[data-s]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.s === i));
};
function paint(){
  sheet.style.transform = 'translateY(' + y + 'px)';
  const openness = 1 - y / H();                        // 0 hidden … 1 fully up
  scrim.classList.toggle('on', openness > 0.35);
  scrim.style.opacity = Math.max(0, Math.min(1, (openness - 0.2) / 0.6));
}

grab.addEventListener('pointerdown', e => {
  drag = { y0:e.clientY, start:y, t0:performance.now(), last:e.clientY, v:0 };
  grab.setPointerCapture(e.pointerId);
  sheet.style.transition = 'none';
});
addEventListener('pointermove', e => {
  if (!drag) return;
  const now = performance.now();
  drag.v = (e.clientY - drag.last) / Math.max(1, now - drag.t0) * 16;   // px per frame
  drag.last = e.clientY; drag.t0 = now;
  y = Math.max(STOPS[2] * H(), Math.min(STOPS[0] * H() + 40, drag.start + (e.clientY - drag.y0)));
  paint();
});
addEventListener('pointerup', () => {
  if (!drag) return;
  /* a flick beats proximity: a fast throw skips to the end stop in that
     direction; a slow release just settles on whichever stop is nearest */
  const nearest = () => STOPS
    .map((s, n) => [Math.abs(s * H() - y), n])
    .sort((a, b) => a[0] - b[0])[0][1];
  const i = Math.abs(drag.v) > 6 ? (drag.v > 0 ? 0 : 2) : nearest();
  drag = null;
  settle(i);
});

document.querySelectorAll('[data-s]').forEach(b =>
  b.addEventListener('click', () => settle(+b.dataset.s)));
scrim.addEventListener('click', () => settle(0));
addEventListener('resize', () => settle(snap));

requestAnimationFrame(() => settle(1));
