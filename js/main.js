function setupDarkModeToggle() {

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
  
}

function loadFooter(containerId = 'footer-container', footerFile = '/footer.html') {
  const prefix = isRunningOnGitHubPages() ? '/resume' : '';
  fetch(prefix + footerFile)
    .then(response => response.text())
    .then(data => {
      if (prefix) data = data.replace(/src="\//g, `src="${prefix}/`);
      document.getElementById(containerId).innerHTML = data;
    });
}

function setActiveNavLink() {
  const path = window.location.pathname.replace(/^\/resume/, '');
  document.querySelectorAll('.nav-list__link').forEach(link => {
    const href = link.getAttribute('href').replace(/^\/resume/, '');
    if (href === path || (href === '/index.html' && (path === '/' || path === ''))) {
      link.classList.add('nav-list__link--active');
    }
  });
}

function loadNavbar(containerId = "navbar", navbarFile = "/navbar.html") {
  const prefix = isRunningOnGitHubPages() ? '/resume' : '';
  fetch(prefix + navbarFile)
    .then(response => response.text())
    .then(data => {
      if (prefix) {
        data = data.replace(/href="\//g, `href="${prefix}/`);
        data = data.replace(/src="\//g, `src="${prefix}/`);
      }
      document.getElementById(containerId).innerHTML = data;
      setupDarkModeToggle();
      setActiveNavLink();
    });
}

function isRunningOnGitHubPages() {
  return location.hostname.includes("github.io");
}