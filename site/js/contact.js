// Contact form ([data-contact]): posts to Web3Forms with fetch and shows the
// sending, success and error states. Without JS the form posts natively to
// Web3Forms. The form opts out of hx-boost in the markup.
import { select } from "/js/dom.js";

const bound = new WeakSet();

const parts = (wrap) => ({
  form: wrap.querySelector("form"),
  submit: wrap.querySelector("[type=submit]"),
  label: wrap.querySelector("[data-submit-label]"),
  error: wrap.querySelector("[data-contact-error]"),
  success: wrap.querySelector("[data-contact-success]"),
});

const setSending = ({ submit, label }, sending) => {
  submit.disabled = sending;
  label.textContent = sending ? "Sending…" : "Send";
};

// The back/forward snapshot should never restore a half-finished send.
document.addEventListener("htmx:beforeHistorySave", () => {
  for (const wrap of document.querySelectorAll("[data-contact]")) setSending(parts(wrap), false);
});

async function send(event) {
  event.preventDefault();
  const wrap = event.currentTarget.closest("[data-contact]");
  const ui = parts(wrap);
  ui.error.hidden = true;
  setSending(ui, true);
  try {
    const response = await fetch(ui.form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(ui.form),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message || "Submission failed");
    ui.form.reset();
    ui.form.hidden = true;
    ui.success.hidden = false;
    ui.success.focus();
  } catch {
    ui.error.hidden = false;
  } finally {
    setSending(ui, false);
  }
}

function sendAnother(event) {
  const ui = parts(event.currentTarget.closest("[data-contact]"));
  ui.success.hidden = true;
  ui.form.hidden = false;
  ui.form.querySelector("input:not([type=hidden], [hidden])")?.focus();
}

export function init(root) {
  for (const wrap of select(root, "[data-contact]")) {
    if (bound.has(wrap)) continue;
    bound.add(wrap);
    const ui = parts(wrap);
    ui.form.addEventListener("submit", send);
    wrap.querySelector("[data-send-another]").addEventListener("click", sendAnother);
  }
}
