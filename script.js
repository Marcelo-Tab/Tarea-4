document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navItems = document.querySelector(".navitems");
  const body = document.body;
  let isMenuOpen = false;

  // Función para manejar estado del menú
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    navItems.classList.toggle("active");
    hamburger.classList.toggle("is-active");
    hamburger.setAttribute("aria-expanded", isMenuOpen);
    body.classList.toggle("no-scroll");

    // Enfocar el primer elemento del menú cuando se abre
    if (isMenuOpen) {
      const firstLink = navItems.querySelector("a");
      firstLink?.focus();
    }
  };

  // Evento click
  hamburger?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Cerrar menú con Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      toggleMenu();
      hamburger.focus();
    }
  });

  // Cerrar al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (
      isMenuOpen &&
      !navItems.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu();
    }
  });

  // Manejo de teclado para navegación
  navItems?.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && isMenuOpen) {
      const focusableElements = navItems.querySelectorAll("a, button");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
});
