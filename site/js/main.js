// Entry point. Runs every feature's init(root) on first load and after every
// boosted swap or history restore (htmx fires htmx:load for new content).
import { setup } from "/js/boost.js";
import * as chrome from "/js/chrome.js";
import * as contact from "/js/contact.js";
import * as notfound from "/js/notfound.js";
import * as reveal from "/js/reveal.js";
import * as spotlight from "/js/spotlight.js";
import * as timeline from "/js/timeline.js";
import * as typewriter from "/js/typewriter.js";

// Tells the CSS failsafes (reveal, typewriter) that scripts are running.
document.documentElement.setAttribute("data-js", "");

const features = [chrome, contact, notfound, reveal, spotlight, timeline, typewriter];

setup();

htmx.onLoad((root) => {
  for (const feature of features) feature.init(root);
});
