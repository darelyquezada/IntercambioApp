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
    document.getElementById('res-presupuesto').innerText = `${presupuesto}`;
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

    // Cuando se haga click en "Realizar Sorteo Ahora", se llama a la función del sorteo y luego se redirige a la pantalla para ver quien te tocó
    btnSorteo.addEventListener('click', () => {
        // Llamamos a la función del archivo sorteo.js
        const resultado = realizarSorteo(); 
        
        if (resultado) {
            alert("¡Sorteo realizado con éxito!");
            // Redirigir a la pantalla donde se muestran los resultados
            window.location.href = 'sorteo-resultados.html';
        }
    });
});