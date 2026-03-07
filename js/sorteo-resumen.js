document.addEventListener('DOMContentLoaded', () => {
    const btnSorteo = document.getElementById('btnRealizarSorteo');
    // Leer datos del localStorage
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const exclusiones = JSON.parse(localStorage.getItem('exclusiones')) || {};
    const nombreEvento = localStorage.getItem('nombreEvento') || "Sin nombre";
    const fechaEvento = localStorage.getItem('fechaEvento') || "Sin fecha";
    const presupuesto = localStorage.getItem('presupuestoEvento') || "0";
    const organizador = localStorage.getItem("organizador") || "No asignado";

    // Mostrar resumen de datos del evento
    document.getElementById('res-nombre-evento').innerText = nombreEvento;
    document.getElementById('res-fecha').innerText = fechaEvento;
    document.getElementById('res-presupuesto').innerText = `$${presupuesto}`;
    document.getElementById('res-organizador').innerText = organizador || "No asignado";

    // Mostrar relación de participantes y sus exclusiones
    const contenedorLista = document.getElementById('lista-resumen');
    
    participantes.forEach(persona => {
        const prohibidos = exclusiones[persona] ? exclusiones[persona].join(', ') : 'Ninguna';
        
        const item = document.createElement('div');
        item.className = 'list-group-item p-3';
        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-capitalize">${persona}</span>
                <span class="badge bg-light text-dark border fw-normal">Participante</span>
            </div>
            <div class="mt-1">
                <small class="text-muted">
                    <i class="bi bi-x-circle me-1"></i> No puede regalar a: 
                    <span class="text-danger">${prohibidos}</span>
                </small>
            </div>
        `;
        contenedorLista.appendChild(item);
    });

    // Función que muestra una animación de confetti y una alerta en la pantalla
    function alertarConConfetti() {
        // Animación de confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0d6efd', '#ff0000', '#28a745', '#ffc107'] // Paleta de colores
        });

        // Mostrar la alerta de éxito (success)
        Swal.fire({
            title: '¡Sorteo realizado!',
            text: 'Las parejas se han generado correctamente. ¡Tiempo de conocer quién recibirá tu regalo!',
            icon: 'success',
            confirmButtonText: 'Ver resultados',
            confirmButtonColor: '#198754', // Bootstrap
            customClass: {
                popup: 'rounded-4 shadow-lg' // Bootstrap
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir a la pantalla donde arrastran el regalo
                window.location.href = '../pages/sorteo-resultados.html'; 
            }
        });
    }

    // Cuando se haga click en "Realizar Sorteo Ahora", se llama a la función del sorteo y luego se redirige a la pantalla para ver quien te tocó
    btnSorteo.addEventListener('click', () => {
        // Llamamos a la función del archivo sorteo.js
        const resultado = realizarSorteo(); 
        
        if (resultado) {
            alertarConConfetti(); // Llamar función con la animación de confetti
        } else {
            // Si las exclusiones hacen imposible el sorteo
            Swal.fire({
                title: '¡Imposible realizar el sorteo!',
                text: 'Las reglas de exclusión son muy estrictas y no permiten asignar a todos. Intenta quitar algunas restricciones.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    });
});