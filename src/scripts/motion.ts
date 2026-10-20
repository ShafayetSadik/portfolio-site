import { animate, onScroll, splitText, stagger, createTimeline } from 'animejs';

const root = document.documentElement;
const EASE = 'outExpo';

function initHero() {
  const name = document.querySelector<HTMLElement>('[data-hero-name]');
  const items = document.querySelectorAll<HTMLElement>('[data-hero-item]');
  const portrait = document.querySelector<HTMLElement>('[data-hero-portrait]');

  const tl = createTimeline({ defaults: { ease: EASE } });

  if (name) {
    const { words } = splitText(name, { words: { wrap: 'clip' } });
    name.style.opacity = '1';
    tl.add(words, { y: ['110%', '0%'], duration: 1100, delay: stagger(90) }, 0);
  }
  if (items.length) {
    tl.add(items, { opacity: [0, 1], y: [14, 0], duration: 900, delay: stagger(110) }, 250);
  }
  if (portrait) {
    tl.add(portrait, { opacity: [0, 1], scale: [0.96, 1], duration: 1200 }, 350);
  }
}

// Runs `play` once the element's top passes 60px above the viewport bottom.
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
  { rootMargin: '100000px 0px -60px 0px' },
);
function whenSeen(el: Element, play: () => void) {
  pending.set(el, play);
  seen.observe(el);
}

// Fade/slide sections in as they come into view.
function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    whenSeen(el, () => animate(el, { opacity: [0, 1], y: [22, 0], duration: 900, ease: EASE }));
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    whenSeen(group, () =>
      animate(items, { opacity: [0, 1], y: [18, 0], duration: 800, delay: stagger(70), ease: EASE }),
    );
  });
}

// Draw the experience line in step with scrolling.
function initTimeline() {
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  const progress = timeline?.querySelector<HTMLElement>('[data-timeline-progress]');
  if (!timeline || !progress) return;
  animate(progress, {
    scaleY: [0, 1],
    ease: 'linear',
    autoplay: onScroll({ target: timeline, enter: 'center top', leave: 'center bottom', sync: 0.3 }),
  });
}

// Count numbers up from zero when they come into view.
function initCounters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const state = { v: 0 };
    el.textContent = (0).toFixed(decimals);
    whenSeen(el, () =>
      animate(state, {
        v: end,
        duration: 1600,
        ease: 'outQuart',
        onUpdate: () => {
          el.textContent = state.v.toFixed(decimals);
        },
      }),
    );
  });
}

// Grow the IELTS band bars.
function initBars() {
  const bars = document.querySelectorAll<HTMLElement>('[data-bar]');
  if (!bars.length) return;
  bars.forEach((b) => (b.style.transform = 'scaleX(0)'));
  whenSeen(bars[0].closest('ul')!, () =>
    animate(bars, { scaleX: [0, 1], duration: 1200, delay: stagger(90), ease: EASE }),
  );
}

// The head script only sets .motion when the visitor allows motion.
// .motion-ready cancels the CSS fallback reveal, so it is only set once setup succeeded.
if (root.classList.contains('motion')) {
  try {
    initHero();
    initReveals();
    initTimeline();
    initCounters();
    initBars();
    root.classList.add('motion-ready');
  } catch (err) {
    root.classList.remove('motion');
    console.error(err);
  }
}
