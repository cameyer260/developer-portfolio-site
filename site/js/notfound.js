// 404 page: show the path that was actually requested in the fake `cd` line.
import { select } from "/js/dom.js";

export function init(root) {
  for (const el of select(root, "[data-path]")) el.textContent = "." + decodeURI(location.pathname);
}
