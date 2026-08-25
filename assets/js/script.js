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
  // keyboard parity
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

const statusLines = [
  "still fuming about gradimages charging 100 for my grad pics",
  "wondering why this segfault only happens on the third run",
  "saying 'good question' to a question I don't have the answer to",
  "debugging someone else's PHP",
  "trying to shave two seconds off a stage in dirt rally",
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
  }, 6000);
}
