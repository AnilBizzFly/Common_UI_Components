const root = document.documentElement, saved = document.getElementById('saved');
let t;
function flash(msg){
  saved.querySelector('span').textContent = msg || 'Saved just now';
  saved.classList.add('on');
  clearTimeout(t);
  t = setTimeout(() => { saved.classList.remove('on'); saved.querySelector('span').textContent = 'All changes saved'; }, 1800);
}

/* three-way theme: an explicit stamp wins, "system" removes it */
document.querySelectorAll('[data-th]').forEach(b => b.addEventListener('click', () => {
  const v = b.dataset.th;
  document.querySelectorAll('[data-th]').forEach(x => x.setAttribute('aria-pressed', x === b));
  if (v === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', v);
  flash(v === 'system' ? 'Following system' : v[0].toUpperCase() + v.slice(1) + ' theme');
}));

document.querySelectorAll('.sw').forEach(sw => sw.addEventListener('click', () => {
  const on = sw.getAttribute('aria-checked') === 'true';
  sw.setAttribute('aria-checked', String(!on));
  flash(sw.getAttribute('aria-label') + (on ? ' off' : ' on'));
}));

const quota = document.getElementById('quota'), qv = document.getElementById('qv');
quota.addEventListener('input', () => { qv.textContent = quota.value + '%'; });
quota.addEventListener('change', () => flash('Warn at ' + quota.value + '%'));
document.querySelector('select').addEventListener('change', e => flash(e.target.value + ' density'));
document.getElementById('del').addEventListener('click', () => {
  if (confirm('Delete this workspace and everything in it?')) flash('Nothing was deleted — this is a demo');
});
