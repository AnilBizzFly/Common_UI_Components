const RE = `
.replay{position:absolute;top:12px;right:12px;width:30px;height:30px;border:0;border-radius:50%;
  background:rgba(255,255,255,.07);color:rgba(233,237,255,.5);cursor:pointer;font-size:13px;
  display:grid;place-items:center;transition:.28s;z-index:3}
.replay:hover{background:rgba(255,255,255,.16);color:#fff;transform:rotate(-180deg)}
`;

export const text = [
{
slug:'scramble', title:'Scramble Decode', c:'#4dffcf',
desc:'The word resolves out of random glyphs, locking in one character at a time from the left.',
note:'Hover the word or hit <b>&#8635;</b> to run it again.',
css:RE+`
.t{font:700 30px/1 ui-monospace,Menlo,monospace;letter-spacing:.1em;color:#4dffcf;
  text-shadow:0 0 22px rgba(77,255,207,.45);cursor:default}
`,
html:`<button class="replay" id="re">&#8635;</button>
<span class="t" id="t" data-word="DECRYPTED">DECRYPTED</span>`,
js:`
const CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%$@*/<>';
const t=$('t'), word=t.dataset.word; let id=null;
function run(){
  if(reduce){ t.textContent=word; return; }
  clearInterval(id); let f=0;
  id=setInterval(()=>{
    t.textContent=word.split('').map((c,i)=>
      i<f/2.2 ? c : CH[Math.floor(Math.random()*CH.length)]).join('');
    if(f++>word.length*2.4){ clearInterval(id); t.textContent=word; }
  },34);
}
t.addEventListener('pointerenter',run);
$('re').addEventListener('click',run);
run();
`
},
{
slug:'shine', title:'Specular Shine', c:'#8ee7ff',
desc:'A bright band travels through the letterforms themselves, as if a light were passing behind the text.',
note:'One gradient, <b>background-clip:text</b>, animated background-position.',
css:`
.t{font-size:clamp(28px,8vw,40px);font-weight:700;letter-spacing:-.04em;text-align:center;
  background:linear-gradient(100deg,#42456a 0 38%,#fff 48%,#8ee7ff 55%,#42456a 65% 100%);
  background-size:280% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:sweep 3.2s linear infinite}
@keyframes sweep{to{background-position:-280% 0}}
`,
html:`<span class="t">Specular Shine</span>`,
js:``
},
{
slug:'letter-stagger', title:'Letter Stagger', c:'#a06bff',
desc:'Every character is its own element, rising and untwisting on a 46ms cascade.',
note:'Split in JS so the markup stays one clean string.',
css:RE+`
.t{font-size:clamp(28px,8vw,38px);font-weight:700;letter-spacing:-.035em;text-align:center}
.t span{display:inline-block;opacity:0;transform:translateY(26px) rotate(10deg);
  animation:up .62s cubic-bezier(.2,1.1,.3,1) forwards}
@keyframes up{to{opacity:1;transform:none}}
`,
html:`<button class="replay" id="re">&#8635;</button>
<span class="t" id="t" data-text="Stagger In"></span>`,
js:`
const t=$('t'), src=t.dataset.text;
function run(){
  t.innerHTML='';
  [...src].forEach((ch,i)=>{
    const s=document.createElement('span');
    s.textContent = ch===' ' ? '\\u00A0' : ch;
    s.style.animationDelay=(i*46)+'ms';
    t.appendChild(s);
  });
}
$('re').addEventListener('click',run);
run();
`
},
{
slug:'typewriter', title:'Typewriter Loop', c:'#ff9ee0',
desc:'Types a phrase, holds, deletes it faster than it wrote it, then moves to the next one. Forever.',
note:'Write <b>78ms</b> per character, delete <b>42ms</b> &mdash; deleting should always feel quicker.',
css:RE+`
.t{font:600 clamp(18px,5vw,23px)/1.4 ui-monospace,Menlo,monospace;text-align:center}
.t b{color:#ff9ee0;font-weight:700}
.cur{display:inline-block;width:10px;height:21px;vertical-align:-3px;background:#ff9ee0;
  margin-left:3px;animation:blink .8s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
`,
html:`<button class="replay" id="re">&#8635;</button>
<span class="t">We build <b id="w"></b><span class="cur"></span></span>`,
js:`
const WORDS=['interfaces.','motion systems.','design tokens.','the future.'];
const w=$('w'); let wi=0, ci=0, del=false, timer=null;
function type(){
  const word=WORDS[wi];
  w.textContent = del ? word.slice(0,ci--) : word.slice(0,ci++);
  let wait = del ? 42 : 78;
  if(!del && ci>word.length){ del=true; wait=1300; }
  if(del && ci<0){ del=false; ci=0; wi=(wi+1)%WORDS.length; wait=260; }
  timer=setTimeout(type, reduce?700:wait);
}
$('re').addEventListener('click',()=>{
  clearTimeout(timer); ci=0; del=false; wi=(wi+1)%WORDS.length; type();
});
type();
`
},
{
slug:'glitch', title:'RGB Glitch', c:'#ff2fb3',
desc:'Magenta and cyan copies of the text slip out of register in short bursts, then snap back.',
note:'Both layers are <b>attr(data-t)</b>, clipped top and bottom, on steps() timing.',
css:`
.t{position:relative;font:800 clamp(26px,7vw,36px)/1 ui-sans-serif,system-ui;letter-spacing:-.02em;
  color:#fff;text-align:center}
.t::before,.t::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%}
.t::before{color:#ff2fb3;clip-path:inset(0 0 58% 0);animation:g1 2.4s steps(2,end) infinite}
.t::after{color:#31e0ff;clip-path:inset(58% 0 0 0);animation:g2 2.4s steps(2,end) infinite}
@keyframes g1{0%,88%,100%{transform:none}90%{transform:translate(-6px,-2px)}94%{transform:translate(5px,1px)}}
@keyframes g2{0%,88%,100%{transform:none}92%{transform:translate(6px,2px)}96%{transform:translate(-5px,-1px)}}
`,
html:`<span class="t" data-t="SIGNAL LOST">SIGNAL LOST</span>`,
js:``
},
{
slug:'wave', title:'Letter Wave', c:'#8ee7ff',
desc:'A travelling swell runs through the word &mdash; each letter lifts and swells 70ms after the one before it.',
note:'Delay per letter is the whole trick; the keyframe is identical for all of them.',
css:`
.t{font-size:clamp(26px,7vw,34px);font-weight:700;letter-spacing:-.02em;text-align:center}
.t span{display:inline-block;animation:wv 1.9s ease-in-out infinite;
  background:linear-gradient(180deg,#fff,#8ee7ff);-webkit-background-clip:text;
  background-clip:text;color:transparent}
@keyframes wv{0%,100%{transform:translateY(0) scale(1)}35%{transform:translateY(-15px) scale(1.14)}}
`,
html:`<span class="t" id="t" data-text="WAVEFORM"></span>`,
js:`
const t=$('t');
[...t.dataset.text].forEach((ch,i)=>{
  const s=document.createElement('span');
  s.textContent = ch===' ' ? '\\u00A0' : ch;
  s.style.animationDelay=(i*70)+'ms';
  t.appendChild(s);
});
`
},
{
slug:'blur-in', title:'Blur In', c:'#c9b6ff',
desc:'The sentence arrives out of focus, one word at a time, resolving as it settles.',
note:'Animating <b>filter: blur()</b> alongside opacity is what makes it read as focus, not fade.',
css:RE+`
.t{font-size:clamp(18px,5vw,23px);font-weight:600;letter-spacing:-.02em;line-height:1.5;
  text-align:center;max-width:320px}
.t span{display:inline-block;opacity:0;filter:blur(12px);transform:translateY(10px);
  animation:bi .8s cubic-bezier(.2,1,.3,1) forwards}
@keyframes bi{to{opacity:1;filter:blur(0);transform:none}}
`,
html:`<button class="replay" id="re">&#8635;</button>
<span class="t" id="t" data-text="Focus arrives one word at a time"></span>`,
js:`
const t=$('t');
function run(){
  t.innerHTML='';
  t.dataset.text.split(' ').forEach((word,i)=>{
    const s=document.createElement('span');
    s.textContent=word; s.style.animationDelay=(i*110)+'ms';
    t.appendChild(s); t.appendChild(document.createTextNode(' '));
  });
}
$('re').addEventListener('click',run);
run();
`
},
{
slug:'word-rotator', title:'Word Rotator', c:'#ff9ee0',
desc:'A slot machine for a single word. The list duplicates its first item so the loop back is invisible.',
note:'Transition is killed for one frame at the wrap point, then restored.',
css:`
.t{font-size:clamp(20px,5.5vw,26px);font-weight:650;letter-spacing:-.03em;
  display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center}
.slot{position:relative;height:34px;overflow:hidden;display:inline-block}
.slot ul{list-style:none;margin:0;padding:0;transition:transform .62s cubic-bezier(.4,1.3,.3,1)}
.slot li{height:34px;line-height:34px;white-space:nowrap;font-weight:750;
  background:linear-gradient(100deg,#ff9ee0,#8ee7ff);-webkit-background-clip:text;
  background-clip:text;color:transparent}
`,
html:`<span class="t">Design for
  <span class="slot" id="slot"><ul><li>motion</li><li>clarity</li><li>speed</li><li>depth</li><li>motion</li></ul></span>
</span>`,
js:`
const ul=$('slot').querySelector('ul'); let i=0;
setInterval(()=>{
  i++;
  ul.style.transition='transform .62s cubic-bezier(.4,1.3,.3,1)';
  ul.style.transform='translateY('+(-i*34)+'px)';
  if(i===4) setTimeout(()=>{
    ul.style.transition='none'; ul.style.transform='translateY(0)'; i=0;
  },640);
}, reduce?4000:2000);
`
},
{
slug:'marquee', title:'Seamless Marquee', c:'#31e0ff',
desc:'The list is printed twice and shifted by exactly half, so the loop point never lands on a gap.',
note:'Edges are softened with a <b>mask</b> gradient instead of a hard cut.',
css:`
.marq{width:100%;overflow:hidden;
  -webkit-mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
  mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.marq div{display:flex;gap:28px;width:max-content;animation:marq 14s linear infinite}
.marq b{font:800 26px/1 ui-sans-serif,system-ui;letter-spacing:-.02em;white-space:nowrap;
  color:transparent;-webkit-text-stroke:1.3px rgba(255,255,255,.45)}
.marq b:nth-child(even){-webkit-text-stroke:0;color:#31e0ff}
@keyframes marq{to{transform:translateX(-50%)}}
`,
html:`<div class="marq"><div id="row"></div></div>`,
js:`
const ITEMS=['MOTION','TOKENS','GLASS','KINETIC','DEPTH','FUTURA'];
$('row').innerHTML=[...ITEMS,...ITEMS].map(t=>'<b>'+t+' \\u2726</b>').join('');
`
},
{
slug:'odometer', title:'Odometer Roll', c:'#8ea8ff',
desc:'Each digit is a strip of 0-9 sliding to the right number, with a 70ms stagger so they land in sequence.',
note:'Hit <b>&#8635;</b> for a fresh number.',
css:RE+`
.odo{display:flex;gap:3px;font:700 40px/1 ui-monospace,Menlo,monospace;letter-spacing:-.02em}
.dig{position:relative;width:27px;height:50px;overflow:hidden;border-radius:8px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09)}
.dig ul{list-style:none;margin:0;padding:0;transition:transform .85s cubic-bezier(.3,1.2,.3,1)}
.dig li{height:50px;line-height:50px;text-align:center;
  background:linear-gradient(180deg,#fff,#a8c0ff);-webkit-background-clip:text;
  background-clip:text;color:transparent}
.sep{width:10px;text-align:center;color:rgba(233,237,255,.3);line-height:50px}
`,
html:`<button class="replay" id="re">&#8635;</button>
<div class="odo" id="odo"></div>`,
js:`
const odo=$('odo');
function build(v){
  const s=String(v).padStart(6,'0');
  odo.innerHTML='';
  [...s].forEach((d,i)=>{
    if(i===3){ const sep=document.createElement('span'); sep.className='sep';
      sep.textContent=','; odo.appendChild(sep); }
    const box=document.createElement('div'); box.className='dig';
    const ul=document.createElement('ul');
    for(let n=0;n<=10;n++){ const li=document.createElement('li'); li.textContent=n%10; ul.appendChild(li); }
    box.appendChild(ul); odo.appendChild(box);
    requestAnimationFrame(()=>{
      ul.style.transitionDelay=(i*70)+'ms';
      ul.style.transform='translateY('+(-(+d)*50)+'px)';
    });
  });
}
function run(){ build(Math.floor(120000+Math.random()*760000)); }
$('re').addEventListener('click',run);
run();
`
},
{
slug:'magnetic-letters', title:'Magnetic Letters', c:'#ff9ee0',
desc:'Every letter pushes away from your cursor and grows as it flees, snapping back once you are 90px out.',
note:'Displacement scales with <b>1 &minus; distance/90</b>, so the falloff is smooth.',
css:`
.t{font-size:clamp(28px,8vw,38px);font-weight:750;letter-spacing:-.03em;cursor:default;
  text-align:center}
.t span{display:inline-block;transition:transform .4s cubic-bezier(.2,1.3,.3,1),color .4s}
.field{padding:34px;margin:-34px}
`,
html:`<div class="field" id="field"><span class="t" id="t" data-text="MAGNETIC"></span></div>`,
js:`
const t=$('t'), field=$('field');
[...t.dataset.text].forEach(ch=>{
  const s=document.createElement('span');
  s.textContent = ch===' ' ? '\\u00A0' : ch;
  t.appendChild(s);
});
const letters=[...t.children];
field.addEventListener('pointermove',e=>{
  if(reduce) return;
  letters.forEach(s=>{
    const b=s.getBoundingClientRect();
    const dx=e.clientX-(b.left+b.width/2), dy=e.clientY-(b.top+b.height/2);
    const d=Math.hypot(dx,dy) || 1;
    if(d<90){
      const f=(1-d/90)*28;
      s.style.transform='translate('+(-dx/d*f)+'px,'+(-dy/d*f)+'px) scale('+(1+(1-d/90)*.38)+')';
      s.style.color='#ff9ee0';
    }else{ s.style.transform=''; s.style.color=''; }
  });
});
field.addEventListener('pointerleave',()=>
  letters.forEach(s=>{ s.style.transform=''; s.style.color=''; }));
`
},
{
slug:'outline-fill', title:'Outline to Fill', c:'#ffd23d',
desc:'Hollow stroked type that floods with colour from the left when you hover it.',
note:'A registered <b>--sweep</b> percentage animates the clip-path &mdash; plain clip-path will not transition.',
css:`
@property --sweep{syntax:'<percentage>';inherits:false;initial-value:0%}
.t{position:relative;font:800 clamp(28px,8vw,40px)/1 ui-sans-serif,system-ui;letter-spacing:-.03em;
  color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.5);cursor:default}
.t::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;
  color:#ffd23d;-webkit-text-stroke:0;
  clip-path:inset(0 calc(100% - var(--sweep)) 0 0);transition:--sweep .75s cubic-bezier(.4,1,.3,1)}
.t:hover::after{--sweep:100%}
`,
html:`<span class="t" data-t="FILL ME">FILL ME</span>`,
js:``
},
{
slug:'flip-letters', title:'3D Letter Flip', c:'#a06bff',
desc:'Hover and every character rolls a full turn on the X axis, one after another.',
note:'A full <b>360&deg;</b> so the letter lands the right way up with no flash.',
css:`
.t{font-size:clamp(26px,7vw,36px);font-weight:750;letter-spacing:-.02em;perspective:700px;
  cursor:default;text-align:center}
.t span{display:inline-block;transform-style:preserve-3d;
  transition:transform .6s cubic-bezier(.3,1.2,.3,1)}
.t:hover span{transform:rotateX(360deg)}
`,
html:`<span class="t" id="t" data-text="ROTATE"></span>`,
js:`
const t=$('t');
[...t.dataset.text].forEach((ch,i)=>{
  const s=document.createElement('span');
  s.textContent = ch===' ' ? '\\u00A0' : ch;
  s.style.transitionDelay=(i*55)+'ms';
  t.appendChild(s);
});
`
},
{
slug:'neon-flicker', title:'Neon Flicker', c:'#31e0ff',
desc:'Four stacked text-shadows build the tube and the halo; an irregular keyframe makes the gas stutter.',
note:'Flicker steps are deliberately uneven &mdash; a regular pulse reads as a loading state.',
css:`
.t{font:700 clamp(26px,7vw,34px)/1 ui-sans-serif,system-ui;letter-spacing:.05em;color:#fff;
  text-align:center;
  text-shadow:0 0 7px #31e0ff,0 0 18px #31e0ff,0 0 42px #0088ff,0 0 84px #0055ff;
  animation:flick 4.5s infinite}
@keyframes flick{0%,17%,19%,21%,54%,56%,100%{opacity:1}18%,20%,55%{opacity:.35}}
`,
html:`<span class="t">NIGHT SHIFT</span>`,
js:``
},
{
slug:'spotlight-text', title:'Spotlight Text', c:'#ffd23d',
desc:'The type sits at 14% opacity until your cursor drags a pool of colour across it.',
note:'A duplicate layer painted with a radial gradient and clipped to the glyphs.',
css:`
.t{font:800 clamp(28px,8vw,38px)/1 ui-sans-serif,system-ui;letter-spacing:-.03em;
  color:rgba(255,255,255,.14);position:relative;cursor:crosshair;text-align:center}
.t::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;
  background:radial-gradient(100px 66px at var(--x,50%) var(--y,50%),#ffd23d,#ff2fb3 55%,transparent 72%);
  -webkit-background-clip:text;background-clip:text;color:transparent}
`,
html:`<span class="t" id="t" data-t="SPOTLIGHT">SPOTLIGHT</span>`,
js:`
const t=$('t');
t.addEventListener('pointermove',e=>{
  const b=t.getBoundingClientRect();
  t.style.setProperty('--x',((e.clientX-b.left)/b.width*100)+'%');
  t.style.setProperty('--y',((e.clientY-b.top)/b.height*100)+'%');
});
`
},
{
slug:'decrypt-lines', title:'Line Decrypt', c:'#4dffcf',
desc:'A terminal boot sequence: each line types out behind a flickering cipher character, then the next one starts.',
note:'The cursor glyph is a random character, not a block &mdash; it reads as decoding.',
css:RE+`
.t{font:600 14.5px/1.85 ui-monospace,Menlo,monospace;color:rgba(233,237,255,.86);text-align:left;
  width:100%;max-width:300px;margin:0 auto}
.t i{font-style:normal;color:#4dffcf}
`,
html:`<button class="replay" id="re">&#8635;</button>
<div class="t" id="t"></div>`,
js:`
const CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%$@*/<>';
const LINES=['> establishing uplink','> handshake ok','> streaming futura.lab','> ready'];
const t=$('t');
function run(){
  t.innerHTML=''; let li=0;
  (function nextLine(){
    if(li>=LINES.length) return;
    const full=LINES[li], row=document.createElement('div');
    t.appendChild(row);
    let i=0;
    const id=setInterval(()=>{
      row.innerHTML = full.slice(0,i) +
        '<i>' + (i<full.length ? CH[Math.floor(Math.random()*CH.length)] : '') + '</i>';
      if(i++>=full.length){ clearInterval(id); row.textContent=full; li++; setTimeout(nextLine,150); }
    }, reduce?1:26);
  })();
}
$('re').addEventListener('click',run);
run();
`
}
];
