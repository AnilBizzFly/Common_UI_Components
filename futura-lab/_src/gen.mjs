/* Generates every prototype in futura-lab/ from the data files next to this one.
   Run:  node _src/gen.mjs        (from the futura-lab folder)
   The output HTML files are fully self-contained — this script is only here so a
   shared change (base styles, nav, index layout) can be re-applied to all of them. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buttons} from './data-buttons.mjs';
import {forms}   from './data-forms.mjs';
import {cards}   from './data-cards.mjs';
import {text}    from './data-text.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const CATS = [
  {slug:'buttons', title:'Buttons',      c:'#7c5cff', items:buttons,
   blurb:'Press, hold, load, copy, toggle — every state wired, not a hover picture.'},
  {slug:'forms',   title:'Forms',        c:'#31e0ff', items:forms,
   blurb:'Inputs with the logic in them: validation, scoring, paste, keyboard, upload.'},
  {slug:'cards',   title:'Cards',        c:'#ff2fb3', items:cards,
   blurb:'Surfaces that react — tilt, spotlight, flip, drag, live data.'},
  {slug:'text',    title:'Kinetic text', c:'#ff9ee0', items:text,
   blurb:'Type that moves with intent. Every one of them replays on demand.'}
];

/* ------------------------------------------------------------------ base */
const base = (c) => `
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;min-height:100%;display:grid;place-items:center;padding:74px 20px 64px;
  overflow-x:hidden;font:400 15px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  color:#e9edff;background:#06070d;--c:${c}}
body::before,body::after{content:"";position:fixed;border-radius:50%;filter:blur(105px);
  pointer-events:none;z-index:0}
body::before{width:54vmax;height:54vmax;left:-20vmax;top:-24vmax;
  background:color-mix(in srgb,var(--c) 30%,transparent)}
body::after{width:46vmax;height:46vmax;right:-18vmax;bottom:-22vmax;background:rgba(0,190,255,.16)}

.bar{position:fixed;inset:0 0 auto 0;z-index:5;display:flex;align-items:center;
  justify-content:space-between;gap:10px;padding:16px 18px;
  font:600 9.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.2em;text-transform:uppercase}
.bar a{color:rgba(233,237,255,.4);text-decoration:none;padding:8px 11px;border-radius:9px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);transition:.22s}
.bar a:hover{color:#fff;border-color:color-mix(in srgb,var(--c) 55%,transparent);
  background:color-mix(in srgb,var(--c) 16%,transparent)}
.bar .rt{display:flex;gap:8px}

.stage{position:relative;z-index:1;width:min(460px,100%);text-align:center}
.eyebrow{margin:0 0 10px;font:600 9.5px/1 ui-monospace,Menlo,monospace;letter-spacing:.3em;
  text-transform:uppercase;color:color-mix(in srgb,var(--c) 70%,#8890b8)}
h1{margin:0 0 8px;font-size:clamp(26px,6vw,34px);font-weight:650;letter-spacing:-.04em}
.desc{margin:0;font-size:13.5px;color:rgba(233,237,255,.48);line-height:1.6}

.demo{margin:24px 0 0;padding:40px 22px;border-radius:26px;min-height:176px;position:relative;
  display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px;
  background:linear-gradient(165deg,rgba(255,255,255,.075),rgba(255,255,255,.018));
  border:1px solid rgba(255,255,255,.09);
  box-shadow:0 26px 60px -30px #000,0 1px 0 0 rgba(255,255,255,.12) inset;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.demo.block{display:block;text-align:left;padding:26px 22px}
.demo.bare{background:none;border:0;box-shadow:none;backdrop-filter:none;padding:14px 0}

.note{margin:14px 0 0;font:500 11px/1.7 ui-monospace,Menlo,monospace;letter-spacing:.05em;
  color:rgba(233,237,255,.32)}
.note b{color:color-mix(in srgb,var(--c) 75%,#fff);font-weight:600}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important}
}
`;

