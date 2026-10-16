// Types out [data-typewriter] text (the hero `whoami`). The full text is in the
// HTML for no-JS and screen readers; CSS hides it until typing starts
// (sections.css). Static under reduced motion. Typing re-runs on every fresh
// load or boosted swap; a back/forward restore shows the finished text.
import { reduceMotion, select } from "/js/dom.js";

const SPEED = 45; // ms per character
const START_DELAY = 450;
const done = new WeakSet();

const finish = (el) => {
  el.removeAttribute("data-typing");
  el.setAttribute("data-typed", "");
};

// A snapshot taken mid-typing would restore half-typed text.
document.addEventListener("htmx:beforeHistorySave", () => {
  for (const el of document.querySelectorAll("[data-typewriter][data-typing]")) {
    el.querySelector(".typewriter__typed").textContent = el.dataset.text;
    el.querySelector(".typewriter__rest").textContent = "";
    finish(el);
  }
});

function type(el) {
  const text = (el.dataset.text ??= el.textContent);
  const cursor = el.querySelector(".cursor");
  const typed = document.createElement("span");
  const rest = document.createElement("span");
  const visual = document.createElement("span");
  const label = document.createElement("span");
  typed.className = "typewriter__typed";
  rest.className = "typewriter__rest";
  visual.setAttribute("aria-hidden", "true");
  label.className = "sr-only";
  label.textContent = text;
  visual.append(typed, cursor ?? "", rest);
  el.replaceChildren(label, visual);

  let i = 0;
  const step = () => {
    typed.textContent = text.slice(0, i);
    rest.textContent = text.slice(i);
    if (i++ < text.length && el.isConnected) setTimeout(step, SPEED);
    else finish(el);
  };
  rest.textContent = text;
  el.setAttribute("data-typing", "");
  setTimeout(step, START_DELAY);
}

export function init(root) {
  for (const el of select(root, "[data-typewriter]")) {
    if (done.has(el) || el.hasAttribute("data-typed")) continue;
    done.add(el);
    if (reduceMotion.matches) finish(el);
    else type(el);
  }
}
