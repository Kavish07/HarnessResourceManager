document.addEventListener('DOMContentLoaded', async () => {
  await HRM.init();

  const res = await fetch('manifest.json');
  const resources = await res.json();

  const types = [...new Set(resources.map((r) => r.type))];
  const tags = [...new Set(resources.flatMap((r) => r.tags))];
  const state = { types: new Set(), tags: new Set() };

  const typeFilter = document.getElementById('type-filter');
  const tagFilter = document.getElementById('tag-filter');
  const list = document.getElementById('resource-list');

  function checkbox(value, label, checked, onChange) {
    const row = document.createElement('label');
    row.className = 'check-opt';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;
    input.addEventListener('change', () => onChange(input.checked));
    row.append(input, document.createTextNode(label));
    return row;
  }

  function renderFilters() {
    typeFilter.innerHTML = '';
    types.forEach((type) => {
      typeFilter.appendChild(checkbox(type, HRM.t(`configs.type.${type}`), state.types.has(type), (checked) => {
        checked ? state.types.add(type) : state.types.delete(type);
        render();
      }));
    });

    tagFilter.innerHTML = '';
    tags.forEach((tag) => {
      tagFilter.appendChild(checkbox(tag, tag, state.tags.has(tag), (checked) => {
        checked ? state.tags.add(tag) : state.tags.delete(tag);
        render();
      }));
    });
  }

  function harnessBadge(name, status) {
    const span = document.createElement('span');
    span.className = `badge ${status === 'native' ? 'native' : status === 'shim' ? 'shim' : ''}`;
    span.textContent = `${name} · ${HRM.t(`configs.harness.${status}`)}`;
    return span;
  }

  function renderList() {
    const filtered = resources.filter(
      (r) =>
        (state.types.size === 0 || state.types.has(r.type)) &&
        (state.tags.size === 0 || r.tags.some((t) => state.tags.has(t)))
    );

    list.innerHTML = '';
    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = HRM.t('configs.empty');
      list.appendChild(empty);
      return;
    }

    filtered.forEach((r) => {
      const row = document.createElement('div');
      row.className = 'resource';

      const type = document.createElement('div');
      type.className = 'type';
      type.textContent = HRM.t(`configs.type.${r.type}`);

      const mainEl = document.createElement('div');
      mainEl.className = 'main';
      mainEl.innerHTML = `<b>${r.name}</b><p>${r.description}</p><span class="path">${r.path}</span>`;

      const badges = document.createElement('div');
      badges.className = 'badges';
      Object.entries(r.harnesses).forEach(([name, status]) => {
        badges.appendChild(harnessBadge(name, status));
      });

      row.append(type, mainEl, badges);
      list.appendChild(row);
    });
  }

  function render() {
    renderFilters();
    renderList();
  }

  document.addEventListener('hrm:langchange', render);
  render();
});
