document.addEventListener('DOMContentLoaded', async () => {
  await HRM.init();

  const res = await fetch('stack-picker/stacks.json');
  const options = await res.json();

  const AXES = Object.keys(options);
  const picks = {};

  const bar = document.getElementById('axis-bar');
  const tableBody = document.getElementById('stack-table-body');

  function radioOpt(axis, value, checked, onChange) {
    const row = document.createElement('label');
    row.className = 'check-opt';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = axis;
    input.checked = checked;
    input.addEventListener('change', () => onChange(value));
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
      options[axis].forEach((value) => {
        opts.appendChild(radioOpt(axis, value, picks[axis] === value, (v) => {
          picks[axis] = v;
          renderTable();
        }));
      });
      group.append(h4, opts);
      bar.appendChild(group);
    });
  }

  function renderTable() {
    if (!AXES.some((axis) => picks[axis])) {
      tableBody.innerHTML = `<tr><td class="empty" colspan="${AXES.length}">${HRM.t('stacks.empty')}</td></tr>`;
      return;
    }
    const cells = AXES.map((axis) => `<td class="name">${picks[axis] || '—'}</td>`).join('');
    tableBody.innerHTML = `<tr>${cells}</tr>`;
  }

  function render() {
    renderBar();
    renderTable();
  }

  document.addEventListener('hrm:langchange', render);
  render();
});
