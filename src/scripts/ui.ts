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
  menu.classList.toggle('flex', open);
  // Lock page scroll behind the full-screen sheet.
  root.style.overflow = open ? 'hidden' : '';
  if (open && header) header.dataset.scrolled = 'true';
  if (!open) onScroll();
  if (open && !reduced) {
    animate(menu.querySelectorAll('li'), {
      opacity: [0, 1],
      y: [16, 0],
      delay: (_, i) => i * 30,
      duration: 420,
      ease: 'outQuart',
    });
  }
}

menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
menu?.querySelectorAll('[data-mobile-link]').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') setMenu(false);
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
      animate(extras, { opacity: [0, 1], y: [10, 0], delay: (_, i) => i * 50, duration: 450, ease: 'outQuart' });
    }
  });
});

// Projects carousel controls (phones) ---------------------------------------
const track = document.querySelector<HTMLElement>('[data-carousel]');
if (track) {
  const slides = [...track.querySelectorAll<HTMLElement>('[data-slide]')];
  const current = document.querySelector<HTMLElement>('[data-carousel-current]');
  const bar = document.querySelector<HTMLElement>('[data-carousel-bar]');
  const prev = document.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-carousel-next]');
  let index = 0;

  const render = () => {
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    if (bar) bar.style.transform = `scaleX(${(index + 1) / slides.length})`;
    if (prev) prev.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
  };

  // The slide that is mostly in view is the current one.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) index = slides.indexOf(e.target as HTMLElement);
      }
      render();
    },
    { root: track, threshold: 0.6 },
  );
  slides.forEach((s) => io.observe(s));

  const go = (to: number) => {
    const target = slides[Math.max(0, Math.min(slides.length - 1, to))];
    if (!target) return;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduced ? 'auto' : 'smooth' });
  };
  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));
  render();
}

// Floating back-to-top button (phones) --------------------------------------
const toTop = document.getElementById('to-top');
const hero = document.getElementById('top');
if (toTop && hero) {
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
  }).observe(hero);
}
