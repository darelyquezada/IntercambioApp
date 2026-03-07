document.addEventListener("DOMContentLoaded", function () {
    const btnLimpiar = document.getElementById("btn-limpiar");
    const btnContinuar = document.getElementById("btnContinuar");
    const btnIntercambio = document.getElementById("btn-intecambio");
    const seccionNombre = document.getElementById("seccion-nombre");
    const inputCelebracion = document.getElementById("input-celebracion");
    const botonesCelebracion = document.querySelectorAll(".btn-celebracion");

    let nombreSeleccionado = ""; // Variable para almacenar el nombre seleccionado

    // Manejar la selección de celebración
    botonesCelebracion.forEach(boton => {
        boton.addEventListener('click', function () {
            botonesCelebracion.forEach(b => {
                b.classList.remove("border", "border-primary", "bg-primary");
                b.classList.add("border-0", "bg-secondary");
            });
            this.classList.remove("border-0", "bg-secondary");
            this.classList.add("border", "border-primary", "bg-primary");

            // Guardar el texto del botón (limpiando espacios)
            nombreSeleccionado = this.innerText.trim();

            // Si el botón no es el de "Intercambio", ocultamos seccionNombre
            if (this.id !== "btn-intecambio") {
                seccionNombre.classList.add("d-none");
                inputCelebracion.value = ""; // Limpiamos el texto escrito
                
                // También reseteamos visualmente el botón de intercambio por si estaba activo
                btnIntercambio.classList.replace("bg-primary", "bg-secondary");
                btnIntercambio.classList.remove("border", "border-primary");
                btnIntercambio.classList.add("border-0");
            }
        });
    });

    // Mostrar la sección de nombre al hacer clic en el botón "Intercambio"
    btnIntercambio.addEventListener("click", function () {
        inputCelebracion.value = ""; // Limpiar el input si se elige otro predefinido
        nombreSeleccionado = ""; // Limpiar el nombre seleccionado
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

        inputCelebracion.focus(); // Poner el cursor en el input
    });

    // Limpiar el campo de texto al hacer clic en el ícono de limpiar
    btnLimpiar.addEventListener("click", function () {
        inputCelebracion.value = "";
        inputCelebracion.focus();
    });

    btnContinuar.addEventListener('click', () => {
        // Si hay algo en el input, usamos eso. Si no, el botón.
        let nombreEvento = inputCelebracion.value.trim() || nombreSeleccionado;

        if (!nombreEvento) {
            alert("Por favor, selecciona un tipo de evento o escribe un nombre.");
            return;
        }

        // Guardar solo el nombre del evento
        localStorage.setItem('nombreEvento', nombreEvento);
        console.log("Nombre del evento guardado:", nombreEvento);
        
        // Redirigir
        window.location.href = 'presupuesto.html';
    })
});