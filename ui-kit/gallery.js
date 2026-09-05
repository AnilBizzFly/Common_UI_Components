const P = [
  ['01-command-palette/index.html','Command Palette','Ctrl-K launcher with subsequence matching, grouped results and full keyboard navigation.',['⌘K','fuzzy search','a11y'],1],
  ['02-dashboard/index.html','Analytics Dashboard','Stat tiles, an area chart with crosshair, grouped bars with legend, and a table view.',['charts','tooltip','validated palette'],1],
  ['03-ai-chat/index.html','AI Chat','Token-by-token streaming with a stop control, suggested prompts and autosizing composer.',['streaming','LLM UI'],1],
  ['04-pricing/index.html','Pricing Table','Monthly/yearly switch with a sliding pill and prices that roll to their new value.',['toggle','number roll'],0],
  ['05-kanban/index.html','Kanban Board','Pointer-based drag and drop that works with mouse, pen and finger alike.',['drag & drop','touch'],1],
  ['06-data-table/index.html','Data Table','Sort, search, status filters, range selection, sticky header and pagination.',['sortable','bulk select'],1],
  ['07-wizard/index.html','Onboarding Wizard','Four steps with per-step validation, a live progress rail and a review screen.',['multi-step','validation'],0],
  ['08-toasts/index.html','Toast System','Stacked notifications that pause on hover and can be thrown away with a drag.',['gestures','queueing'],1],
  ['09-settings/index.html','Settings & Theme','A real three-way theme switch — light, dark, or follow the system.',['light + dark','switches'],1],
  ['10-gallery/index.html','Gallery & Lightbox','Masonry grid with a keyboard-navigable lightbox. Every tile is generated, no assets.',['masonry','lightbox'],0],
  ['11-date-range/index.html','Date Range Picker','Dual-month calendar with hover preview of the range and six quick presets.',['calendar','range'],1],
  ['12-bottom-sheet/index.html','Bottom Sheet','Draggable sheet with three snap points; a flick throws it, a slow release settles.',['mobile','physics'],1]
];

document.getElementById('grid').innerHTML = P.map(([href, name, desc, tags, hot], i) => `
  <a class="card" href="${href}">
    <div class="shot">
      <span class="no">${String(i + 1).padStart(2,'0')}</span>
      <iframe src="${href}" loading="lazy" tabindex="-1" aria-hidden="true" scrolling="no" title=""></iframe>
    </div>
    <div class="body">
      <h2>${name}</h2>
      <p>${desc}</p>
      <div class="tags">${tags.map((t, n) =>
        `<span class="tag${hot && n === 0 ? ' hot' : ''}">${t}</span>`).join('')}</div>
    </div>
  </a>`).join('');
