// hx-boost glue: page-swap transitions, same-page anchors, history edge cases,
// failure fallback and focus. Runs once per full page load.
import { reduceMotion } from "/js/dom.js";

const pathOf = (url) => {
  const { pathname, search } = new URL(url, location.href);
  return pathname + search;
};

// The page whose content is on screen. Hash-only history entries share it.
let shownPath = pathOf(location.href);

const root = document.documentElement;
const instantScroll = () => root.setAttribute("data-swapping", "");
// htmx restores history scroll in a setTimeout, so wait past it.
const smoothScroll = () => setTimeout(() => root.removeAttribute("data-swapping"), 100);

export function setup() {
  const syncTransitions = () => {
    htmx.config.globalViewTransitions = !reduceMotion.matches;
  };
  syncTransitions();
  reduceMotion.addEventListener("change", syncTransitions);

  // A boosted link to the page already on screen (e.g. "/#work" while on "/")
  // would refetch and re-swap it. Do a native fragment navigation instead.
  document.addEventListener("htmx:confirm", (event) => {
    const link = event.detail.elt;
    if (!(link instanceof HTMLAnchorElement) || !link.hash) return;
    if (pathOf(link.href) !== shownPath) return;
    event.preventDefault();
    location.assign(link.href);
  });

  // Going back from a same-page "#anchor" entry lands on an htmx history entry
  // for the page already on screen. Let the browser restore scroll natively.
  document.addEventListener("htmx:historyCacheHit", (event) => {
    if (event.detail.path === shownPath) event.preventDefault();
    else instantScroll();
  });
  document.addEventListener("htmx:pushedIntoHistory", (event) => {
    shownPath = pathOf(event.detail.path);
  });
  document.addEventListener("htmx:historyRestore", (event) => {
    shownPath = pathOf(event.detail.path);
  });

  // CSS smooth scrolling would animate htmx's own scrolls (to the top, to a
  // cross-page #anchor, back to a restored position). Keep those instant.
  document.addEventListener("htmx:beforeSwap", (event) => {
    if (event.detail.boosted) instantScroll();
  });
  document.addEventListener("htmx:afterSettle", smoothScroll);
  document.addEventListener("htmx:historyRestore", smoothScroll);
  // Back/forward between same-page #anchor entries: popstate fires just before
  // the browser restores the scroll position, which would otherwise animate.
  window.addEventListener("popstate", () => {
    instantScroll();
    smoothScroll();
  });

  // If a boosted request fails (404, network error), do a full navigation so
  // the browser shows whatever the server returns.
  const fallback = (event) => {
    if (!event.detail.boosted) return;
    const { requestPath, anchor } = event.detail.pathInfo;
    location.assign(requestPath + (anchor ? "#" + anchor : ""));
  };
  document.addEventListener("htmx:responseError", fallback);
  document.addEventListener("htmx:sendError", fallback);

  // After a boosted swap, move focus to the anchor target or the main content,
  // so keyboard and screen-reader users start on the new page, not on <body>.
  document.addEventListener("htmx:afterSettle", (event) => {
    if (!event.detail.boosted || event.detail.elt !== document.body) return;
    const { anchor } = event.detail.pathInfo;
    const target = (anchor && document.getElementById(anchor)) || document.getElementById("main");
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
}
