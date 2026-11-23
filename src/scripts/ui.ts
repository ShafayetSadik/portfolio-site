import { animate } from 'animejs';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme toggle -------------------------------------------------------------
document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    if (!reduced) {
      animate(btn.querySelectorAll('svg'), { rotate: [-90, 0], scale: [0.6, 1], duration: 450, ease: 'outBack' });
    }
  });
});

// "Show all" for long experience lists on phones ----------------------------
document.querySelectorAll<HTMLButtonElement>('[data-expand]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const list = document.getElementById(btn.dataset.expand!);
    if (!list) return;
    list.dataset.expanded = '';
    btn.hidden = true;
    btn.setAttribute('aria-expanded', 'true');
    const extras = list.querySelectorAll<HTMLElement>('[data-extra]');
    extras[0]?.setAttribute('tabindex', '-1');
    extras[0]?.focus({ preventScroll: true });
    if (!reduced) {
      animate(extras, { opacity: [0, 1], y: [8, 0], delay: (_, i) => i * 50, duration: 400, ease: 'outQuart' });
    }
  });
});

// Floating back-to-top button (phones) --------------------------------------
const toTop = document.getElementById('to-top');
const intro = document.getElementById('top');
if (toTop && intro) {
  let shown = false;
  new IntersectionObserver(([e]) => {
    const show = !e.isIntersecting;
    if (show === shown) return;
    shown = show;
    if (show) {
      toTop.dataset.show = '';
      if (!reduced) animate(toTop, { opacity: [0, 1], scale: [0.8, 1], duration: 300, ease: 'outBack' });
    } else if (reduced) {
      delete toTop.dataset.show;
    } else {
      animate(toTop, { opacity: 0, scale: 0.8, duration: 200, ease: 'inQuad', onComplete: () => { if (!shown) delete toTop.dataset.show; } });
    }
  }).observe(intro);
}
