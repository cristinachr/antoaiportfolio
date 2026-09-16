// ==========================================
// 1. NAVEGACIÓN STICKY Y BOTÓN DE RETORNO
// ==========================================
const nav = document.querySelector("nav");
const scrollBtn = document.querySelector(".scroll-button a");

window.addEventListener("scroll", () => {
  const isScrolled = window.scrollY > 20;

  if (nav) {
    nav.classList.toggle("sticky", isScrolled);
  }

  if (scrollBtn) {
    scrollBtn.style.display = isScrolled ? "block" : "none";
  }
});

// ==========================================
// 2. MENÚ LATERAL RESPONSIVE (MÓVIL)
// ==========================================
const body = document.body;
const navBar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const navLinks = document.querySelectorAll(".menu li a");

const openNavMenu = () => {
  if (!navBar) return;
  navBar.classList.add("active");
  if (menuBtn) {
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
  }
  body.style.overflow = "hidden";
  if (scrollBtn) {
    scrollBtn.style.pointerEvents = "none";
  }
};

const hideNavMenu = () => {
  if (!navBar) return;
  navBar.classList.remove("active");
  if (menuBtn) {
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  }
  body.style.overflow = "auto";
  if (scrollBtn) {
    scrollBtn.style.pointerEvents = "auto";
  }
};

menuBtn?.addEventListener("click", openNavMenu);
cancelBtn?.addEventListener("click", hideNavMenu);
navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});

// ==========================================
// 3. VISOR MODAL / LIGHTBOX DE LA GALERÍA
// ==========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxTag = document.getElementById("lightbox-tag");
const lightboxClose = document.querySelector(".lightbox-close");
const galleryCards = document.querySelectorAll(".gallery-card");

const showLightbox = (src, title = "", tag = "") => {
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightboxImg.alt = title;

  if (lightboxTitle) lightboxTitle.textContent = title;
  if (lightboxTag) lightboxTag.textContent = tag;

  lightbox.classList.add("active");
  body.style.overflow = "hidden";
};

const hideLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  body.style.overflow = "auto";
};

// Eventos en tarjetas de la galería
galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const fullImg = card.getAttribute("data-full") || card.querySelector("img")?.src;
    const title = card.getAttribute("data-title") || "";
    const tag = card.getAttribute("data-tag") || "";
    if (fullImg) showLightbox(fullImg, title, tag);
  });
});

// Cerrar con botón X
lightboxClose?.addEventListener("click", hideLightbox);

// Cerrar haciendo clic fuera de la imagen (en el fondo oscuro)
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    hideLightbox();
  }
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.classList.contains("active")) {
    hideLightbox();
  }
});

// Desplazamiento interactivo al presionar el llamado del Hero
const scrollLink = document.querySelector(".hero-scroll-prompt .scroll-link");
const gallerySection = document.getElementById("galeria");

scrollLink?.addEventListener("click", (e) => {
  e.preventDefault();
  gallerySection?.scrollIntoView({ behavior: "smooth" });
});
