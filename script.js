document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("siteMenuToggle");
const menu = document.getElementById("siteMenu");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && e.target !== menuToggle) {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
