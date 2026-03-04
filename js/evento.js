document.addEventListener("DOMContentLoaded", function () {
    const btnLimpiar = document.getElementById("btn-limpiar");
    const btnContinuar = document.getElementById("btnContinuar");
    const btnIntercambio = document.getElementById("btn-intecambio");
    const seccionNombre = document.getElementById("seccion-nombre");
    const inputCelebracion = document.getElementById("input-celebracion");
    const botonesCelebracion = document.querySelectorAll(".btn-celebracion");

    // Manejar la selección de celebración
    botonesCelebracion.forEach(boton => {
        boton.addEventListener('click', function () {
            botonesCelebracion.forEach(b => {
                b.classList.remove("border", "border-primary", "bg-primary");
                b.classList.add("border-0", "bg-secondary");
            });
            this.classList.remove("border-0", "bg-secondary");
            this.classList.add("border", "border-primary", "bg-primary");
        });
    });

    // Mostrar la sección de nombre al hacer clic en el botón "Intercambio"
    btnIntercambio.addEventListener("click", function () {
        seccionNombre.classList.toggle("d-none");

        if (seccionNombre.classList.contains("d-none")) {
            btnIntercambio.classList.replace("bg-primary", "bg-secondary");
            btnIntercambio.classList.remove("border", "border-primary");
            btnIntercambio.classList.add("border-0");
        } else {
            btnIntercambio.classList.replace("bg-secondary", "bg-primary");
            btnIntercambio.classList.remove("border-0");
            btnIntercambio.classList.add("border", "border-primary");
        }

    });

    // Limpiar el campo de texto al hacer clic en el ícono de limpiar
    btnLimpiar.addEventListener("click", function () {
        inputCelebracion.value = "";
        inputCelebracion.focus();
    });

    btnContinuar.addEventListener('click', () => {
        window.location.href = 'presupuesto.html';
    })
});