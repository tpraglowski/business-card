document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("siteMenuToggle");
const backdrop = document.getElementById("menuBackdrop");
const backButton = document.getElementById("siteMenuBack");

function openMenu() {
  backdrop.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  backdrop.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  openMenu();
});

backButton.addEventListener("click", closeMenu);

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
