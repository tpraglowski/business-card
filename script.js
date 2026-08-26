document.getElementById("year").textContent = new Date().getFullYear();

function wireModal(toggleId, backdropId, backId) {
  const toggle = document.getElementById(toggleId);
  const backdrop = document.getElementById(backdropId);
  const back = document.getElementById(backId);

  function open() {
    backdrop.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function close() {
    backdrop.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    open();
  });

  back.addEventListener("click", close);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

wireModal("siteMenuToggle", "menuBackdrop", "siteMenuBack");
wireModal("settingsToggle", "settingsBackdrop", "settingsBack");

// Theme: "light" | "dark" | "auto", stored locally per browser.
const THEME_KEY = "theme-preference";
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const themeButtons = document.querySelectorAll(".theme-option");

function effectiveTheme(preference) {
  return preference === "auto" ? (systemDark.matches ? "dark" : "light") : preference;
}

function applyTheme(preference) {
  document.documentElement.setAttribute("data-theme", effectiveTheme(preference));
  themeButtons.forEach((btn) => {
    btn.setAttribute("aria-checked", String(btn.dataset.themeValue === preference));
  });
}

function getPreference() {
  return localStorage.getItem(THEME_KEY) || "auto";
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const preference = btn.dataset.themeValue;
    localStorage.setItem(THEME_KEY, preference);
    applyTheme(preference);
  });
});

systemDark.addEventListener("change", () => {
  if (getPreference() === "auto") applyTheme("auto");
});

applyTheme(getPreference());
