document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");
  const birthDateInput = document.getElementById("nacimiento");
  const termsCheckbox = document.getElementById("terms");

  // Validar edad mínima (14 años)
  birthDateInput.addEventListener("change", function () {
    const birthDate = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate(); // Diferencia en días

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 14) {
      // Mostrar mensaje de error sin alert
      const errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      errorElement.textContent =
        "Debes tener al menos 14 años para registrarte en el torneo";
      birthDateInput.insertAdjacentElement("afterend", errorElement); // Mostrar mensaje cerca del input
      this.value = ""; // Limpiar el campo
    } else {
      // Eliminar el mensaje de error si es mayor de edad
      const errorElement = birthDateInput.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
      }
    }
  });

  // Validar contraseñas coincidentes
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!termsCheckbox.checked) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    // Aquí iría el código para enviar el formulario (puedes hacer una solicitud a un servidor)
    alert("Registro exitoso. ¡Bienvenido a Balam Cup!");
    registrationForm.reset();
  });
});
