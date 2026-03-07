document.addEventListener("DOMContentLoaded", function () {
    const btnLimpiar = document.getElementById("btn-limpiar");
    const btnContinuar = document.getElementById("btnContinuar");
    const botonesPrecio = document.querySelectorAll(".btn-precio");
    const seccionPresupuesto = document.getElementById("seccion-presupuesto");
    const inputPresupuesto = document.getElementById("input-presupuesto");

    let presupuestoSeleccionado = ""; // Variable para capturar el valor de los botones

    // Manejar la selección de presupuesto
    botonesPrecio.forEach(boton => {
        boton.addEventListener("click", function () {
            botonesPrecio.forEach(b => {
                b.classList.remove("border", "border-primary", "bg-primary");
                b.classList.add("border-0", "bg-secondary");
            });
            this.classList.remove("border-0", "bg-secondary");
            this.classList.add("border", "border-primary", "bg-primary");

            // Guardar el valor del botón sin el '$'
            presupuestoSeleccionado = this.innerText.replace('$', '').trim();

            if (this.id === "btn-otro") {
                seccionPresupuesto.classList.remove("d-none");
                inputPresupuesto.focus();
            } else {
                seccionPresupuesto.classList.add("d-none");
                inputPresupuesto.value = ""; // Limpiar el manual si elige predefinido
            }
        });
    });

    // Limpiar el campo de texto al hacer clic en el ícono de limpiar
    btnLimpiar.addEventListener("click", function () {
        inputPresupuesto.value = "";
        inputPresupuesto.focus();
    });

    btnContinuar.addEventListener('click', () => {
        let presupuestoFinal = "";
        // Si la sección "Otro" es visible y tiene datos, usamos el input
        if (!seccionPresupuesto.classList.contains("d-none") && inputPresupuesto.value.trim() !== "") {
            presupuestoFinal = inputPresupuesto.value.trim();
        } else { // Si no, usamos el botón seleccionado.
            presupuestoFinal = presupuestoSeleccionado;
        }

        // Validación
        if (!presupuestoFinal) {
            alert("Por favor, selecciona un presupuesto o ingresa uno manualmente.");
            return;
        }

        // Guardar en localStorage (como string simple para que coincida con tu resumen)
        localStorage.setItem('presupuestoEvento', presupuestoFinal);
        console.log("Presupuesto guardado:", presupuestoFinal);

        window.location.href = 'fecha.html';
    })
});