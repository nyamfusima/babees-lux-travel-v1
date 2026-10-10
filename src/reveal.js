/**
 * Scroll reveal.
 *
 * A single IntersectionObserver for the whole page. Elements marked `.reveal`
 * fade up once as they enter the viewport, then stop being watched, so nothing
 * replays when the visitor scrolls back a few pixels.
 *
 * THE CONTENT IS NEVER HIDDEN BY CSS ALONE. The hidden state lives behind
 * `html.js-reveal`, and that class is only added here, after we have confirmed
 * the browser can actually reveal it again. If the script never runs, if
 * IntersectionObserver is missing, or if the visitor prefers reduced motion,
 * the class is never added and every section renders plainly visible.
 *
 * A timer is the last line of defence: whatever happens, everything is shown
 * within a few seconds.
 */

const REVEALED = 'is-revealed';
const SAFETY_MS = 3000;

export function initReveal() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const revealAll = () => {
    root.classList.remove('js-reveal');
    document
      .querySelectorAll('.reveal')
      .forEach((el) => el.classList.add(REVEALED));
  };

  /* Reduced motion, or a browser without the observer: show everything and do
     nothing else. */
  if (prefersReduced.matches || !('IntersectionObserver' in window)) {
    revealAll();
    return () => {};
  }

  root.classList.add('js-reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(REVEALED);
        observer.unobserve(entry.target);
      }
    },
    {
      /* Start a little before the element reaches the fold so the movement is
         finishing, not starting, as it comes into view. */
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    }
  );

  document
    .querySelectorAll(`.reveal:not(.${REVEALED})`)
    .forEach((el) => observer.observe(el));

  /* If anything goes wrong, content must not stay invisible. */
  const safety = window.setTimeout(revealAll, SAFETY_MS);

  /* Honour the preference if it changes while the page is open. */
  const onPreferenceChange = (event) => {
    if (event.matches) {
      observer.disconnect();
      revealAll();
    }
  };
  prefersReduced.addEventListener('change', onPreferenceChange);

  return () => {
    window.clearTimeout(safety);
    observer.disconnect();
    prefersReduced.removeEventListener('change', onPreferenceChange);
  };
}
