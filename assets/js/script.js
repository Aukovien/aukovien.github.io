function toggleTheme() {
  const html = document.documentElement;
  if (html.getAttribute("data-theme") === "light") {
    html.removeAttribute("data-theme");
  } else {
    html.setAttribute("data-theme", "light");
  }
}
