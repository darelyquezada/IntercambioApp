document.addEventListener("DOMContentLoaded", function () {
    const botonComenzar = document.getElementById("comenzar");
    botonComenzar.addEventListener("click", function () {
        window.location.href = "../pages/Inicio-evento.html";
    });

    // Usamos Intersection Observer para detectar cuando la sección entra en pantalla
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            // Si el elemento es visible en al menos un 15%
            if (entrada.isIntersecting) {
                // Le agregamos la clase 'show' de Bootstrap para que la clase 'fade' se vuelva visible
                entrada.target.classList.add('show');
                // Dejamos de observarlo para que la animación solo ocurra la primera vez
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del contenedor es visible
    });

    // Le decimos al observador que vigile nuestro contenedor oculto
    const seccionOculta = document.getElementById("contenido-oculto");
    if (seccionOculta) {
        observador.observe(seccionOculta);
    }
});
