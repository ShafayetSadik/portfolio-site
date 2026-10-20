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

// Header border/blur once the page is scrolled -------------------------------
const header = document.getElementById('site-header');
const onScroll = () => {
  const scrolled = String(window.scrollY > 8);
  if (header && header.dataset.scrolled !== scrolled) header.dataset.scrolled = scrolled;
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu --------------------------------------------------------------
const menuBtn = document.getElementById('menu-button');
const menu = document.getElementById('mobile-menu');

function setMenu(open: boolean) {
  if (!menuBtn || !menu) return;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuBtn.querySelector('.menu-open-icon')?.classList.toggle('hidden', open);
  menuBtn.querySelector('.menu-close-icon')?.classList.toggle('hidden', !open);
  menu.classList.toggle('hidden', !open);
  if (open && header) header.dataset.scrolled = 'true';
  if (!open) onScroll();
  if (open && !reduced) {
    animate(menu.querySelectorAll('li'), {
      opacity: [0, 1],
      x: [-12, 0],
      delay: (_, i) => i * 35,
      duration: 380,
      ease: 'outQuart',
    });
  }
}

menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
menu?.querySelectorAll('[data-mobile-link]').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});
matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
  if (e.matches) setMenu(false);
});

// Active section highlight with a sliding pill ------------------------------
const links = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((a) => links.set(a.dataset.navLink!, a));
const indicator = document.getElementById('nav-indicator');
let activeId: string | null = null;

function moveIndicator(link: HTMLAnchorElement | null) {
  if (!indicator) return;
  if (!link) {
    animate(indicator, { opacity: 0, duration: reduced ? 0 : 200 });
    return;
  }
  const li = link.parentElement!;
  const visible = indicator.style.opacity !== '' && indicator.style.opacity !== '0';
  animate(indicator, {
    x: li.offsetLeft,
    width: li.offsetWidth,
    opacity: 1,
    duration: reduced || !visible ? 0 : 450,
    ease: 'outExpo',
  });
}

function setActive(id: string | null) {
  if (id === activeId) return;
  activeId = id;
  links.forEach((a, key) => a.setAttribute('aria-current', String(key === id)));
  moveIndicator(id ? links.get(id) ?? null : null);
}

// A section is active while it crosses a line 35% down the viewport.
// "leadership" has no nav entry, so it keeps "education" highlighted.
const inBand = new Set<string>();
const order = [...links.keys()];
const band = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const id = e.target.id === 'leadership' ? 'education' : e.target.id;
      if (e.isIntersecting) inBand.add(id);
      else inBand.delete(id);
    }
    setActive(order.find((id) => inBand.has(id)) ?? null);
  },
  { rootMargin: '-35% 0px -65% 0px' },
);
[...order, 'leadership'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) band.observe(el);
});

window.addEventListener('resize', () => {
  const current = activeId;
  activeId = null;
  setActive(current);
});
