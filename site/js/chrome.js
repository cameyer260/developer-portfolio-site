// Shared chrome: close the mobile nav popover once a link is chosen (same-page
// anchors don't replace the header), and keep the footer year current ([data-current-year]).
import { select } from "/js/dom.js";

const bound = new WeakSet();

export function init(root) {
  for (const nav of select(root, "#site-nav")) {
    if (bound.has(nav) || typeof nav.hidePopover !== "function") continue;
    bound.add(nav);
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a") && nav.matches(":popover-open")) nav.hidePopover();
    });
  }
  for (const el of select(root, "[data-current-year]")) el.textContent = new Date().getFullYear();
}
