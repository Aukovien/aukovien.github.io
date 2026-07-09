const dot = document.getElementById("dot");
const ring = document.getElementById("ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});

(function moveRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(moveRing);
})();

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    dot.style.width = "16px";
    dot.style.height = "16px";
    ring.style.width = "48px";
    ring.style.height = "48px";
    ring.style.opacity = "0.65";
  });
  el.addEventListener("mouseleave", () => {
    dot.style.width = "8px";
    dot.style.height = "8px";
    ring.style.width = "32px";
    ring.style.height = "32px";
    ring.style.opacity = "0.4";
  });
});

let popupTimer = null;

function showPopup(msg, duration = 3800) {
  const p = document.getElementById("popup");
  clearTimeout(popupTimer);
  p.textContent = msg;
  p.classList.add("showing");
  popupTimer = setTimeout(() => p.classList.remove("showing"), duration);
}

let aliasClicks = 0;
const aliasLines = [
  "it's a username. it doesn't have a meaning.",
  "still just a username.",
  "ok you really want to know, huh",
  "aukovien. I made it up in 2019. it stuck.",
  "you can stop clicking now :)",
  "...or don't. I respect the curiosity.",
];

const theAlias = document.getElementById("the-alias");
if (theAlias) {
  theAlias.addEventListener("click", () => {
    showPopup(aliasLines[Math.min(aliasClicks, aliasLines.length - 1)]);
    aliasClicks++;
  });
  // keyboard parity for the easter egg
  theAlias.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showPopup(aliasLines[Math.min(aliasClicks, aliasLines.length - 1)]);
      aliasClicks++;
    }
  });
}

const konamiSeq = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIdx = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSecret();
    closeMobileNav();
    return;
  }
  konamiIdx =
    e.key === konamiSeq[konamiIdx]
      ? konamiIdx + 1
      : e.key === konamiSeq[0]
        ? 1
        : 0;
  if (konamiIdx === konamiSeq.length) {
    const secret = document.getElementById("secret-screen");
    if (secret) secret.classList.add("showing");
    konamiIdx = 0;
  }
});

function closeSecret() {
  const secret = document.getElementById("secret-screen");
  if (secret) secret.classList.remove("showing");
}

const secretScreen = document.getElementById("secret-screen");
if (secretScreen) {
  secretScreen.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeSecret();
  });
}

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    mobileNav.setAttribute("aria-hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

function closeMobileNav() {
  if (hamburger && mobileNav) {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

const numWatcher = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const duration = 1100;
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
      numWatcher.unobserve(el);
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll("[data-target]")
  .forEach((el) => numWatcher.observe(el));

const statusLines = [
  "still fuming about gradimages charging 100 for my grad pics",
  "wondering why this segfault only happens on the third run",
  "saying 'good question' to a question I don't have the answer to",
  "debugging someone else's PHP. praying.",
  "convinced this binary has feelings and is hiding something",
  "staring at assembly and pretending to understand it immediately",
  "trying to shave two seconds off a stage in dirt rally. failing.",
  "reducing a sauce and a stack trace at the same time",
  "arguing with a co-driver who is, annoyingly, always right",
];

const nowEl = document.getElementById("now-text");
if (nowEl) {
  let nowIdx = Math.floor(Math.random() * statusLines.length);
  nowEl.textContent = statusLines[nowIdx];

  setInterval(() => {
    nowEl.style.opacity = "0";
    setTimeout(() => {
      nowIdx = (nowIdx + 1) % statusLines.length;
      nowEl.textContent = statusLines[nowIdx];
      nowEl.style.opacity = "1";
    }, 420);
  }, 4200);
}
