// Journey timeline: the big year in the sticky aside (desktop only, purely
// decorative and aria-hidden) follows the entry at the middle of the viewport.
import { reduceMotion, select } from "/js/dom.js";

const bound = new WeakSet();

export function init(root) {
  for (const list of select(root, "[data-timeline]")) {
    if (bound.has(list)) continue;
    bound.add(list);
    const year = list.closest(".timeline")?.querySelector("[data-timeline-year]");
    if (!year) continue;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const next = entry.target.dataset.year;
          if (!entry.isIntersecting || year.textContent === next) continue;
          year.textContent = next;
          if (!reduceMotion.matches) {
            year.animate(
              [{ opacity: 0, transform: "translateY(0.12em)" }, { opacity: 1, transform: "none" }],
              { duration: 350, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
            );
          }
        }
      },
      { rootMargin: "-49% 0px -50% 0px" },
    );
    for (const item of list.querySelectorAll("[data-year]")) observer.observe(item);
  }
}
