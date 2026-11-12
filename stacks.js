document.addEventListener('DOMContentLoaded', async () => {
  await HRM.init();

  const res = await fetch('stack-picker/stacks.json');
  const stacks = await res.json();

  const AXES = ['frontend', 'backend', 'database', 'hosting', 'auth'];
  const state = Object.fromEntries(AXES.map((a) => [a, new Set()]));

  const bar = document.getElementById('axis-bar');
  const table = document.getElementById('stack-table');

  function checkbox(value, checked, onChange) {
    const row = document.createElement('label');
    row.className = 'check-opt';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;
    input.addEventListener('change', () => onChange(input.checked));
    row.append(input, document.createTextNode(value));
    return row;
  }

  function renderBar() {
    bar.innerHTML = '';
    AXES.forEach((axis) => {
      const group = document.createElement('div');
      group.className = 'filter-group';
      const h4 = document.createElement('h4');
      h4.textContent = HRM.t(`stacks.axis.${axis}`);
      const opts = document.createElement('div');
      opts.className = 'opts';
      [...new Set(stacks.map((s) => s[axis]))].forEach((value) => {
        opts.appendChild(checkbox(value, state[axis].has(value), (checked) => {
          checked ? state[axis].add(value) : state[axis].delete(value);
          render();
        }));
      });
      group.append(h4, opts);
      bar.appendChild(group);
    });
  }

  function renderTable() {
    const filtered = stacks.filter((s) => AXES.every((axis) => state[axis].size === 0 || state[axis].has(s[axis])));

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
