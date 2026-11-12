// Shared across every page: language loading/toggling and the i18n attribute pass.
// Each page's own script (configs.js / stacks.js) listens for "hrm:langchange" to re-render.
const HRM = (() => {
  let lang = localStorage.getItem('hrm-lang') || 'en';
  let strings = {};

  async function loadStrings() {
    const res = await fetch(`i18n/${lang}.json`);
    strings = await res.json();
  }

  function t(key) {
    return strings[key] || key;
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    document.querySelectorAll('nav.main a').forEach((a) => {
      a.classList.toggle('active', a.dataset.page === document.body.dataset.page);
    });
  }

  async function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem('hrm-lang', lang);
    await loadStrings();
    applyStatic();
    document.dispatchEvent(new CustomEvent('hrm:langchange'));
  }

  async function init() {
    await loadStrings();
    applyStatic();
    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  return { init, t, get lang() { return lang; } };
})();
