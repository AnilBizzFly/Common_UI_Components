const MSG = `
.msg{min-height:17px;margin-top:8px;font:500 11.5px/1.35 ui-sans-serif,system-ui;color:#ff8a9c;
  opacity:0;transition:opacity .2s}
.msg[data-show]{opacity:1}
`;

export const forms = [
{
slug:'floating-label', title:'Floating Label', c:'#31e0ff', demo:'block',
desc:'The placeholder becomes the label, and a gradient beam draws across the base of the field on focus.',
note:'Pure CSS &mdash; driven by <b>:not(:placeholder-shown)</b>, no JS at all.',
css:`
.ff{position:relative;margin-bottom:12px}
.ff input{width:100%;padding:23px 15px 10px;border-radius:14px;font:inherit;font-size:15px;
  color:#fff;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);outline:none;
  transition:border-color .25s,background .25s}
.ff input:focus{background:rgba(255,255,255,.08)}
.ff label{position:absolute;left:15px;top:18px;font-size:14.5px;color:rgba(233,237,255,.4);
  pointer-events:none;transform-origin:left top;
  transition:transform .3s cubic-bezier(.3,1.2,.4,1),color .3s}
.ff input:focus + label,.ff input:not(:placeholder-shown) + label{
  transform:translateY(-10px) scale(.72);color:var(--c)}
.ff .beam{position:absolute;left:13px;right:13px;bottom:0;height:2px;border-radius:2px;
  background:linear-gradient(90deg,var(--c),#a06bff);transform:scaleX(0);
  transition:transform .42s cubic-bezier(.3,1.1,.3,1)}
.ff input:focus ~ .beam{transform:scaleX(1)}
`,
html:`<div class="ff"><input id="a" placeholder=" "><label for="a">Full name</label><span class="beam"></span></div>
<div class="ff"><input id="b" placeholder=" " value="Reykjav&iacute;k"><label for="b">City</label><span class="beam"></span></div>
<div class="ff" style="margin:0"><input id="c" placeholder=" "><label for="c">Studio URL</label><span class="beam"></span></div>`,
js:``
},
{
slug:'live-validation', title:'Live Validation', c:'#4dffcf', demo:'block',
desc:'Checks the address on every keystroke and swaps a tick or a cross in, with the reason underneath.',
note:'Empty is neutral &mdash; it only judges you once you have typed something.',
css:MSG+`
.vf{position:relative}
.vf input{width:100%;padding:17px 48px 17px 46px;border-radius:14px;font:inherit;font-size:14.5px;
  color:#fff;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);outline:none;
  transition:border-color .25s,box-shadow .25s}
.vf input:focus{border-color:color-mix(in srgb,var(--c) 60%,transparent);
  box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 14%,transparent)}
.vf > svg{position:absolute;left:16px;top:50%;margin-top:-8px;width:17px;height:17px;
  stroke:rgba(233,237,255,.35);fill:none;stroke-width:1.9}
.vf .mark{position:absolute;right:16px;top:50%;margin-top:-9px;width:19px;height:19px;opacity:0;
  transform:scale(.5);transition:.3s cubic-bezier(.2,1.6,.4,1)}
.vf[data-v="ok"] .mark.ok,.vf[data-v="bad"] .mark.bad{opacity:1;transform:scale(1)}
.vf[data-v="ok"] input{border-color:#4dffcf}
.vf[data-v="bad"] input{border-color:#ff5e79}
.mark svg{width:19px;height:19px;fill:none;stroke-width:2.6;stroke-linecap:round}
.mark.ok svg{stroke:#4dffcf}.mark.bad svg{stroke:#ff5e79}
`,
html:`<div class="vf" id="vf">
  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/></svg>
  <input id="email" placeholder="you@studio.com" autocomplete="off">
  <span class="mark ok"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>
  <span class="mark bad"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
</div>
<div class="msg" id="msg"></div>`,
js:`
const email=$('email'), vf=$('vf'), msg=$('msg');
email.addEventListener('input',()=>{
  const v=email.value.trim();
  if(!v){ vf.removeAttribute('data-v'); msg.removeAttribute('data-show'); return; }
  const ok=/^[^\\s@]+@[^\\s@]+\\.[a-z]{2,}$/i.test(v);
  vf.dataset.v = ok?'ok':'bad';
  msg.textContent = ok ? '' : 'That is not a complete address yet.';
  msg.toggleAttribute('data-show',!ok);
});
`
},
{
slug:'password-strength', title:'Password Strength', c:'#ffd23d', demo:'block',
desc:'Four segments scored on length and character variety, with a reveal toggle that keeps focus in the field.',
note:'Score = length&nbsp;&ge;8, mixed case, a digit, a symbol at 10+ characters.',
css:`
.pw{position:relative}
.pw input{width:100%;padding:17px 50px 17px 15px;border-radius:14px;font:inherit;font-size:14.5px;
  color:#fff;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);outline:none;
  font-family:ui-monospace,Menlo,monospace;letter-spacing:.1em}
.pw input:focus{border-color:color-mix(in srgb,var(--c) 55%,transparent)}
.pw .eye{position:absolute;right:9px;top:50%;margin-top:-17px;width:34px;height:34px;border:0;
  background:none;cursor:pointer;color:rgba(233,237,255,.45);display:grid;place-items:center;
  border-radius:9px;transition:.2s}
.pw .eye:hover{color:#fff;background:rgba(255,255,255,.09)}
.pw .eye svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9}
.bars{display:flex;gap:6px;margin-top:13px}
.bars i{flex:1;height:5px;border-radius:99px;background:rgba(255,255,255,.1);transition:background .35s}
.lab{margin-top:10px;font:600 11px/1 ui-monospace,monospace;letter-spacing:.16em;
  text-transform:uppercase;color:rgba(233,237,255,.4);transition:color .3s}
`,
html:`<div class="pw">
  <input id="pass" type="password" placeholder="Choose a password">
  <button class="eye" id="eye" aria-label="show password">
    <svg viewBox="0 0 24 24"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
  </button>
</div>
<div class="bars"><i></i><i></i><i></i><i></i></div>
<div class="lab" id="lab">enter a password</div>`,
js:`
const pass=$('pass'), bars=document.querySelectorAll('.bars i'), lab=$('lab');
const TONE=['#ff5e79','#ff9a4d','#ffd23d','#4dffcf'], WORD=['too short','weak','decent','strong'];
pass.addEventListener('input',()=>{
  const v=pass.value; let s=0;
  if(v.length>=8) s++;
  if(/[a-z]/.test(v)&&/[A-Z]/.test(v)) s++;
  if(/[0-9]/.test(v)) s++;
  if(/[^A-Za-z0-9]/.test(v)&&v.length>=10) s++;
  if(!v.length) s=-1;
  bars.forEach((b,i)=>b.style.background = i<=s-1 ? TONE[s-1] : 'rgba(255,255,255,.1)');
  lab.textContent = s<0 ? 'enter a password' : WORD[Math.max(0,s-1)];
  lab.style.color = s<=0 ? 'rgba(233,237,255,.4)' : TONE[s-1];
});
$('eye').addEventListener('click',()=>{
  pass.type = pass.type==='password' ? 'text' : 'password'; pass.focus();
});
`
},
{
slug:'otp', title:'OTP Field', c:'#7c5cff', demo:'block',
desc:'Six boxes that auto-advance, walk backwards on delete, accept a pasted code, and shake when it is wrong.',
note:'The code is <b>428910</b>. Paste it whole &mdash; it distributes across the boxes.',
css:`
.otp{display:flex;gap:9px;justify-content:space-between}
.otp input{width:100%;aspect-ratio:1/1.15;min-width:0;text-align:center;border-radius:14px;
  font:650 22px/1 ui-monospace,Menlo,monospace;color:#fff;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);outline:none;caret-color:var(--c);
  transition:border-color .2s,transform .25s cubic-bezier(.2,1.6,.4,1),box-shadow .2s,background .3s}
.otp input:focus{border-color:var(--c);transform:translateY(-4px);
  box-shadow:0 10px 24px -10px var(--c)}
.otp input:not(:placeholder-shown){border-color:rgba(77,255,207,.5);background:rgba(77,255,207,.08)}
[data-otp="bad"] .otp{animation:shake .36s}
[data-otp="ok"] .otp input{border-color:#4dffcf;background:rgba(77,255,207,.16)}
@keyframes shake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
.hint{margin-top:12px;font:500 11.5px/1.4 ui-monospace,monospace;color:rgba(233,237,255,.4);
  text-align:center}
`,
html:`<div id="cell">
  <div class="otp" id="otp">
    <input maxlength="1" inputmode="numeric" placeholder=" ">
    <input maxlength="1" inputmode="numeric" placeholder=" ">
    <input maxlength="1" inputmode="numeric" placeholder=" ">
    <input maxlength="1" inputmode="numeric" placeholder=" ">
    <input maxlength="1" inputmode="numeric" placeholder=" ">
    <input maxlength="1" inputmode="numeric" placeholder=" ">
  </div>
  <div class="hint" id="hint">enter the 6-digit code</div>
</div>`,
js:`
const cell=$('cell'), hint=$('hint');
const box=[...$('otp').querySelectorAll('input')];
box.forEach((el,i)=>{
  el.addEventListener('input',()=>{
    el.value=el.value.replace(/[^0-9]/g,'').slice(0,1);
    if(el.value && i<box.length-1) box[i+1].focus();
    check();
  });
  el.addEventListener('keydown',e=>{
    if(e.key==='Backspace' && !el.value && i>0){ box[i-1].focus(); box[i-1].value=''; check(); }
    if(e.key==='ArrowLeft' && i>0) box[i-1].focus();
    if(e.key==='ArrowRight' && i<box.length-1) box[i+1].focus();
  });
  el.addEventListener('paste',e=>{
    e.preventDefault();
    const d=(e.clipboardData.getData('text')||'').replace(/[^0-9]/g,'').split('');
    box.forEach((x,n)=>x.value=d[n]||'');
    box[Math.min(d.length,5)].focus(); check();
  });
});
function check(){
  const code=box.map(x=>x.value).join('');
  cell.removeAttribute('data-otp');
  if(code.length<6){ hint.textContent='enter the 6-digit code';
    hint.style.color='rgba(233,237,255,.4)'; return; }
  if(code==='428910'){ cell.dataset.otp='ok'; hint.textContent='Verified'; hint.style.color='#4dffcf'; }
  else{
    cell.dataset.otp='bad'; hint.textContent='Wrong code'; hint.style.color='#ff8a9c';
    setTimeout(()=>{ box.forEach(x=>x.value=''); box[0].focus();
      cell.removeAttribute('data-otp'); },750);
  }
}
box[0].focus();
`
},
{
slug:'search-highlight', title:'Search + Highlight', c:'#8ee7ff', demo:'block',
desc:'Filters as you type and marks the matched substring inside each result, with a clear button that appears only when needed.',
note:'Results stagger in at <b>35ms</b> intervals so the list feels assembled, not dumped.',
css:`
.sb{position:relative;display:flex;align-items:center;gap:10px;padding:15px 16px;border-radius:14px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);transition:.25s}
.sb:focus-within{border-color:var(--c);box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 14%,transparent)}
.sb svg{width:17px;height:17px;stroke:rgba(233,237,255,.4);fill:none;stroke-width:2;flex:none}
.sb input{flex:1;min-width:0;border:0;background:none;outline:none;color:#fff;font:inherit;font-size:14.5px}
.sb .clr{border:0;background:rgba(255,255,255,.1);color:#fff;width:22px;height:22px;border-radius:50%;
  cursor:pointer;font-size:13px;line-height:1;opacity:0;pointer-events:none;transition:.2s}
.sb[data-has] .clr{opacity:1;pointer-events:auto}
.hits{margin-top:12px;display:flex;flex-direction:column;gap:7px;max-height:180px;overflow-y:auto}
.hit{padding:11px 13px;border-radius:12px;background:rgba(255,255,255,.04);font-size:13.5px;
  border:1px solid rgba(255,255,255,.06);animation:fade .32s both}
.hit b{color:var(--c);font-weight:700}
@keyframes fade{from{opacity:0;transform:translateY(7px)}}
`,
html:`<div class="sb" id="sb">
  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
  <input id="q" placeholder="Search components&hellip;" autocomplete="off">
  <button class="clr" id="clr" aria-label="clear">&times;</button>
</div>
<div class="hits" id="hits"></div>`,
js:`
const DATA=['Magnetic button','Gooey split','Liquid fill','Border beam','Glass card','Spotlight card',
  'Text scramble','Odometer counter','Marquee strip','OTP field','Dropzone','Combobox','Stepper',
  'Rating stars','Swipe deck','Tag input'];
const q=$('q'), hits=$('hits'), sb=$('sb');
function search(){
  const s=q.value.trim().toLowerCase();
  sb.toggleAttribute('data-has',!!s);
  const list=(s?DATA.filter(d=>d.toLowerCase().includes(s)):DATA).slice(0,7);
  hits.innerHTML = list.length ? list.map((d,i)=>{
    const at=d.toLowerCase().indexOf(s);
    const html = s&&at>=0 ? d.slice(0,at)+'<b>'+d.slice(at,at+s.length)+'</b>'+d.slice(at+s.length) : d;
    return '<div class="hit" style="animation-delay:'+(i*35)+'ms">'+html+'</div>';
  }).join('') : '<div class="hit">No match</div>';
}
q.addEventListener('input',search);
$('clr').addEventListener('click',()=>{ q.value=''; q.focus(); search(); });
search();
`
},
{
slug:'range-bubble', title:'Range + Bubble', c:'#a06bff', demo:'block',
desc:'The value rides above the thumb and the track fills behind it, nudged at the ends so it never overhangs.',
note:'Fill is a <b>background-size</b> animation, not a second element.',
css:`
.rng{position:relative;padding-top:38px}
.rng input{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:99px;outline:none;
  background:linear-gradient(90deg,var(--c),#31e0ff) no-repeat,rgba(255,255,255,.1);
  background-size:var(--p,50%) 100%}
.rng input::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;
  background:#fff;cursor:grab;
  box-shadow:0 0 0 5px color-mix(in srgb,var(--c) 24%,transparent),0 3px 12px #000;
  transition:transform .2s}
.rng input:active::-webkit-slider-thumb{transform:scale(1.18);cursor:grabbing}
.rng input::-moz-range-thumb{width:22px;height:22px;border:0;border-radius:50%;background:#fff;cursor:grab}
.bub{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:6px 11px;border-radius:10px;
  background:linear-gradient(130deg,var(--c),#31e0ff);color:#07080f;
  font:700 13px/1 ui-monospace,monospace;white-space:nowrap;transition:left .06s linear}
.bub::after{content:"";position:absolute;left:50%;bottom:-4px;width:9px;height:9px;margin-left:-4.5px;
  background:#31e0ff;transform:rotate(45deg)}
.legend{display:flex;justify-content:space-between;margin-top:14px;
  font:600 10px/1 ui-monospace,monospace;letter-spacing:.14em;color:rgba(233,237,255,.32)}
`,
html:`<div class="rng"><span class="bub" id="bub">64</span>
  <input id="range" type="range" min="0" max="100" value="64">
</div>
<div class="legend"><span>0</span><span>QUALITY</span><span>100</span></div>`,
js:`
const range=$('range'), bub=$('bub');
function paint(){
  const p=(range.value-range.min)/(range.max-range.min)*100;
  range.style.setProperty('--p',p+'%');
  bub.style.left='calc('+p+'% + '+(11-p*0.22)+'px)';
  bub.textContent=range.value;
}
range.addEventListener('input',paint); paint();
`
},
{
slug:'switches', title:'Switch Trio', c:'#4dffcf', demo:'block',
desc:'Three takes on the same control: a pill that stretches as it travels, a square one, and a neon one that lights its own housing.',
note:'The stretch is <b>:active</b> widening the knob before it lands.',
css:`
.sws{display:flex;flex-direction:column;gap:20px}
.sw{display:flex;align-items:center;justify-content:space-between;gap:14px}
.sw span{font-size:14px;color:rgba(233,237,255,.72)}
.t1{position:relative;width:54px;height:30px;border:0;padding:0;cursor:pointer;border-radius:99px;
  background:rgba(255,255,255,.12);transition:background .3s}
.t1::after{content:"";position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;
  background:#fff;transition:transform .36s cubic-bezier(.3,1.5,.4,1),width .25s}
.t1:active::after{width:31px}
.t1[aria-pressed="true"]{background:linear-gradient(90deg,#4dffcf,#31e0ff)}
.t1[aria-pressed="true"]::after{transform:translateX(24px)}
.t1:active[aria-pressed="true"]::after{transform:translateX(17px)}
.t2{position:relative;width:54px;height:30px;border:1.5px solid rgba(255,255,255,.2);padding:0;
  cursor:pointer;border-radius:9px;background:transparent;transition:.3s;overflow:hidden}
.t2::after{content:"";position:absolute;top:3px;left:3px;width:21px;height:21px;border-radius:6px;
  background:rgba(255,255,255,.5);
  transition:transform .34s cubic-bezier(.3,1.5,.4,1),background .3s}
.t2[aria-pressed="true"]{border-color:#4dffcf;box-shadow:0 0 18px -4px #4dffcf inset}
.t2[aria-pressed="true"]::after{transform:translateX(24px);background:#4dffcf}
.t3{position:relative;width:54px;height:30px;border:0;padding:0;cursor:pointer;border-radius:99px;
  background:#20122a;transition:background .4s}
.t3::before{content:"";position:absolute;inset:0;border-radius:99px;opacity:0;transition:opacity .4s;
  background:radial-gradient(circle at 76% 50%,#ff2fb3,transparent 60%)}
.t3::after{content:"";position:absolute;top:4px;left:4px;width:22px;height:22px;border-radius:50%;
  background:#6a5b7a;box-shadow:0 0 0 0 #ff2fb3;
  transition:transform .4s cubic-bezier(.3,1.5,.4,1),background .4s,box-shadow .4s}
.t3[aria-pressed="true"]::before{opacity:1}
.t3[aria-pressed="true"]::after{transform:translateX(24px);background:#fff;box-shadow:0 0 20px 2px #ff2fb3}
`,
html:`<div class="sws">
  <div class="sw"><span>Pill &mdash; stretches while it travels</span><button class="t1" aria-pressed="true"></button></div>
  <div class="sw"><span>Square &mdash; lights its border</span><button class="t2" aria-pressed="false"></button></div>
  <div class="sw"><span>Neon &mdash; glows through the housing</span><button class="t3" aria-pressed="true"></button></div>
</div>`,
js:`
document.querySelectorAll('.t1,.t2,.t3').forEach(b=>b.addEventListener('click',()=>
  b.setAttribute('aria-pressed', b.getAttribute('aria-pressed')==='true'?'false':'true')));
`
},
{
slug:'check-radio', title:'Check &amp; Radio', c:'#7c5cff', demo:'block',
desc:'The tick draws itself with a dash offset, and the radios are pills that invert when chosen.',
note:'Real <b>&lt;input&gt;</b> elements underneath &mdash; keyboard and labels still work.',
css:`
.opts{display:flex;flex-direction:column;gap:16px}
.cb{display:flex;align-items:center;gap:13px;cursor:pointer;font-size:14px;color:rgba(233,237,255,.78)}
.cb input{position:absolute;opacity:0;pointer-events:none}
.cb .box{width:24px;height:24px;border-radius:8px;border:1.7px solid rgba(255,255,255,.22);
  display:grid;place-items:center;transition:.28s cubic-bezier(.3,1.4,.4,1);flex:none}
.cb .box svg{width:14px;height:14px;fill:none;stroke:#07080f;stroke-width:3.2;stroke-linecap:round;
  stroke-linejoin:round;stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset .3s}
.cb input:checked + .box{background:linear-gradient(130deg,#7c5cff,#31e0ff);border-color:transparent;
  transform:scale(1.07)}
.cb input:checked + .box svg{stroke-dashoffset:0}
.cb input:focus-visible + .box{box-shadow:0 0 0 4px rgba(124,92,255,.3)}
.radios{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.rp{position:relative;cursor:pointer}
.rp input{position:absolute;opacity:0}
.rp span{display:block;padding:11px 17px;border-radius:99px;font:600 13px/1 ui-sans-serif,system-ui;
  color:rgba(233,237,255,.55);background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);transition:.25s}
.rp input:checked + span{color:#07080f;background:linear-gradient(130deg,#fff,#c9d4ff);
  border-color:transparent;box-shadow:0 8px 20px -10px #fff}
`,
html:`<div class="opts">
  <label class="cb"><input type="checkbox" checked><span class="box"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>Ship with source maps</label>
  <label class="cb"><input type="checkbox"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>Minify the output bundle</label>
  <label class="cb"><input type="checkbox"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>Upload sourcemaps to Sentry</label>
  <div class="radios">
    <label class="rp"><input type="radio" name="pl" checked><span>Web</span></label>
    <label class="rp"><input type="radio" name="pl"><span>iOS</span></label>
    <label class="rp"><input type="radio" name="pl"><span>Android</span></label>
  </div>
</div>`,
js:``
},
{
slug:'combobox', title:'Combobox', c:'#31e0ff', demo:'block',
desc:'Type to filter, arrow through the list, Enter to commit, Escape to dismiss &mdash; the keyboard path is the primary one.',
note:'Highlight index survives filtering; it clamps instead of going out of range.',
css:`
.cbx{position:relative}
.sb{display:flex;align-items:center;gap:10px;padding:15px 16px;border-radius:14px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);transition:.25s}
.cbx[data-open] .sb{border-color:var(--c);box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 13%,transparent)}
.sb svg{width:16px;height:16px;stroke:rgba(233,237,255,.4);fill:none;stroke-width:2;flex:none;
  transition:transform .3s}
.cbx[data-open] .sb svg{transform:rotate(180deg)}
.sb input{flex:1;min-width:0;border:0;background:none;outline:none;color:#fff;font:inherit;font-size:14.5px}
.list{position:absolute;left:0;right:0;top:calc(100% + 8px);z-index:9;padding:7px;border-radius:15px;
  background:#101324;border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 60px -22px #000;
  max-height:200px;overflow-y:auto;opacity:0;visibility:hidden;transform:translateY(-8px) scale(.98);
  transform-origin:top;transition:.25s cubic-bezier(.3,1.1,.3,1)}
.cbx[data-open] .list{opacity:1;visibility:visible;transform:none}
.list button{display:flex;align-items:center;gap:10px;width:100%;border:0;background:none;
  color:#dfe5ff;font:inherit;font-size:14px;text-align:left;padding:10px 11px;border-radius:11px;
  cursor:pointer;transition:background .15s}
.list button:hover,.list button[data-hi]{background:color-mix(in srgb,var(--c) 26%,transparent)}
.list i{width:8px;height:8px;border-radius:50%;flex:none}
`,
html:`<div class="cbx" id="cbx">
  <div class="sb">
    <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
    <input id="in" placeholder="Pick a framework&hellip;" autocomplete="off">
  </div>
  <div class="list" id="list"></div>
</div>`,
js:`
const FW=[['React','#61dafb'],['Svelte','#ff3e00'],['Vue','#42b883'],['Solid','#4f88c6'],
          ['Qwik','#ac7ef4'],['Astro','#ff5d01'],['Lit','#325cff'],['Preact','#673ab8']];
const cbx=$('cbx'), input=$('in'), list=$('list'); let hi=0;
function draw(){
  const q=input.value.trim().toLowerCase();
  const items=FW.filter(f=>f[0].toLowerCase().includes(q));
  hi=Math.min(hi,Math.max(0,items.length-1));
  list.innerHTML = items.length
    ? items.map((f,i)=>'<button data-v="'+f[0]+'"'+(i===hi?' data-hi':'')+
        '><i style="background:'+f[1]+'"></i>'+f[0]+'</button>').join('')
    : '<button disabled style="opacity:.4">Nothing matches</button>';
  [...list.querySelectorAll('button[data-v]')].forEach(b=>
    b.addEventListener('click',()=>{ input.value=b.dataset.v; cbx.removeAttribute('data-open'); }));
}
input.addEventListener('focus',()=>{ cbx.setAttribute('data-open',''); draw(); });
input.addEventListener('input',()=>{ hi=0; draw(); });
input.addEventListener('blur',()=>setTimeout(()=>cbx.removeAttribute('data-open'),150));
input.addEventListener('keydown',e=>{
  const n=list.querySelectorAll('button[data-v]').length; if(!n) return;
  if(e.key==='ArrowDown'){ e.preventDefault(); hi=(hi+1)%n; draw(); }
  if(e.key==='ArrowUp'){ e.preventDefault(); hi=(hi-1+n)%n; draw(); }
  if(e.key==='Enter'){ const b=list.querySelector('button[data-hi]');
    if(b){ input.value=b.dataset.v; cbx.removeAttribute('data-open'); input.blur(); } }
  if(e.key==='Escape') cbx.removeAttribute('data-open');
});
draw();
`
},
{
slug:'tag-input', title:'Tag Input', c:'#ff9ee0', demo:'block',
desc:'Enter or comma commits a tag, backspace on an empty field eats the last one, and every chip has its own remove.',
note:'Duplicates are rejected silently &mdash; the field just clears.',
css:`
.tags{display:flex;flex-wrap:wrap;gap:7px;padding:11px;border-radius:14px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);cursor:text;transition:.25s;
  min-height:58px;align-items:center}
.tags:focus-within{border-color:var(--c);box-shadow:0 0 0 4px color-mix(in srgb,var(--c) 13%,transparent)}
.tag{display:flex;align-items:center;gap:7px;padding:8px 9px 8px 13px;border-radius:10px;
  font:600 12.5px/1 ui-sans-serif,system-ui;color:#07080f;
  background:linear-gradient(130deg,#fff,#ffd2ef);animation:pop .3s cubic-bezier(.2,1.5,.4,1)}
.tag button{border:0;background:rgba(0,0,0,.18);color:#07080f;width:16px;height:16px;border-radius:50%;
  cursor:pointer;font-size:11px;line-height:1;display:grid;place-items:center}
@keyframes pop{from{opacity:0;transform:scale(.7)}}
.tags input{flex:1;min-width:90px;border:0;background:none;outline:none;color:#fff;font:inherit;
  font-size:14px;padding:7px 4px}
.count{margin-top:10px;font:600 10.5px/1 ui-monospace,monospace;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(233,237,255,.3)}
`,
html:`<div class="tags" id="box"><input id="in" placeholder="Add a tag, press Enter"></div>
<div class="count" id="count"></div>`,
js:`
const box=$('box'), input=$('in'), count=$('count');
let tags=['motion','glass','tokens'];
function draw(){
  [...box.querySelectorAll('.tag')].forEach(t=>t.remove());
  tags.forEach((t,i)=>{
    const el=document.createElement('span'); el.className='tag';
    el.innerHTML=t+'<button aria-label="remove">&times;</button>';
    el.querySelector('button').addEventListener('click',()=>{ tags.splice(i,1); draw(); });
    box.insertBefore(el,input);
  });
  count.textContent=tags.length+' tag'+(tags.length===1?'':'s');
}
input.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key===','){
    e.preventDefault();
    const v=input.value.trim().replace(/,/g,'');
    if(v && !tags.includes(v)){ tags.push(v); draw(); }
    input.value='';
  }
  if(e.key==='Backspace' && !input.value && tags.length){ tags.pop(); draw(); }
});
box.addEventListener('click',()=>input.focus());
draw();
`
},
{
slug:'dropzone', title:'Dropzone', c:'#4dffcf', demo:'block',
desc:'Real drag-and-drop with a live hover state, a file picker fallback, and a progress bar per file.',
note:'Reads name and size off the actual <b>File</b> objects &mdash; nothing is uploaded anywhere.',
css:`
.dz{position:relative;border-radius:18px;padding:32px 18px;text-align:center;cursor:pointer;
  border:1.7px dashed rgba(255,255,255,.18);background:rgba(255,255,255,.03);transition:.3s}
.dz[data-over]{border-color:var(--c);background:color-mix(in srgb,var(--c) 12%,transparent);
  transform:scale(1.015)}
.dz svg{width:34px;height:34px;stroke:var(--c);fill:none;stroke-width:1.7;stroke-linecap:round;
  stroke-linejoin:round;transition:transform .35s cubic-bezier(.2,1.5,.4,1)}
.dz[data-over] svg{transform:translateY(-6px) scale(1.14)}
.dz p{margin:11px 0 0;font-size:13.5px;color:rgba(233,237,255,.55)}
.dz p b{color:#fff;font-weight:600}
.files{margin-top:12px;display:flex;flex-direction:column;gap:8px}
.file{padding:11px 13px;border-radius:12px;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.07);font-size:13px;animation:fade .3s both;position:relative;
  overflow:hidden}
.file .pr{position:absolute;left:0;bottom:0;height:2.5px;width:0%;
  background:linear-gradient(90deg,var(--c),#31e0ff);transition:width .2s linear}
.file small{float:right;color:rgba(233,237,255,.4);font-family:ui-monospace,monospace;font-size:11px}
@keyframes fade{from{opacity:0;transform:translateY(7px)}}
`,
html:`<div class="dz" id="dz">
  <svg viewBox="0 0 24 24"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"/></svg>
  <p><b>Drop files here</b> or click to browse</p>
  <input type="file" id="pick" multiple hidden>
</div>
<div class="files" id="files"></div>`,
js:`
const dz=$('dz'), pick=$('pick'), files=$('files');
['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{
  e.preventDefault(); dz.setAttribute('data-over',''); }));
['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{
  e.preventDefault(); dz.removeAttribute('data-over'); }));
dz.addEventListener('drop',e=>add([...e.dataTransfer.files]));
dz.addEventListener('click',()=>pick.click());
pick.addEventListener('change',()=>add([...pick.files]));
function add(list){
  list.slice(0,5).forEach(f=>{
    const el=document.createElement('div'); el.className='file';
    el.innerHTML=f.name.slice(0,30)+'<small>'+(f.size/1024).toFixed(0)+' KB</small><span class="pr"></span>';
    files.appendChild(el);
    const pr=el.querySelector('.pr'); let p=0;
    const id=setInterval(()=>{
      p=Math.min(100,p+6+Math.random()*13); pr.style.width=p+'%';
      if(p>=100){ clearInterval(id); pr.style.background='#4dffcf'; }
    }, reduce?20:85);
  });
}
`
},
{
slug:'autogrow-textarea', title:'Auto-grow Textarea', c:'#8ee7ff', demo:'block',
desc:'Grows to fit what you write, counts down against the limit, and turns amber as you approach it.',
note:'Height reset to <b>auto</b> before reading scrollHeight, or it never shrinks.',
css:`
.ff{position:relative}
.ff textarea{width:100%;padding:24px 15px 12px;border-radius:14px;font:inherit;font-size:14.5px;
  line-height:1.55;color:#fff;background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);outline:none;resize:none;min-height:96px;overflow:hidden;
  transition:border-color .25s,background .25s}
.ff textarea:focus{background:rgba(255,255,255,.08)}
.ff label{position:absolute;left:15px;top:19px;font-size:14.5px;color:rgba(233,237,255,.4);
  pointer-events:none;transform-origin:left top;transition:transform .3s cubic-bezier(.3,1.2,.4,1),color .3s}
.ff textarea:focus + label,.ff textarea:not(:placeholder-shown) + label{
  transform:translateY(-11px) scale(.72);color:var(--c)}
.ff .beam{position:absolute;left:13px;right:13px;bottom:0;height:2px;border-radius:2px;
  background:linear-gradient(90deg,var(--c),#a06bff);transform:scaleX(0);
  transition:transform .42s cubic-bezier(.3,1.1,.3,1)}
.ff textarea:focus ~ .beam{transform:scaleX(1)}
.count{margin-top:9px;text-align:right;font:600 11px/1 ui-monospace,monospace;
  color:rgba(233,237,255,.35);transition:color .3s}
.count[data-warn]{color:#ffd23d}
.count[data-max]{color:#ff8a9c}
`,
html:`<div class="ff">
  <textarea id="ta" placeholder=" " maxlength="200"></textarea>
  <label for="ta">Release notes</label><span class="beam"></span>
</div>
<div class="count" id="count">0 / 200</div>`,
js:`
const ta=$('ta'), count=$('count');
ta.addEventListener('input',()=>{
  ta.style.height='auto'; ta.style.height=ta.scrollHeight+'px';
  const n=ta.value.length;
  count.textContent=n+' / 200';
  count.toggleAttribute('data-warn', n>150 && n<200);
  count.toggleAttribute('data-max', n>=200);
});
`
},
{
slug:'stepper', title:'Quantity Stepper', c:'#ffd23d', demo:'block',
desc:'Clamped between 1 and 99, with the number kicking upward every time it changes.',
note:'Animation restarts via a forced reflow &mdash; <b>void offsetWidth</b>.',
css:`
.wrapx{display:flex;align-items:center;justify-content:space-between;gap:16px}
.lb{font-size:14px;color:rgba(233,237,255,.7)}
.stp{display:flex;align-items:center;border-radius:15px;overflow:hidden;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1)}
.stp button{width:50px;height:52px;border:0;background:none;color:#fff;font-size:21px;cursor:pointer;
  transition:background .2s}
.stp button:hover{background:rgba(255,255,255,.1)}
.stp button:disabled{opacity:.28;cursor:not-allowed}
.stp b{min-width:60px;text-align:center;font:650 18px/1 ui-monospace,monospace;
  font-variant-numeric:tabular-nums;display:inline-block}
.stp b.bump{animation:bump .3s cubic-bezier(.2,1.6,.4,1)}
@keyframes bump{50%{transform:translateY(-6px) scale(1.15);color:var(--c)}}
.tot{margin-top:18px;display:flex;justify-content:space-between;align-items:baseline;
  font:600 11px/1 ui-monospace,monospace;letter-spacing:.14em;color:rgba(233,237,255,.35)}
.tot b{font:650 20px/1 ui-sans-serif,system-ui;color:#fff;letter-spacing:-.03em}
`,
html:`<div class="wrapx">
  <span class="lb">Nimbus Cube &mdash; $148</span>
  <div class="stp"><button id="minus">&minus;</button><b id="qty">1</b><button id="plus">+</button></div>
</div>
<div class="tot"><span>SUBTOTAL</span><b id="sum">$148</b></div>`,
js:`
let q=1;
const qty=$('qty'), sum=$('sum');
function set(v){
  q=Math.max(1,Math.min(99,v));
  qty.textContent=q; sum.textContent='$'+(q*148).toLocaleString();
  $('minus').disabled=q===1; $('plus').disabled=q===99;
  qty.classList.remove('bump'); void qty.offsetWidth; qty.classList.add('bump');
}
$('plus').addEventListener('click',()=>set(q+1));
$('minus').addEventListener('click',()=>set(q-1));
set(1);
`
},
{
slug:'rating', title:'Star Rating', c:'#ffd23d', demo:'block',
desc:'Fills on hover, commits on click, and falls back to the committed value when your pointer leaves.',
note:'Each star tilts <b>-6&deg;</b> as it lights, so the row never looks rigid.',
css:`
.stars{display:flex;gap:7px;justify-content:center}
.stars button{border:0;background:none;padding:3px;cursor:pointer;line-height:0}
.stars svg{width:34px;height:34px;fill:none;stroke:rgba(255,255,255,.28);stroke-width:1.6;
  transition:.25s cubic-bezier(.2,1.6,.4,1)}
.stars button[data-on] svg{fill:#ffd23d;stroke:#ffd23d;transform:scale(1.14) rotate(-6deg);
  filter:drop-shadow(0 0 10px rgba(255,210,61,.55))}
.lab{margin-top:16px;text-align:center;font:600 12px/1 ui-monospace,monospace;letter-spacing:.16em;
  text-transform:uppercase;color:rgba(233,237,255,.45);transition:color .3s}
`,
html:`<div class="stars" id="stars"></div>
<div class="lab" id="lab">not rated</div>`,
js:`
const starsEl=$('stars'), lab=$('lab');
const WORD=['awful','poor','fine','good','superb'];
let rated=0;
for(let i=1;i<=5;i++){
  const b=document.createElement('button');
  b.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" stroke-linejoin="round"/></svg>';
  b.addEventListener('pointerenter',()=>paint(i));
  b.addEventListener('click',()=>{ rated=i; paint(i);
    lab.textContent=WORD[i-1]+' \\u00b7 '+i+'/5'; lab.style.color='#ffd23d'; });
  starsEl.appendChild(b);
}
starsEl.addEventListener('pointerleave',()=>paint(rated));
function paint(n){
  [...starsEl.children].forEach((b,i)=>b.toggleAttribute('data-on', i<n));
  if(!rated){ lab.textContent='not rated'; lab.style.color=''; }
}
`
},
{
slug:'multi-step', title:'Multi-step Flow', c:'#7c5cff', demo:'block',
desc:'Three panes behind a progress rail. Each step refuses to advance until its own rule passes.',
note:'Step 1 needs 3+ characters, step 2 needs the terms box &mdash; try skipping them.',
css:MSG+`
.steps{display:flex;align-items:center;margin-bottom:22px}
.steps .s{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;
  font:700 11.5px/1 ui-monospace,monospace;color:rgba(233,237,255,.4);
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);transition:.4s}
.steps .s[data-on]{background:linear-gradient(130deg,var(--c),#31e0ff);color:#07080f;
  border-color:transparent;box-shadow:0 0 20px -5px var(--c)}
.steps .l{flex:1;height:2px;background:rgba(255,255,255,.1);position:relative;overflow:hidden}
.steps .l::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--c),#31e0ff);
  transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.3,1,.3,1)}
.steps .l[data-on]::after{transform:scaleX(1)}
.pane{display:none;flex-direction:column;gap:12px;animation:fade .4s both}
.pane[data-on]{display:flex}
@keyframes fade{from{opacity:0;transform:translateY(8px)}}
.ff{position:relative}
.ff input{width:100%;padding:22px 15px 10px;border-radius:14px;font:inherit;font-size:15px;color:#fff;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);outline:none}
.ff label{position:absolute;left:15px;top:17px;font-size:14.5px;color:rgba(233,237,255,.4);
  pointer-events:none;transform-origin:left top;transition:transform .3s cubic-bezier(.3,1.2,.4,1),color .3s}
.ff input:focus + label,.ff input:not(:placeholder-shown) + label{
  transform:translateY(-10px) scale(.72);color:var(--c)}
.radios{display:flex;gap:8px;flex-wrap:wrap}
.rp input{position:absolute;opacity:0}
.rp span{display:block;padding:11px 16px;border-radius:99px;font:600 13px/1 ui-sans-serif,system-ui;
  color:rgba(233,237,255,.55);background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.1);transition:.25s;cursor:pointer}
.rp input:checked + span{color:#07080f;background:#fff;border-color:transparent}
.cb{display:flex;align-items:center;gap:12px;cursor:pointer;font-size:13.5px;color:rgba(233,237,255,.75)}
.cb input{position:absolute;opacity:0}
.cb .box{width:23px;height:23px;border-radius:8px;border:1.6px solid rgba(255,255,255,.22);
  display:grid;place-items:center;transition:.28s cubic-bezier(.3,1.4,.4,1);flex:none}
.cb .box svg{width:13px;height:13px;fill:none;stroke:#07080f;stroke-width:3.2;stroke-linecap:round;
  stroke-linejoin:round;stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset .3s}
.cb input:checked + .box{background:linear-gradient(130deg,var(--c),#31e0ff);border-color:transparent}
.cb input:checked + .box svg{stroke-dashoffset:0}
.done{text-align:center;padding:12px 0}
.done svg{width:56px;height:56px;fill:none;stroke:#4dffcf;stroke-width:2.4;stroke-linecap:round;
  stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:60;animation:draw .55s .1s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.done p{margin:12px 0 0;font-size:14px;color:rgba(233,237,255,.62)}
.nav{display:flex;gap:10px;margin-top:18px}
.nav button{flex:1;padding:14px;border:0;border-radius:14px;cursor:pointer;
  font:650 14px/1 ui-sans-serif,system-ui;transition:transform .18s cubic-bezier(.2,1.5,.4,1)}
.nav button:active{transform:scale(.97)}
.nav .back{background:rgba(255,255,255,.08);color:#dfe5ff;border:1px solid rgba(255,255,255,.12)}
.nav .next{background:linear-gradient(130deg,var(--c),#31e0ff);color:#07080f;
  box-shadow:0 14px 32px -14px var(--c)}
`,
html:`<div class="steps" id="steps">
  <span class="s" data-on>1</span><span class="l"></span>
  <span class="s">2</span><span class="l"></span>
  <span class="s">3</span>
</div>

<div class="pane" data-on>
  <div class="ff"><input id="w" placeholder=" "><label for="w">Workspace name</label></div>
  <div class="msg" id="m0"></div>
</div>

<div class="pane">
  <div class="radios" id="plan">
    <label class="rp"><input type="radio" name="plan" checked><span>Starter</span></label>
    <label class="rp"><input type="radio" name="plan"><span>Studio</span></label>
    <label class="rp"><input type="radio" name="plan"><span>Enterprise</span></label>
  </div>
  <label class="cb"><input type="checkbox" id="terms"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>I accept the terms of service</label>
  <div class="msg" id="m1"></div>
</div>

<div class="pane">
  <div class="done">
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M7 12.5l3.5 3.5L17 9"/></svg>
    <p id="doneTxt">Workspace created.</p>
  </div>
</div>

<div class="nav">
  <button class="back" id="back" style="display:none">Back</button>
  <button class="next" id="next">Continue</button>
</div>`,
js:`
let i=0;
const panes=[...document.querySelectorAll('.pane')];
const dots=[...$('steps').querySelectorAll('.s')], lines=[...$('steps').querySelectorAll('.l')];
function paint(){
  dots.forEach((d,n)=>d.toggleAttribute('data-on', n<=i));
  lines.forEach((l,n)=>l.toggleAttribute('data-on', n<i));
  panes.forEach((p,n)=>p.toggleAttribute('data-on', n===i));
  $('back').style.display = i>0 && i<2 ? '' : 'none';
  $('next').textContent = i===0 ? 'Continue' : i===1 ? 'Create workspace' : 'Start over';
}
$('next').addEventListener('click',()=>{
  if(i===0){
    if($('w').value.trim().length<3){
      $('m0').textContent='Give it at least 3 characters.'; $('m0').setAttribute('data-show',''); return; }
    $('m0').removeAttribute('data-show'); i=1;
  }else if(i===1){
    if(!$('terms').checked){
      $('m1').textContent='You have to accept the terms.'; $('m1').setAttribute('data-show',''); return; }
    $('m1').removeAttribute('data-show');
    const plan=[...document.querySelectorAll('#plan .rp')].find(r=>r.querySelector('input').checked);
    $('doneTxt').textContent='\\u201c'+$('w').value.trim()+'\\u201d created on the '+plan.textContent.trim()+' plan.';
    i=2;
  }else{ i=0; $('w').value=''; $('terms').checked=false; }
  paint();
});
$('back').addEventListener('click',()=>{ i=Math.max(0,i-1); paint(); });
paint();
`
}
];
