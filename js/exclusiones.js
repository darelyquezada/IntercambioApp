document.addEventListener('DOMContentLoaded', () => {
    const seccionPregunta = document.getElementById('seccionPregunta');
    const seccionLista = document.getElementById('seccionListaExclusiones');
    const contenedor = document.getElementById('contenedorParticipantes');
    
    // Carga de participantes del localStorage 
    const participantes = JSON.parse(localStorage.getItem('participantes'));

    // Mostrar sección de exclusiones 
    document.getElementById('btnSiExclusiones').addEventListener('click', () => {
        seccionPregunta.classList.add('hidden');
        seccionLista.classList.remove('hidden');
        renderizarExclusiones();
    });

    // Función para crear la lista con casillas de verificación 
    function renderizarExclusiones() {
        const participantes = JSON.parse(localStorage.getItem('participantes')) || ["Gina", "Liz", "Lalo"];
        const contenedor = document.getElementById('contenedorParticipantes');
        contenedor.innerHTML = '';

        participantes.forEach((persona, index) => {
            const card = document.createElement('div');
            // Estilos para la card de cada participante
            card.className = 'card border-0 shadow-sm rounded-4 mb-3 p-3';
            // Crear checkboxes para excluir a otros participantes (sin contar a sí mismo)
            const opciones = participantes
                .filter(p => p !== persona)
                .map(p => `
                    <label class="list-group-item list-group-item-action border-0 rounded-3 mb-1 d-flex align-items-center">
                        <input class="form-check-input me-3 check-excluir" type="checkbox" value="${p}" data-origen="${persona}">
                        <span class="small">${p}</span>
                    </label>
                `).join('');

            card.innerHTML = `
                <p class="fw-bold text-dark mb-2 ps-1">${persona}</p>
                
                <button class="btn btn-light w-100 rounded-3 d-flex justify-content-between align-items-center py-2 border btn-excluir-bootstrap" 
                        type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}">
                    <span class="small">Excluir a...</span>
                    <i class="bi bi-plus-lg small"></i>
                </button>
                
                <div class="collapse" id="collapse-${index}">
                    <div class="list-group mt-2 p-1 bg-light rounded-3">
                        <p class="text-muted fw-bold mb-2 ms-2 mt-1" style="font-size: 0.65rem; text-transform: uppercase;">Seleccionar participantes:</p>
                        ${opciones}
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    // Guardar en LocalStorage y avanzar 
    document.getElementById('btnContinuar').addEventListener('click', () => {
        const checks = document.querySelectorAll('.check-excluir:checked');
        const exclusiones = {};

        checks.forEach(chk => {
            const origen = chk.dataset.origen;
            if (!exclusiones[origen]) exclusiones[origen] = [];
            exclusiones[origen].push(chk.value);
        });

        // Se guarda la relación de exclusiones 
        localStorage.setItem('exclusiones', JSON.stringify(exclusiones));
        
        // Redirección a la siguiente pantalla 
        window.location.href = 'evento.html';
    });

    // Botón de regresar para alternar vistas
    document.getElementById('btnRegresar').addEventListener('click', () => {
        if (!seccionLista.classList.contains('hidden')) {
            seccionLista.classList.add('hidden');
            seccionPregunta.classList.remove('hidden');
        } else {
            window.history.back();
        }
    });
});