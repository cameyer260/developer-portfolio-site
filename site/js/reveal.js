// Scroll reveal: adds .is-revealed to [data-reveal] elements as they enter the
// viewport. CSS owns the motion, the reduced-motion fallback and the failsafe
// (components.css). Elements that enter together stagger in reading order.
import { select } from "/js/dom.js";

const watched = new WeakSet();
let observer;

const reveal = (entries) => {
  const entering = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
  entering.forEach((entry, i) => {
    entry.target.style.setProperty("--reveal-i", Math.min(i, 5));
    entry.target.classList.add("is-revealed");
    observer.unobserve(entry.target);
  });
};

export function init(root) {
  observer ??= new IntersectionObserver(reveal, { rootMargin: "0px 0px -8% 0px" });
  for (const el of select(root, "[data-reveal]")) {
    if (watched.has(el) || el.classList.contains("is-revealed")) continue;
    watched.add(el);
    observer.observe(el);
  }
}
