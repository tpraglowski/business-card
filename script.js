document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Loader ----------

const loader = document.getElementById("loader");
const MIN_LOADER_MS = 500;
const loaderStart = Date.now();

function hideLoader() {
  const elapsed = Date.now() - loaderStart;
  const wait = Math.max(0, MIN_LOADER_MS - elapsed);
  setTimeout(() => loader.classList.add("loader--hidden"), wait);
}

if (document.readyState === "complete") {
  hideLoader();
} else {
  window.addEventListener("load", hideLoader);
}

// ---------- Modals (site menu / settings) ----------

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

// ---------- Theme: "light" | "dark" | "auto", stored locally per browser ----------

const THEME_KEY = "theme-preference";
const THEME_ORDER = ["light", "dark", "auto"];
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const themeButtons = document.querySelectorAll(".theme-option");
const themeThumb = document.getElementById("themeThumb");

function effectiveTheme(preference) {
  return preference === "auto" ? (systemDark.matches ? "dark" : "light") : preference;
}

function applyTheme(preference) {
  document.documentElement.setAttribute("data-theme", effectiveTheme(preference));
  const index = THEME_ORDER.indexOf(preference);
  themeThumb.style.transform = `translateX(${index * 100}%)`;
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

// ---------- Copy email to clipboard ----------

const emailButton = document.getElementById("emailCopy");
const emailLabel = document.getElementById("emailCopyLabel");
const emailAddress = emailButton.dataset.email;
let copyResetTimer = null;

function legacyCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

function showCopied() {
  clearTimeout(copyResetTimer);
  emailButton.classList.remove("copied");
  void emailButton.offsetWidth;
  emailButton.classList.add("copied");
  emailLabel.textContent = "✓ Skopiowano!";

  copyResetTimer = setTimeout(() => {
    emailButton.classList.remove("copied");
    emailLabel.textContent = emailAddress;
  }, 1600);
}

emailButton.addEventListener("click", () => {
  if (legacyCopy(emailAddress)) {
    showCopied();
    return;
  }

  navigator.clipboard
    .writeText(emailAddress)
    .then(showCopied)
    .catch(() => {});
});
