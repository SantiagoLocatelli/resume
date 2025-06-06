const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Checking the dark mode at the system settings level
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  btnDarkMode.classList.add("dark-mode-btn--active");
  document.body.classList.add("dark");
}

// 2. Checking dark mode in localStorage
if (localStorage.getItem("darkMode") === "dark") {
  btnDarkMode.classList.add("dark-mode-btn--active");
  document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
  btnDarkMode.classList.remove("dark-mode-btn--active");
  document.body.classList.remove("dark");
}

// If system settings change, update the theme
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    const newColorScheme = event.matches ? "dark" : "light";

    if (newColorScheme === "dark") {
      btnDarkMode.classList.add("dark-mode-btn--active");
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "dark");
    } else {
      btnDarkMode.classList.remove("dark-mode-btn--active");
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "light");
    }
  });

// Toggle dark mode with a button click
btnDarkMode.onclick = function () {
  btnDarkMode.classList.toggle("dark-mode-btn--active");
  const isDark = document.body.classList.toggle("dark");

  if (isDark) {
    localStorage.setItem("darkMode", "dark");
  } else {
    localStorage.setItem("darkMode", "light");
  }
};

if (someValue === userValue) {
  console.log("True");
} else {
  console.log("False");
}

// load-navbar.js
function loadNavbar(containerId = "navbar", navbarFile = "/navbar.html") {
  fetch(navbarFile)
    .then(response => response.text())
    .then(data => {
      document.getElementById(containerId).innerHTML = data;

      highlightActiveLink();
      setupDarkModeToggle();
    });
}

function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-list__link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if ((currentPath === "/" && href === "index.html") || currentPath.endsWith(href)) {
      link.classList.add("nav-list__link--active");
    }
  });
}

function setupDarkModeToggle() {
  const darkModeBtn = document.querySelector(".dark-mode-btn");

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  }

  // Aplicar tema guardado
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}
