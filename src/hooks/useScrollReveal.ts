import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to elements matching `[data-reveal]`
 * so they fade, slide, or zoom in cleanly as the user scrolls down.
 * Elements already in or above the initial viewport reveal immediately.
 */
export function useScrollReveal(dependencyKey?: string) {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    );

    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [dependencyKey]);
}
