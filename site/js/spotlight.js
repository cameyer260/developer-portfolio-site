// Pointer-following amber glow on [data-spotlight] cards. Mouse only (never
// touch or pen) and off under reduced motion. CSS: components.css.
import { reduceMotion, select } from "/js/dom.js";

const bound = new WeakSet();

const move = (event) => {
  if (event.pointerType !== "mouse" || reduceMotion.matches) return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  card.style.setProperty("--spot-o", "1");
};

const leave = (event) => {
  if (event.pointerType === "mouse") event.currentTarget.style.setProperty("--spot-o", "0");
};

// Don't let a lit card get frozen into the back/forward snapshot.
document.addEventListener("htmx:beforeHistorySave", () => {
  for (const card of document.querySelectorAll("[data-spotlight]")) card.style.removeProperty("--spot-o");
});

export function init(root) {
  for (const card of select(root, "[data-spotlight]")) {
    if (bound.has(card)) continue;
    bound.add(card);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
  }
}
