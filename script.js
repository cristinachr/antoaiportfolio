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

// Filtro interactivo de proyectos en la página de Portafolio
const filterButtons = document.querySelectorAll(".filter-btn");
const projectTiles = document.querySelectorAll(".project-tile");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Alternar botón activo
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const targetCategory = btn.getAttribute("data-filter");

    projectTiles.forEach((tile) => {
      const tileCategory = tile.getAttribute("data-category");

      if (targetCategory === "all" || tileCategory === targetCategory) {
        tile.style.display = "flex";
        setTimeout(() => {
          tile.style.opacity = "1";
          tile.style.transform = "scale(1)";
        }, 50);
      } else {
        tile.style.opacity = "0";
        tile.style.transform = "scale(0.96)";
        setTimeout(() => {
          tile.style.display = "none";
        }, 250);
      }
    });
  });
});
