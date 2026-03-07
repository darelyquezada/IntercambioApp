document.addEventListener("DOMContentLoaded", function() {
    // 1. Cargar los resultados ya sorteados
    let resultadosSorteo = JSON.parse(localStorage.getItem('resultadoSorteo')) || [];
    
    // 2. Referencias al DOM
    const cajaRegalo = document.getElementById("caja-regalo");
    const zonaSoltar = document.getElementById("zona-soltar");
    const contadorNombres = document.getElementById("contador-nombres");
    const casillaVacia = document.getElementById("casilla-vacia");
    const casillaNombre = document.getElementById("casilla-nombre");
    const nombreMostrado = document.getElementById("nombre-mostrado");
    const quienRegalaTexto = document.getElementById("quien-regala");
    const seccionFinalizar = document.getElementById("seccion-finalizar");
    const btnFinalizar = document.getElementById("btnFinalizar");
    
    let sorteoEnCurso = false;

    // Función para actualizar Turno y Contador
    function actualizarInterfaz() {
        contadorNombres.innerText = resultadosSorteo.length;
        if (resultadosSorteo.length > 0) {
            quienRegalaTexto.innerText = resultadosSorteo[0].quienRegala;
        } else {
            document.getElementById("seccion-turno").classList.add("d-none");
        }
    }

    // Función para revelar el nombre 
    function revelarNombre() {
        if (resultadosSorteo.length === 0 || sorteoEnCurso) return;
        sorteoEnCurso = true;

        // Ocultar nombre anterior para la animación
        casillaNombre.classList.add("d-none");
        casillaNombre.classList.remove("fade", "show");

        // Sacar la pareja actual
        const parejaActual = resultadosSorteo.shift(); 
        const nombreReceptor = parejaActual.aQuienLeRegala;

        nombreMostrado.innerText = nombreReceptor;
        
        // Guardar el estado actual en LocalStorage por si refrescan la página
        localStorage.setItem('resultadoSorteo', JSON.stringify(resultadosSorteo));

        // Cambiar vistas
        casillaVacia.classList.add("d-none");
        casillaNombre.classList.remove("d-none");
        
        setTimeout(() => {
            casillaNombre.classList.add("fade", "show");
            setTimeout(() => {
                if (resultadosSorteo.length > 0) {
                    // Animación de salida del nombre
                    casillaNombre.classList.remove("show");
                    
                    setTimeout(() => {
                        casillaNombre.classList.add("d-none");
                        casillaVacia.classList.remove("d-none"); // Volver a mostrar "Suelta aquí"
                        actualizarInterfaz(); // Mostrar el siguiente dador
                        sorteoEnCurso = false; // Permitir el siguiente arrastre
                    }, 400); // Tiempo de la transición de salida
                } else {
                    // Si ya no quedan más, solo finalizamos el sorteo
                    sorteoEnCurso = false;
                    actualizarInterfaz();
                    mostrarFinal();
                }
            }, 3000); // Después de 3 segs el nombre desaparece
            
        }, 100);
    }

    // Función para mostrar sección Finalizar
    function mostrarFinal() {
        cajaRegalo.setAttribute("draggable", "false");
        cajaRegalo.classList.add("opacity-50");
        seccionFinalizar.classList.remove("d-none");
        setTimeout(() => seccionFinalizar.classList.add("show"), 50);
    }

    // Events Listeners para Drag & Drop
    cajaRegalo.addEventListener("dragstart", (e) => {
        if (resultadosSorteo.length === 0) return e.preventDefault();
        e.dataTransfer.setData("text/plain", "regalo");
        setTimeout(() => cajaRegalo.classList.add("opacity-50"), 0);
    });

    cajaRegalo.addEventListener("dragend", () => {
        cajaRegalo.classList.remove("opacity-50");
    });

    zonaSoltar.addEventListener("dragover", (e) => {
        e.preventDefault();
        zonaSoltar.classList.replace("bg-opacity-10", "bg-opacity-25");
        zonaSoltar.classList.add("border-4");
    });

    zonaSoltar.addEventListener("dragleave", () => {
        zonaSoltar.classList.replace("bg-opacity-25", "bg-opacity-10");
        zonaSoltar.classList.remove("border-4");
    });

    zonaSoltar.addEventListener("drop", (e) => {
        e.preventDefault();
        zonaSoltar.classList.replace("bg-opacity-25", "bg-opacity-10");
        zonaSoltar.classList.remove("border-4");
        revelarNombre();
    });

    cajaRegalo.addEventListener("click", () => {
        if (resultadosSorteo.length === 0 || sorteoEnCurso) return;
        const animacion = cajaRegalo.animate([
            { transform: 'rotate(10deg) scale(1.05)' },
            { transform: 'rotate(-10deg) scale(1.05)' },
            { transform: 'rotate(0deg) scale(1)' }
        ], { duration: 300 });
        animacion.onfinish = revelarNombre;
    });

    btnFinalizar.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

    // Iniciar la primera vez
    actualizarInterfaz();
});