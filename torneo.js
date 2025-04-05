document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.getElementById("filter-btn");
  const filterOptions = document.getElementById("filter-options");
  const scheduleFilter = document.querySelector(".schedule-filter");
  const tournamentCards = document.querySelectorAll(".tournament-card");
  const filterOptionsList = document.querySelectorAll(".filter-option");

  // Mostrar/ocultar opciones de filtro
  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    scheduleFilter.classList.toggle("active");
    filterOptions.style.display = scheduleFilter.classList.contains("active")
      ? "block"
      : "none";
    updateButtonArrow();
  });

  // Cerrar filtro al hacer clic fuera
  document.addEventListener("click", function () {
    if (scheduleFilter.classList.contains("active")) {
      scheduleFilter.classList.remove("active");
      filterOptions.style.display = "none";
      updateButtonArrow();
    }
  });

  // Filtrar torneos
  filterOptionsList.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      const timeFilter = this.getAttribute("data-time");

      // Actualizar opción activa
      filterOptionsList.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      // Actualizar texto del botón
      filterBtn.innerHTML = `${this.textContent} <span class="arrow">▼</span>`;

      // Filtrar tarjetas
      tournamentCards.forEach((card) => {
        if (timeFilter === "all") {
          card.style.display = "block";
        } else {
          card.style.display =
            card.getAttribute("data-time") === timeFilter ? "block" : "none";
        }
      });

      // Cerrar el menú
      scheduleFilter.classList.remove("active");
      filterOptions.style.display = "none";
      updateButtonArrow();
    });
  });

  // Función para actualizar la flecha del botón
  function updateButtonArrow() {
    const arrow = scheduleFilter.classList.contains("active") ? "▲" : "▼";
    filterBtn.innerHTML = `${filterBtn.textContent.replace(
      /[▲▼]/g,
      ""
    )} <span class="arrow">${arrow}</span>`;
  }

  // Activar "Todos" por defecto
  filterOptionsList[0].click();
});
