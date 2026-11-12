document.addEventListener('DOMContentLoaded', async () => {
  await HRM.init();

  const res = await fetch('manifest.json');
  const resources = await res.json();

  const types = [...new Set(resources.map((r) => r.type))];
  const tags = [...new Set(resources.flatMap((r) => r.tags))];
  const state = { type: 'all', tag: 'all' };

  const typeFilter = document.getElementById('type-filter');
  const tagFilter = document.getElementById('tag-filter');
  const list = document.getElementById('resource-list');

  function pill(value, label, active, onClick) {
    const btn = document.createElement('button');
    btn.className = 'pill';
    btn.textContent = label;
    btn.setAttribute('aria-pressed', String(active));
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderFilters() {
    typeFilter.innerHTML = '';
    typeFilter.appendChild(pill('all', HRM.t('configs.filter.all'), state.type === 'all', () => {
      state.type = 'all';
      render();
    }));
    types.forEach((type) => {
      typeFilter.appendChild(pill(type, HRM.t(`configs.type.${type}`), state.type === type, () => {
        state.type = type;
        render();
      }));
    });

    tagFilter.innerHTML = '';
    tagFilter.appendChild(pill('all', HRM.t('configs.filter.all'), state.tag === 'all', () => {
      state.tag = 'all';
      render();
    }));
    tags.forEach((tag) => {
      tagFilter.appendChild(pill(tag, tag, state.tag === tag, () => {
        state.tag = tag;
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
        (state.type === 'all' || r.type === state.type) &&
        (state.tag === 'all' || r.tags.includes(state.tag))
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
