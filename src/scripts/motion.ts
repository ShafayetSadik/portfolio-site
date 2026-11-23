import { waapi, stagger } from 'animejs';

// Subtle motion only: short fades with a small upward shift.
// waapi.animate hands opacity + the CSS `translate` property to the browser's
// animation engine, so the fades run off the main thread (no per-frame JS).
const root = document.documentElement;
const EASE = 'outQuart';
const phone = matchMedia('(max-width: 767.98px)').matches;
const SHIFT = phone ? '0 8px' : '0 12px';
const DUR = phone ? 500 : 650;
const STEP = phone ? 35 : 50;

function initIntro() {
  const items = document.querySelectorAll<HTMLElement>('[data-hero-item]');
  const portrait = document.querySelector<HTMLElement>('[data-hero-portrait]');
  if (items.length) waapi.animate(items, { opacity: [0, 1], translate: [SHIFT, '0 0'], duration: DUR, delay: stagger(70), ease: EASE });
  if (portrait) waapi.animate(portrait, { opacity: [0, 1], duration: DUR + 200, delay: 100, ease: EASE });
}

// Runs `play` once the element's top passes a little above the viewport bottom.
// The huge top margin makes anything *above* the viewport count as seen too,
// so elements the visitor jumped past (anchor links, fast scrolls, reload
// mid-page) still reveal. IntersectionObserver avoids layout reads on scroll.
const pending = new Map<Element, () => void>();
const seen = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      seen.unobserve(entry.target);
      pending.get(entry.target)?.();
      pending.delete(entry.target);
    }
  },
  { rootMargin: phone ? '100000px 0px -30px 0px' : '100000px 0px -60px 0px' },
);
function whenSeen(el: Element, play: () => void) {
  pending.set(el, play);
  seen.observe(el);
}

// Fade sections in as they come into view.
function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    whenSeen(el, () => waapi.animate(el, { opacity: [0, 1], translate: [SHIFT, '0 0'], duration: DUR, ease: EASE }));
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    whenSeen(group, () =>
      waapi.animate(items, { opacity: [0, 1], translate: [SHIFT, '0 0'], duration: DUR, delay: stagger(STEP), ease: EASE }),
    );
  });
}

// The head script only sets .motion when the visitor allows motion.
// .motion-ready cancels the CSS fallback reveal, so it is only set once setup succeeded.
if (root.classList.contains('motion')) {
  try {
    initIntro();
    initReveals();
    root.classList.add('motion-ready');
  } catch (err) {
    root.classList.remove('motion');
    console.error(err);
  }
}
