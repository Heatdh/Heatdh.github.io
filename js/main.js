/* Shared navigation, themes, archive filters, and printable CV. */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const colors = { light: '#fffaf1', dark: '#102521' };
  function syncTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = colors[theme];
    if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
  syncTheme();
  if (themeToggle) themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) { /* Storage may be unavailable. */ }
    syncTheme();
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navLinks.id = 'navigation-links';
    navToggle.setAttribute('aria-controls', navLinks.id);
    function setOpen(open) {
      navToggle.classList.toggle('open', open);
      navLinks.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    navToggle.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        setOpen(false);
        navToggle.focus();
      }
    });
    window.matchMedia('(min-width: 769px)').addEventListener('change', event => {
      if (event.matches) setOpen(false);
    });
  }

  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.glass-card[data-category]');
  filters.forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      filters.forEach(filter => {
        filter.classList.toggle('active', filter === button);
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      cards.forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      });
    });
  });
  const printButton = document.getElementById('print-cv');
  if (printButton) printButton.addEventListener('click', () => window.print());
});
