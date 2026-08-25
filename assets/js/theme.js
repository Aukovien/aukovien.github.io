// owns data-ground on <html>
(function () {
  "use strict";

  var KEY = "aukovien-ground";
  var DEFAULT = "dark";
  var root = document.documentElement;

    // deliberately not prefers-color-scheme
  var chosen = null;
  try {
    chosen = localStorage.getItem(KEY);
  } catch (e) {
    // blocked storage
  }
  if (chosen !== "light" && chosen !== "dark") chosen = null;

  // before first paint
  root.setAttribute("data-ground", chosen || DEFAULT);

  function label(btn) {
    var now = root.getAttribute("data-ground");
    var next = now === "light" ? "dark" : "light";
    btn.textContent = next === "light" ? "\u2600" : "\u263E";
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
    btn.setAttribute("title", "Switch to " + next + " mode");
  }

  window.__ground = {
    get: function () {
      return root.getAttribute("data-ground");
    },
    set: function (v) {
      if (v !== "light" && v !== "dark") return;
      root.setAttribute("data-ground", v);
      try {
        localStorage.setItem(KEY, v);
      } catch (e) {
        // non-fatal
      }
      var btn = document.getElementById("ground-toggle");
      if (btn) label(btn);
      document.dispatchEvent(
        new CustomEvent("groundchange", { detail: v })
      );
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("ground-toggle");
    if (!btn) return;
    label(btn);
    btn.addEventListener("click", function () {
      window.__ground.set(
        root.getAttribute("data-ground") === "light" ? "dark" : "light"
      );
    });
  });
})();
