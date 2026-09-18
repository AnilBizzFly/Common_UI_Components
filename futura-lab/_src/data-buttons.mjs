const B = `
.b{position:relative;border:0;cursor:pointer;font:650 15px/1 ui-sans-serif,system-ui;
  padding:16px 30px;border-radius:15px;color:#fff;background:rgba(255,255,255,.08);
  isolation:isolate;overflow:hidden;-webkit-tap-highlight-color:transparent}
`;

export const buttons = [
{
slug:'magnetic', title:'Magnetic Button', c:'#7c5cff',
desc:'The body chases your cursor and the label lags behind it, so the button feels like it has mass.',
note:'Two transforms, different multipliers &mdash; body <b>22px</b>, label <b>9px</b>.',
css:B+`
.b-mag{background:linear-gradient(130deg,#7c5cff,#31e0ff);color:#07080f;border-radius:17px;
  box-shadow:0 14px 34px -12px #7c5cff;transition:transform .28s cubic-bezier(.2,1.2,.3,1)}
.b-mag span{display:inline-block;transition:transform .28s cubic-bezier(.2,1.2,.3,1)}
.hit{padding:40px;margin:-40px;border-radius:50px}
`,
html:`<div class="hit" id="hit"><button class="b b-mag" id="mag"><span>Magnetic</span></button></div>`,
js:`
const mag=$('mag'), lbl=mag.querySelector('span'), hit=$('hit');
hit.addEventListener('pointermove',e=>{
  if(reduce) return;
  const b=mag.getBoundingClientRect();
  const x=(e.clientX-b.left-b.width/2)/b.width, y=(e.clientY-b.top-b.height/2)/b.height;
  mag.style.transform='translate('+(x*22)+'px,'+(y*16)+'px)';
  lbl.style.transform='translate('+(x*9)+'px,'+(y*7)+'px)';
});
hit.addEventListener('pointerleave',()=>{ mag.style.transform=''; lbl.style.transform=''; });
`
},
{
slug:'gooey', title:'Gooey Split', c:'#ff2fb3',
desc:'Two metaballs hide behind the pill. On hover they pull apart and an SVG goo filter stretches the liquid between them.',
note:'feGaussianBlur + feColorMatrix alpha contrast &mdash; the classic <b>goo</b> filter.',
css:B+`
.goowrap{filter:url(#goo);display:grid;place-items:center;padding:26px}
.b-goo{background:#ff2fb3;border-radius:999px;padding:17px 34px}
.b-goo::before,.b-goo::after{content:"";position:absolute;width:42px;height:42px;border-radius:50%;
  background:#ff2fb3;top:50%;margin-top:-21px;z-index:-1;
  transition:transform .6s cubic-bezier(.3,1.4,.4,1)}
.b-goo::before{left:6px}.b-goo::after{right:6px}
.b-goo:hover::before{transform:translate(-30px,-18px) scale(.8)}
.b-goo:hover::after{transform:translate(30px,18px) scale(.8)}
`,
html:`<div class="goowrap"><button class="b b-goo">Gooey</button></div>`,
svg:`<svg width="0" height="0" style="position:absolute"><filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b"/>
  <feColorMatrix in="b" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -8"/>
</filter></svg>`,
js:``
},
{
slug:'liquid-fill', title:'Liquid Fill', c:'#4dffcf',
desc:'A wave crest rides on top of the rising fill, so it reads as liquid instead of a growing rectangle.',
note:'The crest is a repeating radial-gradient strip moving with the fill.',
css:B+`
.b-liq{background:transparent;border:1.6px solid #4dffcf;color:#4dffcf;border-radius:15px;
  transition:color .4s .06s;padding:17px 34px}
.b-liq::before{content:"";position:absolute;inset:auto 0 0 0;height:0;z-index:-1;background:#4dffcf;
  transition:height .5s cubic-bezier(.4,1,.3,1)}
.b-liq::after{content:"";position:absolute;left:0;right:0;bottom:0;height:0;z-index:-1;
  background:radial-gradient(circle at 20% 0,transparent 13px,#4dffcf 13.5px) repeat-x;
  background-size:36px 20px;transition:bottom .5s cubic-bezier(.4,1,.3,1)}
.b-liq:hover{color:#05100c}
.b-liq:hover::before{height:100%}
.b-liq:hover::after{height:20px;bottom:calc(100% - 5px)}
`,
html:`<button class="b b-liq">Liquid fill</button>`,
js:``
},
{
slug:'ripple', title:'Pointer Ripple', c:'#8cbeff',
desc:'A circle is born at the exact pixel you pressed and expands past the edges of the button.',
note:'Ripple diameter = <b>max(w,h) &times; 2.4</b>, removed on animation end.',
css:B+`
.b-rip{background:#1b1f39;border:1px solid rgba(255,255,255,.14);padding:18px 38px}
.rip{position:absolute;border-radius:50%;background:rgba(140,190,255,.45);
  transform:translate(-50%,-50%) scale(0);pointer-events:none;animation:rip .68s ease-out forwards}
@keyframes rip{to{transform:translate(-50%,-50%) scale(1);opacity:0}}
`,
html:`<button class="b b-rip" id="rip">Press anywhere</button>`,
js:`
$('rip').addEventListener('pointerdown',e=>{
  const t=e.currentTarget, b=t.getBoundingClientRect(), d=Math.max(b.width,b.height)*2.4;
  const s=document.createElement('span'); s.className='rip';
  s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-b.left)+'px;top:'+(e.clientY-b.top)+'px';
  t.appendChild(s); setTimeout(()=>s.remove(),700);
});
`
},
{
slug:'border-beam', title:'Border Beam', c:'#31e0ff',
desc:'A conic gradient spins behind the button; an inset panel covers all of it except a 2px rim.',
note:'Needs <b>@property --ang</b> so the angle can actually animate.',
css:B+`
@property --ang{syntax:'<angle>';inherits:false;initial-value:0deg}
.b-beam{background:#0b0d18;border-radius:16px;padding:17px 34px}
.b-beam::before{content:"";position:absolute;inset:-2px;z-index:-2;border-radius:18px;
  background:conic-gradient(from var(--ang),transparent 0 62%,#31e0ff 78%,#a06bff 92%,transparent);
  animation:rot 2.6s linear infinite}
.b-beam::after{content:"";position:absolute;inset:0;z-index:-1;border-radius:15px;background:#0b0d18}
@keyframes rot{to{--ang:360deg}}
`,
html:`<button class="b b-beam">Border beam</button>`,
js:``
},
{
slug:'glitch', title:'Glitch Split', c:'#ff3d8b',
desc:'Two clipped copies of the label in magenta and cyan jitter out of register while you hover.',
note:'Both copies come from <b>attr(data-t)</b> &mdash; no duplicate markup.',
css:B+`
.b-glitch{background:#12142a;border:1px solid rgba(255,255,255,.14);letter-spacing:.06em;
  padding:18px 36px}
.b-glitch::before,.b-glitch::after{content:attr(data-t);position:absolute;inset:0;
  display:grid;place-items:center;opacity:0;transition:opacity .1s}
.b-glitch::before{color:#ff3d8b;clip-path:inset(0 0 55% 0)}
.b-glitch::after{color:#31e0ff;clip-path:inset(55% 0 0 0)}
.b-glitch:hover::before{opacity:1;animation:gl1 .38s steps(2,end) infinite}
.b-glitch:hover::after{opacity:1;animation:gl2 .32s steps(2,end) infinite}
@keyframes gl1{0%,100%{transform:translate(-3px,-1px)}50%{transform:translate(3px,1px)}}
@keyframes gl2{0%,100%{transform:translate(3px,1px)}50%{transform:translate(-3px,-1px)}}
`,
html:`<button class="b b-glitch" data-t="SIGNAL">SIGNAL</button>`,
js:``
},
{
slug:'load-success', title:'Load &rarr; Success', c:'#31e0ff',
desc:'Click and the button collapses to a circle, spins, then turns green and draws a tick before resetting.',
note:'One <b>data-s</b> word drives all three states: idle / load / ok.',
css:B+`
.b-load{background:linear-gradient(130deg,#31e0ff,#7c5cff);color:#07080f;width:168px;height:54px;
  padding:0;border-radius:15px;font-size:15px;
  transition:width .45s cubic-bezier(.4,1.4,.4,1),border-radius .45s,background .4s}
.b-load .t{transition:opacity .2s}
.b-load .sp,.b-load .ok{position:absolute;inset:0;display:grid;place-items:center;opacity:0;
  transition:opacity .2s}
.b-load .sp i{width:21px;height:21px;border-radius:50%;border:2.6px solid rgba(7,8,15,.3);
  border-top-color:#07080f;animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(1turn)}}
.b-load[data-s="load"]{width:54px;border-radius:50%}
.b-load[data-s="load"] .t{opacity:0}
.b-load[data-s="load"] .sp{opacity:1}
.b-load[data-s="ok"]{width:54px;border-radius:50%;background:linear-gradient(130deg,#3dffa8,#25d9e6)}
.b-load[data-s="ok"] .t{opacity:0}
.b-load[data-s="ok"] .ok{opacity:1}
.b-load .ok svg{width:24px;height:24px;fill:none;stroke:#07080f;stroke-width:3;stroke-linecap:round;
  stroke-linejoin:round;stroke-dasharray:26;stroke-dashoffset:26;animation:draw .4s .08s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
`,
html:`<button class="b b-load" id="load" data-s="idle">
  <span class="t">Deploy</span>
  <span class="sp"><i></i></span>
  <span class="ok"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>
</button>`,
js:`
const load=$('load');
load.addEventListener('click',()=>{
  if(load.dataset.s!=='idle') return;
  load.dataset.s='load';
  setTimeout(()=>{ load.dataset.s='ok'; setTimeout(()=>load.dataset.s='idle',1600); },
    reduce?200:1600);
});
`
},
{
slug:'hold-confirm', title:'Hold to Confirm', c:'#ff5e79',
desc:'Destructive actions should cost something. Press and keep pressing for 1.2s &mdash; let go early and it rewinds.',
note:'requestAnimationFrame progress, cancelled on <b>pointerup</b> or leave.',
css:B+`
.b-hold{background:#20101c;border:1px solid #ff5e79;color:#ff8a9c;border-radius:15px;
  padding:18px 34px;user-select:none}
.b-hold::before{content:"";position:absolute;inset:0;z-index:-1;
  background:linear-gradient(90deg,#ff5e79,#ff9a6e);width:var(--p,0%);transition:width .06s linear}
.b-hold[data-s="done"]{color:#1a0808;border-color:#ff9a6e}
`,
html:`<button class="b b-hold" id="hold" data-s="idle">Hold to delete</button>`,
js:`
const hold=$('hold'); let raf=null;
function start(){
  if(hold.dataset.s==='done') return;
  const t0=performance.now();
  (function step(t){
    const p=Math.min(1,(t-t0)/1200);
    hold.style.setProperty('--p',(p*100)+'%');
    if(p<1){ raf=requestAnimationFrame(step); }
    else{
      hold.dataset.s='done'; hold.textContent='Deleted';
      setTimeout(()=>{ hold.dataset.s='idle'; hold.textContent='Hold to delete';
        hold.style.setProperty('--p','0%'); },1700);
    }
  })(t0);
}
function end(){ if(hold.dataset.s==='done') return;
  cancelAnimationFrame(raf); hold.style.setProperty('--p','0%'); }
hold.addEventListener('pointerdown',start);
addEventListener('pointerup',end);
hold.addEventListener('pointerleave',end);
`
},
{
slug:'copy', title:'Copy to Clipboard', c:'#4dffcf',
desc:'Writes real text to your clipboard, confirms, and rolls back. Falls back to execCommand when the page is opened from disk.',
note:'Try pasting afterwards &mdash; it really is on the clipboard.',
css:B+`
.b-copy{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);
  display:flex;align-items:center;gap:10px;font-family:ui-monospace,Menlo,monospace;font-size:13.5px;
  padding:16px 22px}
.b-copy svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.9}
.b-copy[data-s="ok"]{border-color:#4dffcf;color:#4dffcf}
`,
html:`<button class="b b-copy" id="copy" data-s="idle">
  <svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>
  <span>npm i futura-lab</span>
</button>`,
js:`
const copy=$('copy'), txt=copy.querySelector('span'), SRC='npm i futura-lab';
copy.addEventListener('click',async()=>{
  try{ await navigator.clipboard.writeText(SRC); }
  catch(e){
    const ta=document.createElement('textarea'); ta.value=SRC; document.body.appendChild(ta);
    ta.select(); try{ document.execCommand('copy'); }catch(_){} ta.remove();
  }
  copy.dataset.s='ok'; txt.textContent='Copied to clipboard';
  setTimeout(()=>{ copy.dataset.s='idle'; txt.textContent=SRC; },1600);
});
`
},
{
slug:'icon-expand', title:'Icon Expand', c:'#7c5cff',
desc:'A 54px circle that unrolls into a full label on hover, with the icon staying put.',
note:'Width and <b>max-width</b> animate together so the text never reflows mid-motion.',
css:B+`
.b-exp{background:#7c5cff;border-radius:999px;width:58px;height:58px;padding:0;
  display:flex;align-items:center;gap:0;overflow:hidden;
  transition:width .48s cubic-bezier(.3,1.3,.3,1);box-shadow:0 14px 34px -12px #7c5cff}
.b-exp svg{width:21px;height:21px;flex:none;margin-left:18px;stroke:#fff;fill:none;stroke-width:2.2;
  stroke-linecap:round;stroke-linejoin:round}
.b-exp em{font-style:normal;white-space:nowrap;max-width:0;opacity:0;overflow:hidden;
  transition:max-width .48s cubic-bezier(.3,1.3,.3,1),opacity .3s,margin .48s}
.b-exp:hover{width:196px}
.b-exp:hover em{max-width:140px;opacity:1;margin:0 20px 0 11px}
`,
html:`<button class="b b-exp">
  <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><em>Add to project</em>
</button>`,
js:``
},
{
slug:'push-3d', title:'3D Push Key', c:'#ffd23d',
desc:'A solid shadow below the face collapses on press, so the key travels 6px into the page.',
note:'No transition on the way down &mdash; <b>90ms</b> both ways keeps it crisp.',
css:B+`
.b-3d{background:#ffd23d;color:#151005;border-radius:15px;padding:18px 36px;font-size:16px;
  box-shadow:0 7px 0 0 #b78e00,0 14px 26px -8px rgba(0,0,0,.7);
  transition:transform .09s,box-shadow .09s}
.b-3d:active{transform:translateY(7px);
  box-shadow:0 0 0 0 #b78e00,0 4px 12px -6px rgba(0,0,0,.7)}
`,
html:`<button class="b b-3d">Press me</button>`,
js:``
},
{
slug:'neon', title:'Neon Invert', c:'#31e0ff',
desc:'Outlined neon tube that floods with its own colour on hover and throws light onto the surface behind it.',
note:'Four stacked shadows: two tight, two wide, so the glow has falloff.',
css:B+`
.b-neon{background:transparent;border:2px solid #31e0ff;color:#31e0ff;border-radius:13px;
  padding:17px 36px;letter-spacing:.04em;
  text-shadow:0 0 10px #31e0ff;box-shadow:0 0 16px -4px #31e0ff,0 0 22px -8px #31e0ff inset;
  transition:.32s}
.b-neon:hover{background:#31e0ff;color:#04121a;text-shadow:none;
  box-shadow:0 0 34px -2px #31e0ff,0 0 80px -10px #31e0ff}
`,
html:`<button class="b b-neon">Neon</button>`,
js:``
},
{
slug:'shine', title:'Specular Shine', c:'#a06bff',
desc:'A skewed highlight sweeps across the face on hover, like light catching a polished edge.',
note:'One pseudo-element, <b>skewX(-22deg)</b>, 600ms travel.',
css:B+`
.b-shine{background:linear-gradient(130deg,#2a2150,#46308c);border:1px solid rgba(255,255,255,.18);
  padding:18px 38px}
.b-shine::after{content:"";position:absolute;top:0;bottom:0;width:80px;left:-100px;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);
  transform:skewX(-22deg);transition:left .6s cubic-bezier(.4,.1,.2,1)}
.b-shine:hover::after{left:130%}
`,
html:`<button class="b b-shine">Shine</button>`,
js:``
},
{
slug:'like-burst', title:'Like Burst', c:'#ff6e8a',
desc:'Toggling the heart fills it, bumps the count, and throws ten particles out on a circle.',
note:'Particles are spans with <b>--dx / --dy</b> set from cos/sin, removed after 620ms.',
css:B+`
.b-like{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
  display:flex;align-items:center;gap:10px;font-variant-numeric:tabular-nums;overflow:visible;
  padding:16px 26px}
.b-like svg{width:21px;height:21px;fill:none;stroke:#ff6e8a;stroke-width:2;
  transition:transform .35s cubic-bezier(.2,1.8,.4,1)}
.b-like[data-s="on"]{border-color:#ff6e8a;color:#ff9fb1}
.b-like[data-s="on"] svg{fill:#ff6e8a;transform:scale(1.2)}
.spark{position:absolute;left:50%;top:50%;width:6px;height:6px;border-radius:50%;background:#ff6e8a;
  pointer-events:none;animation:spk .62s ease-out forwards}
@keyframes spk{to{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0}}
`,
html:`<button class="b b-like" id="like" data-s="off">
  <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.3-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.7-7 9-7 9z"/></svg>
  <span id="n">248</span>
</button>`,
js:`
const like=$('like'), nEl=$('n'); let on=false;
like.addEventListener('click',()=>{
  on=!on; like.dataset.s=on?'on':'off'; nEl.textContent=248+(on?1:0);
  if(!on||reduce) return;
  for(let i=0;i<10;i++){
    const s=document.createElement('span'); s.className='spark';
    const a=(i/10)*6.2832, d=30+Math.random()*18;
    s.style.setProperty('--dx',(Math.cos(a)*d)+'px');
    s.style.setProperty('--dy',(Math.sin(a)*d)+'px');
    like.appendChild(s); setTimeout(()=>s.remove(),640);
  }
});
`
},
{
slug:'download', title:'Download Progress', c:'#4dffcf',
desc:'The button becomes its own progress bar, counts percent, then confirms and resets.',
note:'Progress arrives in uneven steps, the way a real transfer does.',
css:B+`
.b-dl{background:#101426;border:1px solid rgba(255,255,255,.14);width:196px;text-align:center;
  padding:18px 0;font-variant-numeric:tabular-nums}
.b-dl::before{content:"";position:absolute;inset:0;z-index:-1;width:var(--p,0%);
  background:linear-gradient(90deg,#4dffcf,#31e0ff);transition:width .18s linear}
.b-dl[data-s="done"],.b-dl[data-s="run"]{color:#05100c}
`,
html:`<button class="b b-dl" id="dl" data-s="idle">Download</button>`,
js:`
const dl=$('dl');
dl.addEventListener('click',()=>{
  if(dl.dataset.s!=='idle') return;
  dl.dataset.s='run'; let p=0;
  const id=setInterval(()=>{
    p=Math.min(100,p+4+Math.random()*8);
    dl.style.setProperty('--p',p+'%'); dl.textContent=Math.round(p)+'%';
    if(p>=100){
      clearInterval(id); dl.dataset.s='done'; dl.textContent='Saved';
      setTimeout(()=>{ dl.dataset.s='idle'; dl.textContent='Download';
        dl.style.setProperty('--p','0%'); },1700);
    }
  }, reduce?20:95);
});
`
},
{
slug:'arrow-relay', title:'Arrow Relay', c:'#ffffff',
desc:'The arrow exits stage right while an identical one enters from the left, inside a clipped window.',
note:'Two arrows, one <b>overflow:hidden</b> box, opposite translations.',
css:B+`
.b-arrow{background:#fff;color:#07080f;border-radius:999px;display:flex;align-items:center;gap:12px;
  padding:17px 28px}
.b-arrow .ic{position:relative;width:20px;height:15px;overflow:hidden}
.b-arrow .ic svg{position:absolute;top:0;left:0;width:20px;height:15px;stroke:#07080f;fill:none;
  stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;
  transition:transform .42s cubic-bezier(.3,1.2,.3,1)}
.b-arrow .ic svg:last-child{transform:translateX(-25px)}
.b-arrow:hover .ic svg:first-child{transform:translateX(25px)}
.b-arrow:hover .ic svg:last-child{transform:translateX(0)}
`,
html:`<button class="b b-arrow">Continue
  <span class="ic">
    <svg viewBox="0 0 20 15"><path d="M1 7.5h16M12 2l5.5 5.5L12 13"/></svg>
    <svg viewBox="0 0 20 15"><path d="M1 7.5h16M12 2l5.5 5.5L12 13"/></svg>
  </span>
</button>`,
js:``
},
{
slug:'scramble', title:'Text Scramble', c:'#4dffcf',
desc:'The label decodes character by character out of random glyphs whenever you hover or click it.',
note:'Reveal index advances at <b>frame / 2.2</b>, so early letters lock first.',
css:B+`
.b-scr{background:#0d1020;border:1px solid rgba(77,255,207,.3);color:#4dffcf;
  font-family:ui-monospace,Menlo,monospace;font-size:14px;letter-spacing:.12em;min-width:216px;
  padding:18px 26px;text-shadow:0 0 14px rgba(77,255,207,.4)}
`,
html:`<button class="b b-scr" id="scr" data-word="INITIALISE">INITIALISE</button>`,
js:`
const CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%$@*/<>';
const scr=$('scr'), word=scr.dataset.word; let id=null;
function run(){
  if(reduce){ scr.textContent=word; return; }
  clearInterval(id); let f=0;
  id=setInterval(()=>{
    scr.textContent=word.split('').map((c,i)=>
      i<f/2.2 ? c : CH[Math.floor(Math.random()*CH.length)]).join('');
    if(f++>word.length*2.4){ clearInterval(id); scr.textContent=word; }
  },34);
}
scr.addEventListener('pointerenter',run);
scr.addEventListener('click',run);
run();
`
},
{
slug:'pulse-rings', title:'Pulse Rings', c:'#ff5fa8',
desc:'Two rings expand out of the button on a staggered loop &mdash; the "we are live" signal.',
note:'Same keyframe, <b>1.1s</b> offset, so a ring is always in flight.',
css:B+`
.b-pulse{background:linear-gradient(130deg,#ff5fa8,#ff9a6e);color:#180810;border-radius:999px;
  overflow:visible;padding:17px 34px}
.b-pulse::before,.b-pulse::after{content:"";position:absolute;inset:0;border-radius:999px;
  border:1.6px solid #ff5fa8;animation:ping 2.2s cubic-bezier(.2,.6,.3,1) infinite;z-index:-1}
.b-pulse::after{animation-delay:1.1s}
@keyframes ping{to{transform:scale(1.6);opacity:0}}
`,
html:`<button class="b b-pulse">Go live</button>`,
js:``
},
{
slug:'split-reveal', title:'Split Reveal', c:'#a06bff',
desc:'The face tears in half horizontally and slides away to expose the real call to action underneath.',
note:'Two halves share the same label; only the <b>under</b> layer changes copy.',
css:B+`
.b-split{background:#12142a;border:1px solid rgba(255,255,255,.14);padding:0;width:196px;height:56px;
  border-radius:15px}
.b-split .half{position:absolute;left:0;width:100%;height:50%;background:#12142a;display:grid;
  place-items:center;transition:transform .48s cubic-bezier(.4,1.1,.3,1);z-index:2}
.b-split .half.t{top:0;align-items:flex-end;padding-bottom:1px}
.b-split .half.b{bottom:0;align-items:flex-start;padding-top:1px}
.b-split .under{position:absolute;inset:0;display:grid;place-items:center;
  background:linear-gradient(130deg,#a06bff,#31e0ff);color:#07080f;z-index:1}
.b-split:hover .half.t{transform:translateY(-100%)}
.b-split:hover .half.b{transform:translateY(100%)}
`,
html:`<button class="b b-split">
  <span class="under">Let&rsquo;s go</span>
  <span class="half t">Split</span><span class="half b">Split</span>
</button>`,
js:``
},
{
slug:'spotlight', title:'Spotlight Border', c:'#8ea8ff',
desc:'A soft light tracks your cursor around the 1.4px border and spills faintly onto the face.',
note:'Border light = radial gradient + <b>mask-composite: exclude</b>.',
css:B+`
.b-spot{background:#0c0e1c;border-radius:16px;padding:18px 36px}
.b-spot::before{content:"";position:absolute;inset:0;border-radius:16px;padding:1.4px;z-index:-1;
  background:radial-gradient(120px 120px at var(--mx,50%) var(--my,50%),#fff,rgba(120,140,255,.25) 40%,transparent 70%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  mask-composite:exclude}
.b-spot::after{content:"";position:absolute;inset:0;border-radius:16px;z-index:-2;opacity:0;
  background:radial-gradient(100px 100px at var(--mx,50%) var(--my,50%),rgba(120,150,255,.32),transparent 70%);
  transition:opacity .3s}
.b-spot:hover::after{opacity:1}
`,
html:`<button class="b b-spot" id="spot">Spotlight</button>`,
js:`
const spot=$('spot');
spot.addEventListener('pointermove',e=>{
  const r=spot.getBoundingClientRect();
  spot.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
  spot.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
});
`
},
{
slug:'segmented', title:'Segmented Control', c:'#ffffff',
desc:'A single thumb measures the target tab and slides to it, resizing as it goes.',
note:'Thumb position is read from <b>getBoundingClientRect</b>, so labels can be any width.',
css:`
.seg{position:relative;display:flex;padding:5px;border-radius:16px;background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.1)}
.seg button{position:relative;z-index:2;border:0;background:none;cursor:pointer;
  color:rgba(233,237,255,.5);font:600 13.5px/1 ui-sans-serif,system-ui;padding:12px 20px;
  border-radius:12px;transition:color .3s}
.seg button[aria-pressed="true"]{color:#07080f}
.seg .thumb{position:absolute;top:5px;bottom:5px;left:5px;border-radius:12px;z-index:1;
  background:linear-gradient(130deg,#fff,#c9d4ff);box-shadow:0 6px 18px -8px #fff;
  transition:transform .45s cubic-bezier(.34,1.35,.4,1),width .45s cubic-bezier(.34,1.35,.4,1)}
`,
html:`<div class="seg" id="seg"><span class="thumb"></span>
  <button aria-pressed="true">Day</button>
  <button aria-pressed="false">Week</button>
  <button aria-pressed="false">Year</button>
</div>`,
js:`
const seg=$('seg'), thumb=seg.querySelector('.thumb');
const btns=[...seg.querySelectorAll('button')];
function move(i){
  const b=btns[i].getBoundingClientRect(), s=seg.getBoundingClientRect();
  thumb.style.width=b.width+'px';
  thumb.style.transform='translateX('+(b.left-s.left-5)+'px)';
  btns.forEach((x,n)=>x.setAttribute('aria-pressed',n===i));
}
btns.forEach((b,i)=>b.addEventListener('click',()=>move(i)));
requestAnimationFrame(()=>move(0));
addEventListener('resize',()=>move(btns.findIndex(b=>b.getAttribute('aria-pressed')==='true')));
`
},
{
slug:'radial-fab', title:'Radial FAB', c:'#ff2fb3',
desc:'The plus rotates 135&deg; into a cross while three actions fan out along an arc.',
note:'Each satellite has its own translate; the stagger comes from the spring easing.',
css:`
.fab{position:relative;width:62px;height:62px;margin-top:40px}
.fab .main{position:absolute;inset:0;border-radius:50%;border:0;cursor:pointer;z-index:3;
  background:linear-gradient(130deg,#7c5cff,#ff2fb3);color:#fff;font-size:26px;line-height:1;
  box-shadow:0 14px 34px -10px #7c5cff;transition:transform .42s cubic-bezier(.3,1.4,.3,1)}
.fab[data-open] .main{transform:rotate(135deg)}
.fab i{position:absolute;left:13px;top:13px;width:36px;height:36px;border-radius:50%;
  background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);display:grid;
  place-items:center;font-size:14px;font-style:normal;z-index:2;opacity:0;
  transition:transform .48s cubic-bezier(.3,1.4,.3,1),opacity .3s}
.fab[data-open] i{opacity:1}
.fab[data-open] i:nth-of-type(1){transform:translate(0,-66px)}
.fab[data-open] i:nth-of-type(2){transform:translate(-58px,-34px)}
.fab[data-open] i:nth-of-type(3){transform:translate(58px,-34px)}
`,
html:`<div class="fab" id="fab"><i>&#9733;</i><i>&#9998;</i><i>&#8599;</i><button class="main">+</button></div>`,
js:`
const fab=$('fab');
fab.querySelector('.main').addEventListener('click',()=>fab.toggleAttribute('data-open'));
`
},
{
slug:'ghost-underline', title:'Ghost Underline', c:'#31e0ff',
desc:'The quietest button in the set: a gradient rule wipes in from the left and out to the right.',
note:'One trick &mdash; <b>transform-origin</b> flips between hover in and hover out.',
css:B+`
.b-ghost{background:none;padding:14px 4px;border-radius:0;color:#cdd5f5;font-weight:600;font-size:17px}
.b-ghost::after{content:"";position:absolute;left:0;bottom:6px;height:2px;width:100%;
  background:linear-gradient(90deg,#31e0ff,#a06bff);transform:scaleX(0);transform-origin:right;
  transition:transform .45s cubic-bezier(.4,1,.3,1)}
.b-ghost:hover::after{transform:scaleX(1);transform-origin:left}
`,
html:`<button class="b b-ghost">Read the documentation</button>`,
js:``
},
{
slug:'tactile-key', title:'Tactile Key', c:'#8ea8ff',
desc:'A keycap with a real travel distance. It also fires when you actually press &#8984;K or Ctrl+K.',
note:'Listens on <b>keydown</b> and mirrors the press with the same class.',
css:B+`
.b-key{background:linear-gradient(180deg,#2b3050,#191d34);border-radius:14px;
  border:1px solid rgba(255,255,255,.18);font-family:ui-monospace,Menlo,monospace;font-size:15px;
  padding:16px 28px;
  box-shadow:0 5px 0 #0e1120,0 12px 24px -8px #000,0 1px 0 rgba(255,255,255,.28) inset;
  transition:transform .08s,box-shadow .08s}
.b-key:active,.b-key.down{transform:translateY(5px);
  box-shadow:0 0 0 #0e1120,0 4px 10px -6px #000,0 1px 0 rgba(255,255,255,.22) inset}
`,
html:`<button class="b b-key" id="key">&#8984; K</button>`,
js:`
const key=$('key');
addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){
    e.preventDefault(); key.classList.add('down');
    setTimeout(()=>key.classList.remove('down'),150);
  }
});
`
}
];
