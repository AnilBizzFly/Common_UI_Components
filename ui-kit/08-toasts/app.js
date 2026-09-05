const KIND = {
  success:{ tint:'var(--ok)',   ttl:4200, ico:'<path d="m4 12.5 5 5L20 6.5"/>',
    t:'Deployed to production', s:'checkout-api · 2m 14s · build #4821', act:'View logs' },
  error:{ tint:'var(--bad)',    ttl:7000, ico:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/>',
    t:'Deployment failed', s:'Migration 0042 could not acquire a lock.', act:'Retry' },
  warning:{ tint:'var(--warn)', ttl:5600, ico:'<path d="M12 3 2.5 20h19Z"/><path d="M12 10v4M12 17v.01"/>',
    t:'Approaching your quota', s:'92% of 2M monthly requests used with 9 days left.', act:'Upgrade' },
  info:{ tint:'var(--a)',       ttl:4600, ico:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.01"/>',
    t:'New version available', s:'v2.4.0 adds parallel index rebuilds.', act:'Read notes' }
};
const MAX = 4;
const toaster = document.getElementById('toaster');

function toast(kind){
  const k = KIND[kind];
  while (toaster.children.length >= MAX) kill(toaster.firstElementChild);

  const el = document.createElement('div');
  el.className = 'toast'; el.role = 'status';
  el.style.setProperty('--tint', k.tint);
  el.style.setProperty('--ttl', k.ttl + 'ms');
  el.innerHTML =
    `<span class="ico"><svg viewBox="0 0 24 24">${k.ico}</svg></span>
     <div class="body"><b>${k.t}</b><span>${k.s}</span>
       <button class="act" type="button">${k.act}</button></div>
     <button class="x" type="button" aria-label="Dismiss"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
     <span class="life"></span>`;
  toaster.appendChild(el);

  const life = el.querySelector('.life');
  life.addEventListener('animationend', () => kill(el));
  el.querySelector('.x').addEventListener('click', () => kill(el));
  el.querySelector('.act').addEventListener('click', () => kill(el));

  /* drag right to throw it away */
  let sx = 0, held = false;
  el.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    held = true; sx = e.clientX;
    el.setPointerCapture(e.pointerId);
    el.classList.add('held');
    el.style.transition = 'none';
  });
  el.addEventListener('pointermove', e => {
    if (!held) return;
    const dx = Math.max(0, e.clientX - sx);
    el.style.transform = `translateX(${dx}px)`;
    el.style.opacity = String(Math.max(0, 1 - dx / 190));
  });
  const release = e => {
    if (!held) return;
    held = false; el.classList.remove('held');
    const dx = Math.max(0, e.clientX - sx);
    el.style.transition = 'transform .24s cubic-bezier(.3,1,.4,1),opacity .24s';
    if (dx > 90){ el.style.transform = 'translateX(120%)'; el.style.opacity = '0'; setTimeout(() => el.remove(), 220); }
    else { el.style.transform = ''; el.style.opacity = ''; }
  };
  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', release);
}

function kill(el){
  if (!el || el.classList.contains('out')) return;
  el.classList.add('out');
  el.addEventListener('animationend', () => el.remove(), { once:true });
}

document.querySelectorAll('.trig').forEach(b =>
  b.addEventListener('click', () => toast(b.dataset.t)));
setTimeout(() => toast('info'), 500);
