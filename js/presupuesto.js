document.addEventListener("DOMContentLoaded", function () {
    const btnLimpiar = document.getElementById("btn-limpiar");
    const btnContinuar = document.getElementById("btnContinuar");
    const botonesPrecio = document.querySelectorAll(".btn-precio");
    const seccionPresupuesto = document.getElementById("seccion-presupuesto");
    const inputPresupuesto = document.getElementById("input-presupuesto");

    // Manejar la selección de presupuesto
    botonesPrecio.forEach(boton => {
        boton.addEventListener("click", function () {
            botonesPrecio.forEach(b => {
                b.classList.remove("border", "border-primary", "bg-primary");
                b.classList.add("border-0", "bg-secondary");
            });
            this.classList.remove("border-0", "bg-secondary");
            this.classList.add("border", "border-primary", "bg-primary");

            if (this.id === "btn-otro") {
                seccionPresupuesto.classList.remove("d-none");
            } else {
                seccionPresupuesto.classList.add("d-none");
            }
        });
    });

    // Limpiar el campo de texto al hacer clic en el ícono de limpiar
    btnLimpiar.addEventListener("click", function () {
        inputPresupuesto.value = "";
        inputPresupuesto.focus();
    });

    btnContinuar.addEventListener('click', () => {
        window.location.href = 'fecha-hora.html';
    })
});