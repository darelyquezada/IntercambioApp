document.addEventListener('DOMContentLoaded', () => {
    // Leer datos del localStorage
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const exclusiones = JSON.parse(localStorage.getItem('exclusiones')) || {};
    const datosEvento = JSON.parse(localStorage.getItem('datosEvento')) || { nombre: "Sin nombre", fecha: "Sin fecha" };
    const presupuesto = localStorage.getItem('presupuestoEvento') || "0";

    // Mostrar resumen de datos del evento
    document.getElementById('res-nombre-evento').innerText = datosEvento.nombre;
    document.getElementById('res-fecha').innerText = datosEvento.fecha;
    document.getElementById('res-presupuesto').innerText = `$${presupuesto}`;
    
    // El organizador suele ser el primer participante agregado
    document.getElementById('res-organizador').innerText = participantes[0] || "No asignado";

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
    document.getElementById('btnRealizarSorteo').addEventListener('click', () => {
        // Llamamos a la función del archivo sorteo.js
        const resultado = realizarSorteo(); 
        
        if (resultado) {
            alert("¡Sorteo realizado con éxito!");
            // Redirigir a la pantalla donde se muestran los resultados
            window.location.href = 'resultados.html';
        }
    });
});