// `root` itself (if it matches) plus its matching descendants. htmx.onLoad hands
// inits each new top-level element, so a match can be the root.
export const select = (root, selector) => [
  ...(root.matches?.(selector) ? [root] : []),
  ...root.querySelectorAll(selector),
];

export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
