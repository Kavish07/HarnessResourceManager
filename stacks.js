document.addEventListener('DOMContentLoaded', async () => {
  await HRM.init();

  const res = await fetch('stack-picker/stacks.json');
  const stacks = await res.json();

  const AXES = ['frontend', 'backend', 'database', 'hosting', 'auth'];
  const state = Object.fromEntries(AXES.map((a) => [a, 'all']));

  const bar = document.getElementById('axis-bar');
  const table = document.getElementById('stack-table');

  function pill(value, active, onClick) {
    const btn = document.createElement('button');
    btn.className = 'pill';
    btn.textContent = value;
    btn.setAttribute('aria-pressed', String(active));
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderBar() {
    bar.innerHTML = '';
    AXES.forEach((axis) => {
      const row = document.createElement('div');
      row.className = 'axis';
      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = HRM.t(`stacks.axis.${axis}`);
      row.appendChild(label);

      row.appendChild(pill(HRM.t('stacks.filter.all'), state[axis] === 'all', () => {
        state[axis] = 'all';
        render();
      }));

      [...new Set(stacks.map((s) => s[axis]))].forEach((value) => {
        row.appendChild(pill(value, state[axis] === value, () => {
          state[axis] = value;
          render();
        }));
      });

      bar.appendChild(row);
    });
  }

  function renderTable() {
    const filtered = stacks.filter((s) => AXES.every((axis) => state[axis] === 'all' || s[axis] === state[axis]));

    if (!filtered.length) {
      table.innerHTML = `<tr><td class="empty">${HRM.t('stacks.empty')}</td></tr>`;
      return;
    }

    const head = `<tr>${AXES.map((a) => `<th>${HRM.t(`stacks.axis.${a}`)}</th>`).join('')}<th></th></tr>`;
    const rows = filtered
      .map(
        (s) =>
          `<tr>${AXES.map((a) => `<td class="name">${s[a]}</td>`).join('')}<td class="notes">${s.notes}</td></tr>`
      )
      .join('');
    table.innerHTML = head + rows;
  }

  function render() {
    renderBar();
    renderTable();
  }

  document.addEventListener('hrm:langchange', render);
  render();
});
