const TIERS = [
  { name:'Starter', who:'For solo builders shipping their first product.', mo:0, hot:false, cta:'Start free', ghost:true,
    f:[['3 projects',1],['10K requests / month',1],['Community support',1],['Custom domains',0],['SSO & SCIM',0]] },
  { name:'Team', who:'For teams that need review, roles and real limits.', mo:24, hot:true, cta:'Start 14-day trial', ghost:false,
    f:[['Unlimited projects',1],['<b>2M</b> requests / month',1],['Priority support, 4h',1],['Custom domains',1],['SSO & SCIM',0]] },
  { name:'Scale', who:'For companies with compliance and volume needs.', mo:79, hot:false, cta:'Talk to sales', ghost:true,
    f:[['Everything in Team',1],['<b>25M</b> requests / month',1],['Dedicated engineer',1],['Custom domains',1],['SSO & SCIM',1]] }
];
const TICK = '<svg viewBox="0 0 24 24"><path d="m4 12.5 5 5L20 6.5"/></svg>';
const CROSS = '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>';

document.getElementById('tiers').innerHTML = TIERS.map((t, i) => `
  <article class="tier${t.hot ? ' hot' : ''}">
    ${t.hot ? '<span class="badge">MOST POPULAR</span>' : ''}
    <h2>${t.name}</h2>
    <p class="who">${t.who}</p>
    <div class="price"><span class="cur">$</span><span class="val" data-val="${i}">${t.mo}</span><span class="per">/mo</span></div>
    <p class="billed" data-billed="${i}">${t.mo ? 'Billed monthly' : 'Free forever'}</p>
    <button class="cta ${t.ghost ? 'ghost' : 'solid'}" type="button">${t.cta}</button>
    <ul>${t.f.map(([txt, on]) => `<li class="${on ? '' : 'off'}">${on ? TICK : CROSS}<span>${txt}</span></li>`).join('')}</ul>
  </article>`).join('');

/* ---------- the toggle, and the numbers that roll with it ---------- */
const mo = document.getElementById('mo'), yr = document.getElementById('yr'), pill = document.getElementById('pill');
let yearly = false, anim = [];

function movePill(){
  const btn = yearly ? yr : mo;
  pill.style.width = btn.offsetWidth + 'px';
  pill.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)';
}

function roll(node, from, to){
  const t0 = performance.now(), dur = 460;
  const ease = x => 1 - Math.pow(1 - x, 3);
  const step = now => {
    const t = Math.min(1, (now - t0) / dur);
    node.textContent = Math.round(from + (to - from) * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function setPeriod(next){
  if (next === yearly) return;
  yearly = next;
  mo.setAttribute('aria-pressed', !yearly);
  yr.setAttribute('aria-pressed', yearly);
  movePill();
  TIERS.forEach((t, i) => {
    const node = document.querySelector('[data-val="' + i + '"]');
    const to = yearly ? Math.round(t.mo * .8) : t.mo;
    roll(node, +node.textContent, to);
    document.querySelector('[data-billed="' + i + '"]').textContent =
      !t.mo ? 'Free forever'
      : yearly ? '$' + Math.round(t.mo * .8) * 12 + ' billed yearly'
      : 'Billed monthly';
  });
}
mo.addEventListener('click', () => setPeriod(false));
yr.addEventListener('click', () => setPeriod(true));
addEventListener('resize', movePill);
movePill();
