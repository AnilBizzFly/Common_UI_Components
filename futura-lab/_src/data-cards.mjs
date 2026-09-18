const CARD = `
.card{position:relative;width:min(320px,100%);border-radius:22px;overflow:hidden;
  background:linear-gradient(165deg,rgba(255,255,255,.075),rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.1);
  box-shadow:0 26px 60px -28px #000,0 1px 0 0 rgba(255,255,255,.12) inset}
.pad{padding:18px}
.card h3{margin:0;font-size:17px;font-weight:650;letter-spacing:-.03em}
.card .sub{margin:5px 0 0;font-size:12.5px;color:rgba(233,237,255,.46);line-height:1.5}
.k{font:600 8.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(233,237,255,.38)}
`;

export const cards = [
{
slug:'tilt-glare', title:'Parallax Tilt', c:'#8ee7ff',
desc:'The card rotates toward your pointer while a glare sweeps the surface and the text floats 38px forward in Z.',
note:'<b>preserve-3d</b> plus a translateZ on the copy &mdash; that is what sells the depth.',
css:CARD+`
.demo{perspective:1100px}
.tilt{transform-style:preserve-3d;transition:transform .45s cubic-bezier(.2,1,.3,1)}
.tilt .art{height:132px;background:conic-gradient(from 210deg at 30% 20%,#1b1440,#3b1f6e,#0f4a76,#5d1d63,#1b1440)}
.tilt .glare{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;
  background:radial-gradient(260px 260px at var(--mx,50%) var(--my,50%),rgba(255,255,255,.42),transparent 60%)}
.tilt:hover .glare{opacity:1}
.tilt .lift{transform:translateZ(38px)}
`,
html:`<div class="card tilt" id="c">
  <div class="art"></div><div class="glare"></div>
  <div class="pad lift">
    <span class="k">holo layer</span>
    <h3 style="margin-top:7px">Parallax Tilt</h3>
    <p class="sub">Move your pointer across the surface. The art stays back, the text comes forward.</p>
  </div>
</div>`,
js:`
const c=$('c');
c.addEventListener('pointermove',e=>{
  const b=c.getBoundingClientRect();
  const px=(e.clientX-b.left)/b.width, py=(e.clientY-b.top)/b.height;
  c.style.setProperty('--mx',(px*100)+'%'); c.style.setProperty('--my',(py*100)+'%');
  if(!reduce) c.style.transform='rotateY('+((px-.5)*15)+'deg) rotateX('+(-(py-.5)*13)+'deg) translateZ(12px)';
});
c.addEventListener('pointerleave',()=>{ c.style.transform=''; });
`
},
{
slug:'spotlight-border', title:'Spotlight Border', c:'#6ea8ff',
desc:'A light source follows your cursor around the 1.4px rim and spills a soft pool onto the face.',
note:'Border light uses <b>mask-composite: exclude</b> so only the rim is painted.',
css:CARD+`
.spot::before{content:"";position:absolute;inset:0;border-radius:22px;padding:1.4px;z-index:2;
  pointer-events:none;opacity:0;transition:opacity .35s;
  background:radial-gradient(200px 200px at var(--mx,50%) var(--my,50%),#fff,rgba(120,150,255,.3) 45%,transparent 70%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  mask-composite:exclude}
.spot:hover::before{opacity:1}
.spot::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .35s;
  background:radial-gradient(220px 220px at var(--mx,50%) var(--my,50%),rgba(110,180,255,.16),transparent 65%)}
.spot:hover::after{opacity:1}
.dots{display:flex;gap:7px;margin-top:16px}
.dots i{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.18)}
.dots i:first-child{background:#6ea8ff;box-shadow:0 0 12px #6ea8ff}
`,
html:`<div class="card spot" id="c">
  <div class="pad" style="padding:22px">
    <span class="k">system status</span>
    <h3 style="margin-top:7px">Spotlight Border</h3>
    <p class="sub">The rim is a masked radial gradient. It only exists where your cursor is.</p>
    <div class="dots"><i></i><i></i><i></i><i></i><i></i></div>
  </div>
</div>`,
js:`
const c=$('c');
c.addEventListener('pointermove',e=>{
  const b=c.getBoundingClientRect();
  c.style.setProperty('--mx',((e.clientX-b.left)/b.width*100)+'%');
  c.style.setProperty('--my',((e.clientY-b.top)/b.height*100)+'%');
});
`
},
{
slug:'flip', title:'Flip Card', c:'#a06bff',
desc:'Two faces on one element, back-face hidden, 850ms of rotateY between them.',
note:'Click anywhere on the card &mdash; it is a real button, so Enter works too.',
css:`
.demo{perspective:1200px}
.flip{position:relative;width:min(320px,100%);height:212px;transform-style:preserve-3d;cursor:pointer;
  border:0;background:none;padding:0;font:inherit;color:inherit;text-align:left;
  transition:transform .85s cubic-bezier(.4,.9,.3,1)}
.flip[data-flip]{transform:rotateY(180deg)}
.f{position:absolute;inset:0;border-radius:22px;backface-visibility:hidden;overflow:hidden;
  border:1px solid rgba(255,255,255,.12);padding:20px;display:flex;flex-direction:column;
  justify-content:space-between;box-shadow:0 26px 60px -28px #000}
.front{background:linear-gradient(150deg,#2a1a5e,#0d1030)}
.back{background:linear-gradient(150deg,#0b3550,#08202e);transform:rotateY(180deg)}
.k{font:600 8.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(233,237,255,.4)}
.num{font:650 21px/1 ui-monospace,monospace;letter-spacing:.14em}
h3{margin:9px 0 0;font-size:18px;font-weight:650;letter-spacing:-.03em}
.sub{margin:0;font-size:13px;color:rgba(233,237,255,.65);line-height:1.6}
`,
html:`<button class="flip" id="flip">
  <div class="f front">
    <span class="k">tap to flip</span>
    <div><div class="num">&bull;&bull;&bull;&bull; 4291</div><h3>Front face</h3></div>
  </div>
  <div class="f back">
    <span class="k">reverse</span>
    <div><p class="sub">Two absolutely positioned faces share one transform. The hidden one is culled by backface-visibility.</p></div>
  </div>
</button>`,
js:`
$('flip').addEventListener('click',e=>e.currentTarget.toggleAttribute('data-flip'));
`
},
{
slug:'product', title:'Product Card', c:'#ff7a45',
desc:'The object lifts and tilts on hover, and adding to cart throws a dot along an arc toward the basket.',
note:'The flying dot is a WAAPI keyframe on a <b>position:fixed</b> node, removed on finish.',
css:CARD+`
.art{height:148px;position:relative;overflow:hidden;
  background:radial-gradient(90% 90% at 50% 20%,#ff8a5b,#7a1f4f 60%,#1a0a20)}
.obj{position:absolute;left:50%;top:52%;width:94px;height:94px;margin:-47px 0 0 -47px;
  border-radius:28px;background:linear-gradient(145deg,#fff,#ffd9c2 40%,#ff7a45);
  box-shadow:0 24px 44px -14px rgba(0,0,0,.72),0 0 0 1px rgba(255,255,255,.42) inset;
  transition:transform .55s cubic-bezier(.2,1.2,.3,1)}
.card:hover .obj{transform:translateY(-9px) rotate(-8deg) scale(1.07)}
.tag{position:absolute;top:13px;left:13px;padding:6px 10px;border-radius:9px;
  background:rgba(0,0,0,.45);backdrop-filter:blur(6px);
  font:700 9px/1 ui-monospace,monospace;letter-spacing:.14em;color:#ffd6c2}
.buy{display:flex;align-items:center;gap:10px;margin-top:16px}
.price{font-size:19px;font-weight:650;letter-spacing:-.03em;flex:1;font-variant-numeric:tabular-nums}
.price s{font-size:12.5px;color:rgba(233,237,255,.35);font-weight:400;margin-left:6px}
.atc{border:0;border-radius:13px;padding:12px 18px;cursor:pointer;
  font:650 13px/1 ui-sans-serif,system-ui;color:#1a0a08;
  background:linear-gradient(130deg,#ffd9c2,#ff7a45);box-shadow:0 12px 26px -10px #ff7a45;
  transition:transform .2s cubic-bezier(.2,1.5,.4,1),background .3s}
.atc:active{transform:scale(.95)}
.atc[data-s="ok"]{background:linear-gradient(130deg,#3dffa8,#25d9e6)}
.fly{position:fixed;z-index:99;width:18px;height:18px;border-radius:50%;pointer-events:none;
  background:#ff7a45;box-shadow:0 0 16px #ff7a45}
`,
html:`<div class="card">
  <div class="art"><span class="tag">NEW DROP</span><div class="obj"></div></div>
  <div class="pad">
    <span class="k">aero series</span>
    <h3 style="margin-top:7px">Nimbus Cube</h3>
    <div class="buy">
      <span class="price">$148<s>$189</s></span>
      <button class="atc" id="atc" data-s="idle">Add to cart</button>
    </div>
  </div>
</div>`,
js:`
const atc=$('atc');
atc.addEventListener('click',()=>{
  if(atc.dataset.s!=='idle') return;
  const b=atc.getBoundingClientRect();
  if(!reduce){
    const d=document.createElement('div'); d.className='fly';
    d.style.left=(b.left+b.width/2-9)+'px'; d.style.top=(b.top+b.height/2-9)+'px';
    document.body.appendChild(d);
    d.animate([
      {transform:'translate(0,0) scale(1)',opacity:1},
      {transform:'translate(70px,-110px) scale(1.5)',opacity:.9,offset:.5},
      {transform:'translate(200px,-230px) scale(.2)',opacity:0}
    ],{duration:780,easing:'cubic-bezier(.4,0,.6,1)'}).onfinish=()=>d.remove();
  }
  atc.dataset.s='ok'; atc.textContent='Added';
  setTimeout(()=>{ atc.dataset.s='idle'; atc.textContent='Add to cart'; },1600);
});
`
},
{
slug:'profile', title:'Profile Card', c:'#31e0ff',
desc:'Counters ease up from zero on load, the avatar tips on hover, and Follow toggles the number for real.',
note:'Count-up is an <b>ease-out cubic</b> over 1.2s, formatted to 48.2k.',
css:CARD+`
.card{text-align:center}
.cover{height:82px;background:linear-gradient(110deg,#7c5cff,#31e0ff,#ff2fb3);
  background-size:200% 100%;animation:pan 9s linear infinite}
@keyframes pan{to{background-position:200% 0}}
.av{width:76px;height:76px;border-radius:26px;margin:-40px auto 0;position:relative;
  background:linear-gradient(145deg,#fff,#b8c6ff);border:3px solid #0b0d17;
  display:grid;place-items:center;font:700 24px/1 ui-sans-serif,system-ui;color:#161a33;
  box-shadow:0 16px 32px -12px #000;transition:transform .45s cubic-bezier(.2,1.4,.3,1)}
.card:hover .av{transform:translateY(-5px) rotate(-6deg)}
.stats{display:flex;margin:16px 0 0}
.stats div{flex:1}
.stats b{display:block;font-size:17px;font-weight:650;font-variant-numeric:tabular-nums}
.stats span{font:600 8px/1 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(233,237,255,.36)}
.follow{width:100%;margin-top:17px;padding:13px;border:0;border-radius:14px;cursor:pointer;
  font:650 13.5px/1 ui-sans-serif,system-ui;color:#07080f;background:#fff;
  transition:transform .2s cubic-bezier(.2,1.5,.4,1),background .3s,color .3s}
.follow:active{transform:scale(.97)}
.follow[data-s="on"]{background:rgba(255,255,255,.1);color:#fff;
  box-shadow:0 0 0 1px rgba(255,255,255,.22) inset}
`,
html:`<div class="card">
  <div class="cover"></div>
  <div class="av">VO</div>
  <div class="pad" style="padding-top:13px">
    <h3>Vega Ortiz</h3>
    <p class="sub">Motion systems &middot; Reykjav&iacute;k</p>
    <div class="stats">
      <div><b data-c="1284">0</b><span>posts</span></div>
      <div><b data-c="48200" id="fw">0</b><span>followers</span></div>
      <div><b data-c="312">0</b><span>following</span></div>
    </div>
    <button class="follow" id="follow" data-s="off">Follow</button>
  </div>
</div>`,
js:`
const fmt=n=>n>=1000?(n/1000).toFixed(1).replace('.0','')+'k':''+n;
document.querySelectorAll('[data-c]').forEach(el=>{
  const to=+el.dataset.c;
  if(reduce){ el.textContent=fmt(to); return; }
  const t0=performance.now();
  (function tick(t){
    const p=Math.min(1,(t-t0)/1200), e=1-Math.pow(1-p,3);
    el.textContent=fmt(Math.round(to*e));
    if(p<1) requestAnimationFrame(tick);
  })(t0);
});
const follow=$('follow');
follow.addEventListener('click',()=>{
  const on=follow.dataset.s==='off';
  follow.dataset.s=on?'on':'off';
  follow.textContent=on?'Following':'Follow';
  $('fw').textContent=fmt(48200+(on?1:0));
});
`
},
{
slug:'now-playing', title:'Now Playing', c:'#ff2fb3',
desc:'Play spins the disc, runs a 22-band equaliser and advances the scrubber. Pause freezes all three.',
note:'Bars are driven by offset sine waves, so the motion never repeats exactly.',
css:CARD+`
.card{background:linear-gradient(160deg,#241539,#0d0a1c)}
.row{display:flex;align-items:center;gap:14px}
.cov{width:62px;height:62px;border-radius:18px;flex:none;
  background:conic-gradient(from 40deg,#ff2fb3,#7c5cff,#31e0ff,#ff2fb3);
  box-shadow:0 0 28px -8px #7c5cff;animation:rot 8s linear infinite;animation-play-state:paused}
[data-play] .cov{animation-play-state:running}
@keyframes rot{to{transform:rotate(1turn)}}
.pp{width:44px;height:44px;flex:none;border:0;border-radius:50%;cursor:pointer;background:#fff;
  color:#0b0716;display:grid;place-items:center;transition:transform .2s cubic-bezier(.2,1.6,.4,1)}
.pp:active{transform:scale(.88)}
.pp svg{width:16px;height:16px;fill:currentColor}
.pp .pa{display:none}
[data-play] .pp .pl{display:none}
[data-play] .pp .pa{display:block}
.eq{display:flex;align-items:flex-end;gap:3px;height:30px;margin-top:16px}
.eq i{flex:1;border-radius:2px;background:linear-gradient(180deg,#31e0ff,#7c5cff);height:15%;
  transition:height .12s linear}
.bar{height:4px;border-radius:99px;background:rgba(255,255,255,.12);margin-top:14px;overflow:hidden}
.bar span{display:block;height:100%;width:0%;border-radius:99px;
  background:linear-gradient(90deg,#31e0ff,#ff2fb3)}
.time{display:flex;justify-content:space-between;margin-top:8px;
  font:600 10px/1 ui-monospace,monospace;color:rgba(233,237,255,.35)}
`,
html:`<div class="card" id="card">
  <div class="pad">
    <div class="row">
      <div class="cov"></div>
      <div style="flex:1;min-width:0">
        <h3 style="font-size:16px">Solar Static</h3>
        <p class="sub" style="margin-top:3px">Aeon Drift</p>
      </div>
      <button class="pp" id="pp" aria-label="play">
        <svg class="pl" viewBox="0 0 24 24"><path d="M8 5v14l12-7z"/></svg>
        <svg class="pa" viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>
      </button>
    </div>
    <div class="eq" id="eq"></div>
    <div class="bar"><span id="fill"></span></div>
    <div class="time"><span id="cur">0:00</span><span>3:48</span></div>
  </div>
</div>`,
js:`
const card=$('card'), eq=$('eq'), fill=$('fill'), cur=$('cur');
for(let i=0;i<22;i++) eq.appendChild(document.createElement('i'));
let playing=false, p=0;
$('pp').addEventListener('click',()=>{ playing=!playing; card.toggleAttribute('data-play',playing); });
setInterval(()=>{
  if(!playing) return;
  [...eq.children].forEach((b,i)=>
    b.style.height=(12+Math.abs(Math.sin(Date.now()/240+i*.6))*80)+'%');
  p=(p+.35)%100; fill.style.width=p+'%';
  const s=Math.floor(228*p/100);
  cur.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
}, reduce?500:70);
`
},
{
slug:'weather', title:'Weather Card', c:'#5cc8ff',
desc:'Sixty rain streaks fall on a canvas behind the readout, each with its own speed, length and opacity.',
note:'Drops recycle above the top edge &mdash; sixty objects, no allocation per frame.',
css:CARD+`
.card{background:linear-gradient(170deg,#12304f,#070d1c)}
canvas{position:absolute;inset:0;width:100%;height:100%}
.pad{position:relative;z-index:2;padding:22px}
.sun{position:absolute;right:22px;top:20px;width:48px;height:48px;border-radius:50%;
  background:radial-gradient(circle,#ffe9a8,#ffb648);box-shadow:0 0 38px 8px rgba(255,182,72,.5);
  animation:bob 5s ease-in-out infinite;z-index:2}
@keyframes bob{50%{transform:translateY(8px) scale(1.06)}}
.temp{font-size:50px;font-weight:600;letter-spacing:-.05em;line-height:1;margin:12px 0 0}
.temp sup{font-size:20px;vertical-align:super;opacity:.5}
.wrow{display:flex;justify-content:space-between;margin-top:20px;font-size:11.5px;
  color:rgba(233,237,255,.5);font-family:ui-monospace,monospace}
`,
html:`<div class="card">
  <canvas id="rain"></canvas>
  <div class="sun"></div>
  <div class="pad">
    <span class="k">reykjav&iacute;k</span>
    <div class="temp">11<sup>&deg;C</sup></div>
    <p class="sub">Light rain &middot; feels like 8&deg;</p>
    <div class="wrow"><span>&uarr; 13&deg;</span><span>&darr; 6&deg;</span><span>78% RH</span><span>12 km/h</span></div>
  </div>
</div>`,
js:`
const cv=$('rain'), x=cv.getContext('2d'), DPR=Math.min(devicePixelRatio||1,2);
let w=0,h=0,drops=[];
function fit(){
  const b=cv.getBoundingClientRect(); w=b.width; h=b.height;
  cv.width=w*DPR; cv.height=h*DPR; x.setTransform(DPR,0,0,DPR,0,0);
  drops=Array.from({length:60},()=>({x:Math.random()*w,y:Math.random()*h,
    v:1.6+Math.random()*2.6,l:8+Math.random()*14,o:.12+Math.random()*.34}));
}
addEventListener('resize',fit);
function draw(){
  requestAnimationFrame(draw);
  if(!w) fit();
  x.clearRect(0,0,w,h); x.lineWidth=1.1; x.lineCap='round';
  drops.forEach(d=>{
    x.strokeStyle='rgba(175,215,255,'+d.o+')';
    x.beginPath(); x.moveTo(d.x,d.y); x.lineTo(d.x-1.7,d.y+d.l); x.stroke();
    if(!reduce){ d.y+=d.v*2.3; d.x-=d.v*.36; }
    if(d.y>h){ d.y=-d.l; d.x=Math.random()*w; }
  });
}
draw();
`
},
{
slug:'swipe-deck', title:'Swipe Deck', c:'#ff5fa8',
desc:'Drag the top card. Past 90px it flies off with rotation and recycles to the bottom of the stack.',
note:'LIKE / NOPE opacity is tied directly to drag distance &mdash; <b>dx / 90</b>.',
css:`
.deck{position:relative;width:min(300px,100%);height:236px}
.sw{position:absolute;inset:0;border-radius:22px;padding:20px;cursor:grab;user-select:none;
  display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;
  border:1px solid rgba(255,255,255,.13);box-shadow:0 28px 64px -26px #000;
  transition:transform .45s cubic-bezier(.3,1.1,.3,1),opacity .35s;touch-action:none}
.sw:active{cursor:grabbing}
.stampY,.stampN{position:absolute;top:20px;padding:7px 13px;border-radius:10px;
  font:800 14px/1 ui-monospace,monospace;letter-spacing:.18em;opacity:0;transition:opacity .15s}
.stampY{left:20px;color:#4dffcf;border:2px solid #4dffcf;transform:rotate(-12deg)}
.stampN{right:20px;color:#ff5e79;border:2px solid #ff5e79;transform:rotate(12deg)}
.k{font:600 8.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(233,237,255,.45)}
.sw h3{margin:8px 0 0;font-size:21px;font-weight:650;letter-spacing:-.035em}
`,
html:`<div class="deck" id="deck"></div>`,
js:`
const DATA=[
  ['Orbital Ring','#3b1f6e','#0f2a56','Structural concept &middot; 2031'],
  ['Deep Current','#0b4a4f','#08202e','Hydro grid study'],
  ['Solar Veil','#5d1d33','#2a0a20','Thermal shielding'],
  ['Night Atlas','#1b2450','#0a0d1c','Cartography engine']
];
const deck=$('deck');
const top=()=>[...deck.querySelectorAll('.sw')].pop();
DATA.forEach(d=>{
  const el=document.createElement('div'); el.className='sw';
  el.style.background='linear-gradient(160deg,'+d[1]+','+d[2]+')';
  el.innerHTML='<span class="stampY">LIKE</span><span class="stampN">NOPE</span>'+
    '<span class="k">'+d[3]+'</span><h3>'+d[0]+'</h3>';
  deck.appendChild(el);
});
function layout(){
  const all=[...deck.querySelectorAll('.sw')];
  all.forEach((c,i)=>{
    const depth=all.length-1-i;
    c.style.transform='translateY('+(depth*-10)+'px) scale('+(1-depth*.045)+')';
    c.style.opacity = depth>2 ? 0 : 1;
    c.style.zIndex = i+1;
  });
}
function arm(card){
  let sx=0, dx=0, down=false;
  const y=card.querySelector('.stampY'), n=card.querySelector('.stampN');
  card.addEventListener('pointerdown',e=>{
    down=true; sx=e.clientX; card.style.transition='none'; card.setPointerCapture(e.pointerId);
  });
  card.addEventListener('pointermove',e=>{
    if(!down) return;
    dx=e.clientX-sx;
    card.style.transform='translateX('+dx+'px) rotate('+(dx*.06)+'deg)';
    y.style.opacity=Math.max(0,Math.min(1,dx/90));
    n.style.opacity=Math.max(0,Math.min(1,-dx/90));
  });
  card.addEventListener('pointerup',()=>{
    if(!down) return; down=false; card.style.transition='';
    if(Math.abs(dx)>90){
      const dir=Math.sign(dx);
      card.style.transform='translateX('+(dir*620)+'px) rotate('+(dir*30)+'deg)';
      card.style.opacity=0;
      setTimeout(()=>{
        deck.insertBefore(card,deck.firstChild);
        card.style.transition='none'; card.style.opacity=1;
        y.style.opacity=n.style.opacity=0;
        layout();
        requestAnimationFrame(()=>{ card.style.transition=''; });
      },340);
    }else{ layout(); y.style.opacity=n.style.opacity=0; }
    dx=0;
  });
}
layout();
deck.querySelectorAll('.sw').forEach(arm);
`
},
{
slug:'border-beam', title:'Border Beam Card', c:'#31e0ff',
desc:'A conic gradient rotates behind the whole card; an opaque inset panel leaves only a travelling highlight on the edge.',
note:'Two pseudo-elements and one <b>@property</b> angle. No JS.',
css:`
@property --ang{syntax:'<angle>';inherits:false;initial-value:0deg}
.beam{position:relative;width:min(320px,100%);border-radius:22px;background:#0a0c18}
.beam::before{content:"";position:absolute;inset:-1.5px;border-radius:23.5px;z-index:0;
  background:conic-gradient(from var(--ang),transparent 0 66%,#31e0ff 80%,#ff2fb3 92%,transparent);
  animation:spin 3.4s linear infinite}
.beam::after{content:"";position:absolute;inset:0;border-radius:22px;background:#0a0c18;z-index:1}
@keyframes spin{to{--ang:360deg}}
.pad{position:relative;z-index:2;padding:22px}
h3{margin:7px 0 0;font-size:18px;font-weight:650;letter-spacing:-.03em}
.sub{margin:6px 0 0;font-size:13px;color:rgba(233,237,255,.48);line-height:1.55}
.k{font:600 8.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(233,237,255,.38)}
.dots{display:flex;gap:7px;margin-top:16px}
.dots i{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.18)}
.dots i:first-child{background:#31e0ff;box-shadow:0 0 12px #31e0ff}
`,
html:`<div class="beam">
  <div class="pad">
    <span class="k">runtime</span>
    <h3>Border Beam</h3>
    <p class="sub">The rim light never stops. Useful for drawing the eye to one card in a grid of many.</p>
    <div class="dots"><i></i><i></i><i></i><i></i></div>
  </div>
</div>`,
js:``
},
{
slug:'hover-reveal', title:'Hover Reveal', c:'#7c5cff',
desc:'The art scales up while the body lifts 40px and a second paragraph fades in behind the headline.',
note:'One transform on the body, one opacity on the extra copy &mdash; delayed 80ms.',
css:`
.rev{position:relative;width:min(320px,100%);height:230px;border-radius:22px;overflow:hidden;
  border:1px solid rgba(255,255,255,.1);box-shadow:0 26px 60px -28px #000}
.art{position:absolute;inset:0;background:radial-gradient(80% 80% at 30% 20%,#4b2fa8,#12132c 70%);
  transition:transform .6s cubic-bezier(.2,1,.3,1)}
.rev:hover .art{transform:scale(1.09)}
.veil{position:absolute;inset:0;
  background:linear-gradient(0deg,rgba(6,7,13,.96) 14%,rgba(6,7,13,.25) 58%,transparent)}
.body{position:absolute;left:0;right:0;bottom:0;padding:20px;
  transform:translateY(40px);transition:transform .5s cubic-bezier(.2,1,.3,1)}
.more{opacity:0;transition:opacity .4s .08s;margin:9px 0 0;font-size:12.5px;
  color:rgba(233,237,255,.55);line-height:1.55}
.rev:hover .body{transform:none}
.rev:hover .more{opacity:1}
.k{font:600 8.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(233,237,255,.45)}
h3{margin:7px 0 0;font-size:19px;font-weight:650;letter-spacing:-.03em}
`,
html:`<div class="rev">
  <div class="art"></div><div class="veil"></div>
  <div class="body">
    <span class="k">editorial</span>
    <h3>Hover to reveal</h3>
    <p class="more">Everything below the fold was always there &mdash; the card just stopped hiding it.</p>
  </div>
</div>`,
js:``
},
{
slug:'stat-sparkline', title:'Stat + Sparkline', c:'#4dffcf',
desc:'A KPI that counts up on load above a filled sparkline drawn on canvas at device resolution.',
note:'Gradient under the curve fades to zero alpha so it never fights the card.',
css:CARD+`
canvas{display:block;width:100%;height:64px;margin-top:12px}
.big{font-size:34px;font-weight:650;letter-spacing:-.045em;font-variant-numeric:tabular-nums;
  margin-top:10px;line-height:1}
.up{color:#4dffcf;font:600 11.5px/1 ui-monospace,monospace;margin-top:8px;display:inline-block}
`,
html:`<div class="card">
  <div class="pad" style="padding:22px">
    <span class="k">throughput</span>
    <div class="big" id="big">0</div>
    <span class="up">&#9650; 12.4% this week</span>
    <canvas id="spark"></canvas>
  </div>
</div>`,
js:`
const big=$('big'), TO=18492;
if(reduce){ big.textContent=TO.toLocaleString(); }
else{
  const t0=performance.now();
  (function tick(t){
    const p=Math.min(1,(t-t0)/1300), e=1-Math.pow(1-p,3);
    big.textContent=Math.round(TO*e).toLocaleString();
    if(p<1) requestAnimationFrame(tick);
  })(t0);
}
const c=$('spark'), x=c.getContext('2d'), DPR=Math.min(devicePixelRatio||1,2);
const w=c.clientWidth||260, h=64;
c.width=w*DPR; c.height=h*DPR; x.scale(DPR,DPR);
const pts=Array.from({length:32},(_,i)=>.28+.46*Math.abs(Math.sin(i*.42)*Math.cos(i*.19+1.2))+i*.008);
const px=i=>i/(pts.length-1)*w, py=v=>h-4-v*(h-14);
x.beginPath(); pts.forEach((v,i)=>i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v)));
x.lineTo(w,h); x.lineTo(0,h); x.closePath();
const g=x.createLinearGradient(0,0,0,h);
g.addColorStop(0,'rgba(77,255,207,.34)'); g.addColorStop(1,'rgba(77,255,207,0)');
x.fillStyle=g; x.fill();
x.beginPath(); pts.forEach((v,i)=>i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v)));
x.strokeStyle='#4dffcf'; x.lineWidth=1.9; x.lineJoin='round';
x.shadowBlur=11; x.shadowColor='#4dffcf'; x.stroke();
`
},
{
slug:'pricing', title:'Pricing Card', c:'#a06bff',
desc:'A measured thumb slides between billing periods and the amount swaps with it.',
note:'Same thumb technique as the segmented control &mdash; measured, not hard-coded.',
css:CARD+`
.card{background:linear-gradient(160deg,rgba(124,92,255,.2),rgba(255,255,255,.02))}
.billing{display:flex;padding:4px;border-radius:12px;background:rgba(0,0,0,.3);width:fit-content;
  margin-top:14px;position:relative}
.billing button{position:relative;z-index:2;border:0;background:none;cursor:pointer;
  font:650 12px/1 ui-sans-serif,system-ui;padding:9px 15px;border-radius:9px;
  color:rgba(233,237,255,.5);transition:color .3s}
.billing button[aria-pressed="true"]{color:#07080f}
.th{position:absolute;top:4px;bottom:4px;left:4px;border-radius:9px;background:#fff;z-index:1;
  transition:transform .42s cubic-bezier(.34,1.35,.4,1),width .42s}
.amount{font-size:42px;font-weight:650;letter-spacing:-.05em;margin:18px 0 0;line-height:1;
  font-variant-numeric:tabular-nums}
.amount em{font-style:normal;font-size:13px;font-weight:500;color:rgba(233,237,255,.45);
  letter-spacing:0;margin-left:4px}
.feat{list-style:none;padding:0;margin:16px 0 0;display:flex;flex-direction:column;gap:9px}
.feat li{display:flex;gap:10px;align-items:center;font-size:13px;color:rgba(233,237,255,.68)}
.feat svg{width:15px;height:15px;fill:none;stroke:#4dffcf;stroke-width:2.6;flex:none}
.cta{width:100%;margin-top:18px;padding:14px;border:0;border-radius:14px;cursor:pointer;
  font:650 14px/1 ui-sans-serif,system-ui;color:#07080f;
  background:linear-gradient(130deg,#c9b6ff,#7c5cff);box-shadow:0 16px 34px -14px #7c5cff;
  transition:transform .2s cubic-bezier(.2,1.5,.4,1)}
.cta:active{transform:scale(.97)}
`,
html:`<div class="card">
  <div class="pad" style="padding:22px">
    <span class="k">studio plan</span>
    <div class="billing" id="billing"><span class="th"></span>
      <button aria-pressed="true">Monthly</button><button aria-pressed="false">Yearly</button>
    </div>
    <div class="amount" id="amount">$24<em>/mo</em></div>
    <ul class="feat">
      <li><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Unlimited prototypes</li>
      <li><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Motion tokens and export</li>
      <li><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>Five seats included</li>
    </ul>
    <button class="cta">Choose Studio</button>
  </div>
</div>`,
js:`
const billing=$('billing'), th=billing.querySelector('.th');
const btns=[...billing.querySelectorAll('button')];
function bill(i){
  const b=btns[i].getBoundingClientRect(), s=billing.getBoundingClientRect();
  th.style.width=b.width+'px';
  th.style.transform='translateX('+(b.left-s.left-4)+'px)';
  btns.forEach((x,n)=>x.setAttribute('aria-pressed',n===i));
  $('amount').innerHTML = i ? '$19<em>/mo &middot; billed yearly</em>' : '$24<em>/mo</em>';
}
btns.forEach((b,i)=>b.addEventListener('click',()=>bill(i)));
requestAnimationFrame(()=>bill(0));
`
}
];
