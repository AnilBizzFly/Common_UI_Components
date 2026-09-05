const COLS = [
  { id:'todo', name:'To do',       tint:'#7cc4ff' },
  { id:'doing', name:'In progress', tint:'#ffb057' },
  { id:'done', name:'Done',        tint:'#5fe0ac' }
];
const AV = { PR:'#7cc4ff', MW:'#a98bff', SA:'#5fe0ac', JK:'#ffb057' };
let TASKS = [
  { id:'ATL-412', col:'todo',  pri:'hi', t:'Parallelise search index rebuild across shards', who:'MW', tags:['perf'] },
  { id:'ATL-418', col:'todo',  pri:'md', t:'Add inhibition windows to alert rules',          who:'SA', tags:['alerts'] },
  { id:'ATL-401', col:'todo',  pri:'lo', t:'Document the webhook retry policy',              who:'PR', tags:['docs'] },
  { id:'ATL-397', col:'doing', pri:'hi', t:'Fix rollback loop in checkout-api migrations',   who:'JK', tags:['bug','api'] },
  { id:'ATL-405', col:'doing', pri:'md', t:'Roving tabindex on the settings sidebar',        who:'PR', tags:['a11y'] },
  { id:'ATL-388', col:'done',  pri:'md', t:'Ship dark mode to all marketing pages',          who:'PR', tags:['ui'] },
  { id:'ATL-390', col:'done',  pri:'lo', t:'Bump Node to 22 in CI',                          who:'MW', tags:['ci'] }
];

const cols = document.getElementById('cols');
function render(){
  cols.innerHTML = COLS.map(c => {
    const mine = TASKS.filter(t => t.col === c.id);
    return `<section class="col" data-col="${c.id}">
      <div class="col_hd"><i style="background:${c.tint};box-shadow:0 0 8px ${c.tint}"></i>
        <b>${c.name}</b><span>${mine.length}</span></div>
      <div class="stack" data-stack="${c.id}">
        ${mine.map(card).join('')}
        <div class="slot"></div>
      </div>
    </section>`;
  }).join('');
}
const card = t => `<article class="tk" data-id="${t.id}">
  <div class="tk_top"><span class="pri p-${t.pri}">${t.pri.toUpperCase()}</span><span class="id">${t.id}</span></div>
  <h3>${t.t}</h3>
  <div class="tk_ft"><span class="who" style="background:${AV[t.who]}">${t.who}</span>
    <span class="tags">${t.tags.map(x => '<span class="tag">' + x + '</span>').join('')}</span></div>
</article>`;

/* ---------- pointer drag: works with mouse, pen and finger ---------- */
let drag = null;
cols.addEventListener('pointerdown', e => {
  const tk = e.target.closest('.tk');
  if (!tk || drag) return;
  const r = tk.getBoundingClientRect();
  drag = { id:tk.dataset.id, el:tk, dx:e.clientX - r.left, dy:e.clientY - r.top, w:r.width, fly:null, started:false, x:e.clientX, y:e.clientY };
  tk.setPointerCapture(e.pointerId);
});
addEventListener('pointermove', e => {
  if (!drag) return;
  if (!drag.started){
    if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 5) return;   // let a click stay a click
    drag.started = true;
    const fly = drag.el.cloneNode(true);
    fly.classList.add('flying');
    fly.style.setProperty('--w', drag.w + 'px');
    document.body.appendChild(fly);
    drag.fly = fly;
    drag.el.classList.add('ghosting');
  }
  drag.fly.style.left = (e.clientX - drag.dx) + 'px';
  drag.fly.style.top  = (e.clientY - drag.dy) + 'px';

  document.querySelectorAll('.col').forEach(c => c.classList.remove('over'));
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('on'));
  const col = document.elementFromPoint(e.clientX, e.clientY)?.closest('.col');
  if (col){
    col.classList.add('over');
    col.querySelector('.slot').classList.add('on');
    drag.target = col.dataset.col;
  } else drag.target = null;
});
addEventListener('pointerup', () => {
  if (!drag) return;
  if (drag.started){
    drag.fly.remove();
    if (drag.target){
      const t = TASKS.find(x => x.id === drag.id);
      TASKS = TASKS.filter(x => x.id !== drag.id);
      t.col = drag.target;
      TASKS.push(t);
    }
    render();
  }
  drag = null;
});
addEventListener('pointercancel', () => { if (drag?.fly) drag.fly.remove(); drag = null; render(); });

render();
