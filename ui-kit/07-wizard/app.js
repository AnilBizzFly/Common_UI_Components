const $ = s => document.querySelector(s);
const NAMES = ['Workspace','Use case','Team','Review'];
let step = 0, dir = 1;

function rail(){
  $('#rail').innerHTML = NAMES.map((n, i) =>
    `<div class="node ${i < step ? 'done' : i === step ? 'now' : ''}">
      <span class="dot">${i < step ? '<svg viewBox="0 0 24 24"><path d="m4 12.5 5 5L20 6.5"/></svg>' : i + 1}</span>
      <small>${n}</small></div>`).join('');
}
function nav(){
  $('#nav').innerHTML = step === 4
    ? '<button class="btn solid" type="button" data-go="0">Start over</button>'
    : (step > 0 ? '<button class="btn ghost" type="button" data-go="' + (step - 1) + '">Back</button>' : '') +
      '<button class="btn solid" type="button" data-next>' +
        (step === 3 ? 'Create workspace' : step === 2 ? 'Continue' : 'Continue') + '</button>';
}
function show(){
  document.querySelectorAll('.step').forEach(s => {
    const on = +s.dataset.step === step;
    s.classList.toggle('on', on);
    s.classList.toggle('back', dir < 0);
  });
  rail(); nav();
}

const bad = (id, on) => $(id).classList.toggle('bad', on);

function validate(){
  if (step === 0){
    const okName = $('#ws').value.trim().length > 1;
    const okUrl = /^[a-z0-9-]{2,}$/.test($('#url').value.trim());
    bad('#f-name', !okName); bad('#f-url', !okUrl);
    return okName && okUrl;
  }
  if (step === 2){
    const v = $('#mails').value.trim();
    const ok = !v || v.split(',').every(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()));
    bad('#f-mail', !ok);
    return ok;
  }
  return true;
}

function fillReview(){
  const use = document.querySelector('input[name=use]:checked').value;
  const mails = $('#mails').value.trim();
  $('#review').innerHTML = [
    ['Workspace', $('#ws').value.trim()],
    ['URL', $('#url').value.trim() + '.atlas.app'],
    ['Use case', use],
    ['Invites', mails ? mails.split(',').length + ' pending' : 'None yet'],
    ['Member perms', $('#seat').checked ? 'Can invite others' : 'Admins only']
  ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
}

$('#nav').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.go !== undefined){
    dir = -1; step = +b.dataset.go;
    if (step === 0){ document.querySelectorAll('.field').forEach(f => f.classList.remove('bad')); }
    show(); return;
  }
  if (!validate()) return;
  dir = 1; step++;
  if (step === 3) fillReview();
  if (step === 4) $('#doneline').textContent =
    ($('#ws').value.trim() || 'Your workspace') + ' is live at ' + ($('#url').value.trim() || 'workspace') + '.atlas.app';
  show();
});
document.querySelectorAll('.inp').forEach(i =>
  i.addEventListener('input', () => i.closest('.field').classList.remove('bad')));
$('#ws').addEventListener('input', () => {
  if (!$('#url').dataset.touched)
    $('#url').value = $('#ws').value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
});
$('#url').addEventListener('input', () => $('#url').dataset.touched = '1');

show();