/* --------------------------------------------------------------- page */
function page(cat, item, prev, next, i){
  const num = String(i+1).padStart(2,'0');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${item.title}</title>
<style>${base(item.c || cat.c)}
${item.css.trim()}
</style>
</head>
<body>
<nav class="bar">
  <a href="index.html">&larr; ${cat.title.toLowerCase()}</a>
  <span class="rt"><a href="${prev}" title="previous">&larr;</a><a href="${next}" title="next">&rarr;</a></span>
</nav>

<main class="stage">
  <p class="eyebrow">${cat.title} &middot; ${num} / ${String(cat.items.length).padStart(2,'0')}</p>
  <h1>${item.title}</h1>
  <p class="desc">${item.desc}</p>
  <div class="demo${item.demo?' '+item.demo:''}">
${item.html.trim().split('\n').map(l=>'    '+l).join('\n')}
  </div>
  <p class="note">${item.note}</p>
</main>
${item.svg ? item.svg.trim()+'\n' : ''}<script>
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=id=>document.getElementById(id);
${item.js ? item.js.trim() : ''}
</script>
</body>
</html>
`;
}

/* -------------------------------------------------------- category index */
const file=(it,i)=>String(i+1).padStart(2,'0')+'-'+it.slug+'.html';

function catIndex(cat){
  const rows = cat.items.map((it,i)=>`    <a class="row" href="${file(it,i)}">
      <span class="n">${String(i+1).padStart(2,'0')}</span>
      <span class="t"><b>${it.title}</b><em>${it.desc}</em></span>
      <span class="dot" style="background:${it.c||cat.c};color:${it.c||cat.c}"></span>
      <span class="go">&rarr;</span>
    </a>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${cat.title} — Futura Lab</title>
<style>${base(cat.c)}
body{display:block;place-items:unset;padding:74px 20px 70px}
.sheet{position:relative;z-index:1;max-width:760px;margin:0 auto}
.hd{margin-bottom:26px}
.hd h1{font-size:clamp(30px,7vw,44px);letter-spacing:-.05em;margin-bottom:8px}
.hd p{margin:0;color:rgba(233,237,255,.5);font-size:14.5px}
.count{display:inline-block;margin-top:14px;padding:6px 11px;border-radius:99px;
  font:700 9.5px/1 ui-monospace,monospace;letter-spacing:.18em;color:var(--c);
  background:color-mix(in srgb,var(--c) 14%,transparent);
  border:1px solid color-mix(in srgb,var(--c) 32%,transparent)}
.list{display:flex;flex-direction:column;gap:7px}
.row{display:flex;align-items:center;gap:14px;padding:15px 17px;border-radius:17px;
  text-decoration:none;color:inherit;
  background:linear-gradient(165deg,rgba(255,255,255,.06),rgba(255,255,255,.015));
  border:1px solid rgba(255,255,255,.08);
  transition:transform .3s cubic-bezier(.2,1.1,.3,1),border-color .3s,background .3s}
.row:hover{transform:translateX(6px);border-color:color-mix(in srgb,var(--c) 50%,transparent);
  background:color-mix(in srgb,var(--c) 10%,rgba(255,255,255,.02))}
.row .n{font:700 11px/1 ui-monospace,monospace;letter-spacing:.14em;color:rgba(233,237,255,.28);
  flex:none;width:26px}
.row .t{flex:1;min-width:0}
.row .t b{display:block;font-size:15px;font-weight:600;letter-spacing:-.02em}
.row .t em{display:block;font-style:normal;font-size:12.5px;color:rgba(233,237,255,.42);
  margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.row .dot{width:8px;height:8px;border-radius:50%;flex:none;box-shadow:0 0 12px currentColor}
.row .go{flex:none;color:rgba(233,237,255,.3);transition:transform .3s,color .3s}
.row:hover .go{color:#fff;transform:translateX(4px)}
</style>
</head>
<body>
<nav class="bar"><a href="../index.html">&larr; futura lab</a></nav>
<div class="sheet">
  <div class="hd">
    <h1>${cat.title}</h1>
    <p>${cat.blurb}</p>
    <span class="count">${cat.items.length} PROTOTYPES</span>
  </div>
  <div class="list">
${rows}
  </div>
</div>
</body>
</html>
`;
}

/* ------------------------------------------------------------ root index */
function rootIndex(){
  const blocks = CATS.map(cat=>`    <a class="cat" href="${cat.slug}/index.html" style="--c:${cat.c}">
      <span class="num">${cat.items.length}</span>
      <div class="bd">
        <h2>${cat.title}</h2>
        <p>${cat.blurb}</p>
        <div class="chips">${cat.items.slice(0,5).map(i=>'<span>'+i.title+'</span>').join('')}<span class="more">+${cat.items.length-5} more</span></div>
      </div>
      <span class="go">&rarr;</span>
    </a>`).join('\n');
  const total = CATS.reduce((a,c)=>a+c.items.length,0);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Futura Lab</title>
<style>${base('#7c5cff')}
body{display:block;place-items:unset;padding:70px 20px}
.sheet{position:relative;z-index:1;max-width:820px;margin:0 auto}
.hd{text-align:center;margin-bottom:34px}
.hd p:first-child{margin:0 0 12px;font:600 10px/1 ui-monospace,Menlo,monospace;letter-spacing:.38em;
  text-transform:uppercase;color:rgba(233,237,255,.4)}
.hd h1{margin:0 0 10px;font-size:clamp(34px,8vw,56px);font-weight:650;letter-spacing:-.055em;
  background:linear-gradient(100deg,#fff,#8ee7ff 40%,#ff9ee0 72%,#fff);background-size:220% 100%;
  -webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 7s linear infinite}
@keyframes shine{to{background-position:220% 0}}
.hd h1+p{margin:0 auto;max-width:56ch;color:rgba(233,237,255,.5);font-size:15px}
.tot{display:inline-block;margin-top:16px;padding:7px 13px;border-radius:99px;
  font:700 10px/1 ui-monospace,monospace;letter-spacing:.2em;color:#c9b6ff;
  background:rgba(124,92,255,.14);border:1px solid rgba(124,92,255,.32)}
.cats{display:flex;flex-direction:column;gap:13px}
.cat{display:flex;align-items:center;gap:18px;padding:22px;border-radius:24px;
  text-decoration:none;color:inherit;
  background:linear-gradient(165deg,rgba(255,255,255,.07),rgba(255,255,255,.018));
  border:1px solid rgba(255,255,255,.09);
  box-shadow:0 24px 56px -32px #000,0 1px 0 0 rgba(255,255,255,.1) inset;
  transition:transform .35s cubic-bezier(.2,1.1,.3,1),border-color .3s,box-shadow .35s}
.cat:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--c) 50%,transparent);
  box-shadow:0 40px 80px -34px #000,0 0 0 1px color-mix(in srgb,var(--c) 34%,transparent) inset}
.cat .num{flex:none;width:58px;height:58px;border-radius:19px;display:grid;place-items:center;
  font:700 19px/1 ui-sans-serif,system-ui;color:#06070d;
  background:linear-gradient(140deg,var(--c),#fff);box-shadow:0 12px 30px -12px var(--c)}
.cat .bd{flex:1;min-width:0}
.cat h2{margin:0;font-size:20px;font-weight:650;letter-spacing:-.035em}
.cat p{margin:4px 0 0;font-size:13px;color:rgba(233,237,255,.48)}
.chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:11px}
.chips span{font:600 9px/1 ui-monospace,Menlo,monospace;letter-spacing:.1em;text-transform:uppercase;
  padding:5px 8px;border-radius:7px;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);color:rgba(233,237,255,.5)}
.chips .more{color:var(--c);border-color:color-mix(in srgb,var(--c) 40%,transparent);
  background:color-mix(in srgb,var(--c) 12%,transparent)}
.cat .go{flex:none;font-size:20px;color:rgba(233,237,255,.3);transition:.3s}
.cat:hover .go{color:#fff;transform:translateX(5px)}
footer{margin-top:34px;text-align:center;font:500 11px/1.7 ui-monospace,Menlo,monospace;
  color:rgba(233,237,255,.3);letter-spacing:.05em}
@media(max-width:560px){.cat .num{width:46px;height:46px;font-size:16px;border-radius:15px}}
</style>
</head>
<body>
<div class="sheet">
  <div class="hd">
    <p>ui lab</p>
    <h1>Futura Lab</h1>
    <p>Every component as its own prototype — one self-contained file each. No libraries, no build step, opens straight from disk.</p>
    <span class="tot">${total} PROTOTYPES</span>
  </div>
  <div class="cats">
${blocks}
  </div>
  <footer>dark-native &middot; prefers-reduced-motion respected throughout</footer>
</div>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ run */
let n=0;
for(const cat of CATS){
  const dir=path.join(ROOT,cat.slug);
  fs.mkdirSync(dir,{recursive:true});
  cat.items.forEach((it,i)=>{
    const p=(i-1+cat.items.length)%cat.items.length, q=(i+1)%cat.items.length;
    fs.writeFileSync(path.join(dir,file(it,i)),
      page(cat,it,file(cat.items[p],p),file(cat.items[q],q),i));
    n++;
  });
  fs.writeFileSync(path.join(dir,'index.html'), catIndex(cat));
}
fs.writeFileSync(path.join(ROOT,'index.html'), rootIndex());
console.log('wrote '+n+' prototypes + '+(CATS.length+1)+' indexes');
