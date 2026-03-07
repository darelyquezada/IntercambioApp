document.addEventListener("DOMContentLoaded", function() {
    let nombres = JSON.parse(localStorage.getItem('participantes')) || [];
    
    // Mezclar arreglo (Fisher-Yates)
    for (let i = nombres.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nombres[i], nombres[j]] = [nombres[j], nombres[i]];
    }

    // 2. REFERENCIAS AL DOM
    const cajaRegalo = document.getElementById("caja-regalo");
    const zonaSoltar = document.getElementById("zona-soltar");
    const contadorNombres = document.getElementById("contador-nombres");
    const casillaVacia = document.getElementById("casilla-vacia");
    const casillaNombre = document.getElementById("casilla-nombre");
    const nombreMostrado = document.getElementById("nombre-mostrado");
    const seccionFinalizar = document.getElementById("seccion-finalizar");
    const btnFinalizar = document.getElementById("btnFinalizar");
    
    let sorteoEnCurso = false;

    contadorNombres.innerText = nombres.length;

    // --------------------------------------------------------
    // FUNCIÓN CENTRAL: REVELAR NOMBRE
    // --------------------------------------------------------
    function revelarNombre() {
    if (nombres.length === 0 || sorteoEnCurso) return;
    sorteoEnCurso = true;

    // Ocultar texto anterior
    casillaNombre.classList.add("d-none");
    casillaNombre.classList.remove("fade", "show");
    
    // Sacar nombre
    const nombreExtraido = nombres.pop();
    nombreMostrado.innerText = nombreExtraido;
    contadorNombres.innerText = nombres.length;

    // Mostrar nuevo nombre
    casillaVacia.classList.add("d-none");
    casillaNombre.classList.remove("d-none");
    
    setTimeout(() => {
        casillaNombre.classList.add("fade", "show");
        sorteoEnCurso = false;

        // Si se acabaron los nombres
        if (nombres.length === 0) {
        cajaRegalo.setAttribute("draggable", "false"); // Desactivar drag
        cajaRegalo.classList.add("opacity-50");
        seccionFinalizar.classList.remove("d-none");
        setTimeout(() => seccionFinalizar.classList.add("show"), 50);
        }
    }, 50);
    }

    // --------------------------------------------------------
    // EVENTOS DE DRAG AND DROP (Para PC)
    // --------------------------------------------------------

    // Al empezar a arrastrar el regalo
    cajaRegalo.addEventListener("dragstart", (e) => {
    if (nombres.length === 0) return e.preventDefault();
    
    // Es necesario setear data para que Firefox permita el arrastre
    e.dataTransfer.setData("text/plain", "regalo");
    
    // Hacemos que la caja original se vea medio transparente mientras se arrastra
    setTimeout(() => cajaRegalo.classList.add("opacity-50"), 0);
    });

    // Al soltar (o cancelar) el arrastre en cualquier lado
    cajaRegalo.addEventListener("dragend", () => {
    cajaRegalo.classList.remove("opacity-50");
    });

    // Cuando el regalo pasa por encima de la zona de soltar
    zonaSoltar.addEventListener("dragover", (e) => {
    e.preventDefault(); // OBLIGATORIO para permitir que se pueda soltar
    // Cambiamos el color de fondo para dar feedback visual (más azul)
    zonaSoltar.classList.replace("bg-opacity-10", "bg-opacity-25");
    zonaSoltar.classList.add("border-4"); // Hacemos el borde más grueso
    });

    // Cuando el regalo sale de la zona de soltar sin soltarlo
    zonaSoltar.addEventListener("dragleave", () => {
    // Regresamos a los estilos normales
    zonaSoltar.classList.replace("bg-opacity-25", "bg-opacity-10");
    zonaSoltar.classList.remove("border-4");
    });

    // Cuando finalmente SUELTAN el regalo dentro de la casilla
    zonaSoltar.addEventListener("drop", (e) => {
    e.preventDefault();
    
    // Restaurar estilos de la casilla
    zonaSoltar.classList.replace("bg-opacity-25", "bg-opacity-10");
    zonaSoltar.classList.remove("border-4");
    
    // Ejecutar el sorteo
    revelarNombre();
    });

    // --------------------------------------------------------
    // EVENTO DE CLIC (Fallback para Móviles)
    // --------------------------------------------------------
    cajaRegalo.addEventListener("click", () => {
    if (nombres.length === 0 || sorteoEnCurso) return;
    
    // Animación rápida de agitar antes de revelar (solo al hacer clic)
    const animacion = cajaRegalo.animate([
        { transform: 'rotate(10deg) scale(1.05)' },
        { transform: 'rotate(-10deg) scale(1.05)' },
        { transform: 'rotate(0deg) scale(1)' }
    ], { duration: 300 });

    animacion.onfinish = revelarNombre;
    });
    btnFinalizar.addEventListener("click", () => {
    window.location.href = "#";
    });
});
