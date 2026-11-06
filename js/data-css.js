/* Computed styles without inline style attributes. The CSP is style-src 'self', so markup carries
   data-css="width:42%;background:var(--green)" and this applies it through the CSSOM (which CSP
   permits). Only these properties and value shapes are accepted, so injected markup cannot
   position, cover or restyle the page. */
(() => {
  'use strict';
  const PERCENT = /^-?\d+(?:\.\d+)?%$/, THEME = /^var\(--[a-z][a-z0-9-]*\)$/;
  const RULES = { width: PERCENT, left: PERCENT, background: THEME, color: THEME };
  function apply(el) {
    for (const decl of String(el.getAttribute('data-css') || '').split(';')) {
      const i = decl.indexOf(':');
      if (i < 0) continue;
      const prop = decl.slice(0, i).trim(), value = decl.slice(i + 1).trim();
      if (RULES[prop] && RULES[prop].test(value)) el.style.setProperty(prop, value);
    }
  }
  const scan = root => {
    if (root.nodeType !== 1) return;
    if (root.hasAttribute('data-css')) apply(root);
    root.querySelectorAll('[data-css]').forEach(apply);
  };
  if (typeof MutationObserver === 'function' && typeof document !== 'undefined' && document.documentElement) {
    // Mutation callbacks run before the next paint, so rendered bars never flash unstyled.
    new MutationObserver(list => list.forEach(m => (m.type === 'attributes' ? apply(m.target) : m.addedNodes.forEach(scan))))
      .observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-css'] });
  }
  window.McatDataCss = { RULES, apply };
})();
