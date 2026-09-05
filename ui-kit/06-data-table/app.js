const AV = { 'P. Raman':'#7cc4ff','M. Webb':'#a98bff','S. Alvarez':'#5fe0ac','J. Kim':'#ffb057','R. Osei':'#ff6b81' };
const ROWS = [
  ['checkout-api','fail','J. Kim',214,2,'a1f4c9'],  ['search-index','live','M. Webb',486,5,'7b21e0'],
  ['web-app','live','P. Raman',132,7,'3cd811'],     ['billing-worker','build','S. Alvarez',97,0,'9e42aa'],
  ['auth-service','live','R. Osei',168,11,'2b70fd'],['notify-fan','live','M. Webb',75,14,'6c19ba'],
  ['web-app','live','P. Raman',129,20,'88e0d2'],    ['media-cdn','fail','R. Osei',312,26,'41ba07'],
  ['checkout-api','live','J. Kim',201,31,'ce55a1'], ['docs-site','live','P. Raman',44,36,'1d9f3e'],
  ['search-index','build','M. Webb',402,41,'af6b22'],['auth-service','live','S. Alvarez',155,47,'50c8e9'],
  ['billing-worker','live','S. Alvarez',88,55,'7fa130'],['media-cdn','live','R. Osei',298,62,'e2b845'],
  ['notify-fan','fail','M. Webb',61,70,'34d7c1']
].map(([service,status,author,dur,when,sha]) => ({ service, status, author, dur, when, sha }));

const LABEL = { live:'Live', build:'Building', fail:'Failed' };
const PER = 6;
let sortK = 'when', sortDir = 1, filter = 'all', term = '', page = 1;
const sel = new Set();

const $ = s => document.querySelector(s);
const ago = h => h === 0 ? 'just now' : h < 24 ? h + 'h ago' : Math.round(h / 24) + 'd ago';
const dur = s => Math.floor(s / 60) + 'm ' + String(s % 60).padStart(2,'0') + 's';

function view(){
  let r = ROWS.filter(x => filter === 'all' || x.status === filter);
  if (term) r = r.filter(x => (x.service + ' ' + x.author).toLowerCase().includes(term));
  return r.sort((a, b) => {
    const A = a[sortK], B = b[sortK];
    return (typeof A === 'number' ? A - B : String(A).localeCompare(String(B))) * sortDir;
  });
}

function render(){
  const all = view();
  const pages = Math.max(1, Math.ceil(all.length / PER));
  page = Math.min(page, pages);
  const slice = all.slice((page - 1) * PER, page * PER);

  $('#body').innerHTML = slice.map(r => {
    const key = r.sha;
    return `<tr class="${sel.has(key) ? 'sel' : ''}" data-k="${key}">
      <td class="cbx"><input type="checkbox" ${sel.has(key) ? 'checked' : ''} aria-label="Select ${r.service}"></td>
      <td class="name">${r.service}<span>${r.sha}</span></td>
      <td><span class="pill st-${r.status}">${LABEL[r.status]}</span></td>
      <td><span class="av" style="background:${AV[r.author]}">${r.author.split('.')[0][0] + r.author.split(' ')[1][0]}</span>${r.author}</td>
      <td class="num">${dur(r.dur)}</td>
      <td class="num">${ago(r.when)}</td></tr>`;
  }).join('');

  $('#empty').hidden = all.length > 0;
  $('#range').textContent = all.length
    ? `${(page - 1) * PER + 1}–${Math.min(page * PER, all.length)} OF ${all.length}` : '0 OF 0';

  $('#pg').innerHTML =
    `<button type="button" data-p="${page - 1}" ${page === 1 ? 'disabled' : ''}>‹</button>` +
    Array.from({ length: pages }, (_, i) =>
      `<button type="button" data-p="${i + 1}" aria-current="${i + 1 === page}">${i + 1}</button>`).join('') +
    `<button type="button" data-p="${page + 1}" ${page === pages ? 'disabled' : ''}>›</button>`;

  const onPage = slice.map(r => r.sha);
  $('#all').checked = onPage.length > 0 && onPage.every(k => sel.has(k));
  $('#all').indeterminate = !$('#all').checked && onPage.some(k => sel.has(k));
  $('#selbar').classList.toggle('on', sel.size > 0);
  $('#selcount').textContent = sel.size + (sel.size === 1 ? ' deployment selected' : ' deployments selected');

  document.querySelectorAll('thead th.s').forEach(th => {
    if (th.dataset.k === sortK){ th.setAttribute('aria-sort', sortDir > 0 ? 'ascending' : 'descending');
      th.querySelector('i').textContent = sortDir > 0 ? '↑' : '↓'; }
    else { th.removeAttribute('aria-sort'); th.querySelector('i').textContent = '↕'; }
  });
}

document.querySelectorAll('thead th.s').forEach(th => th.addEventListener('click', () => {
  const k = th.dataset.k;
  if (k === sortK) sortDir *= -1; else { sortK = k; sortDir = 1; }
  render();
}));
$('#q').addEventListener('input', e => { term = e.target.value.trim().toLowerCase(); page = 1; render(); });
$('#chips').addEventListener('click', e => {
  const b = e.target.closest('.fchip'); if (!b) return;
  filter = b.dataset.f; page = 1;
  document.querySelectorAll('.fchip').forEach(x => x.setAttribute('aria-pressed', x === b));
  render();
});
$('#body').addEventListener('change', e => {
  const tr = e.target.closest('tr'); if (!tr) return;
  e.target.checked ? sel.add(tr.dataset.k) : sel.delete(tr.dataset.k);
  render();
});
$('#all').addEventListener('change', e => {
  view().slice((page - 1) * PER, page * PER).forEach(r => e.target.checked ? sel.add(r.sha) : sel.delete(r.sha));
  render();
});
$('#pg').addEventListener('click', e => {
  const b = e.target.closest('button[data-p]'); if (!b || b.disabled) return;
  page = +b.dataset.p; render();
});
$('#clearsel').addEventListener('click', () => { sel.clear(); render(); });
$('#redeploy').addEventListener('click', () => { alert('Redeploying ' + sel.size + ' service(s)'); sel.clear(); render(); });

render();
