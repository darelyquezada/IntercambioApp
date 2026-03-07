document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('nombreInput');
    const btnAgregar = document.getElementById('btnAgregar');
    const listaParticipantes = document.getElementById('listaParticipantes');
    const btnContinuar = document.getElementById('btnContinuar');

    // Cargar participantes desde el localStorage o iniciar con un array vacío
    let participantes = JSON.parse(localStorage.getItem('participantes')) || [];

    // Incluir al organizador automáticamente
    const organizador = localStorage.getItem("organizador");
    const incluir = localStorage.getItem("incluirOrganizador") === "true";

    if (organizador && incluir) {
        // Solo lo agregamos si no está ya en la lista (para evitar duplicados al recargar)
        if (!participantes.includes(organizador)) {
            participantes.unshift(organizador); // unshift lo pone al principio de la lista
            localStorage.setItem('participantes', JSON.stringify(participantes));
        }
    }

    // Función para renderizar listaParticipantes
    const renderizar = () => {
        listaParticipantes.innerHTML = '';
        
        // Obtenemos el nombre del organizador para comparar
        const organizadorNombre = localStorage.getItem("organizador");

        participantes.forEach((nombre, index) => {
            const col = document.createElement('div');
            col.className = 'col-12'; // Cada participante ocupa toda la fila
            
            // Verificamos si es el organizador
            const esOrganizador = (nombre === organizadorNombre);

            col.innerHTML = `
                <div class="card border-0 bg-light shadow-sm">
                    <div class="card-body py-2 px-3 d-flex justify-content-between align-items-center">
                        <span class="small text-truncate">
                            <i class="bi bi-person-fill me-2 ${esOrganizador ? 'text-success' : 'text-primary'}"></i>
                            ${nombre} ${esOrganizador ? '<span class="badge bg-success-subtle text-success ms-1" style="font-size: 0.7rem;">Tú</span>' : ''}
                        </span>
                        ${!esOrganizador ? `<i class="bi bi-trash text-danger" role="button" onclick="eliminar(${index})"></i>` : ''}
                    </div>
                </div>
            `;
            listaParticipantes.appendChild(col);
        });
        
        // Mínimo deben participar 3 personas para continuar
        btnContinuar.disabled = participantes.length < 3;
        
        // Guardar en el localStorage
        localStorage.setItem('participantes', JSON.stringify(participantes));
    };

    // Función para agregar participante
    const agregar = () => {
        const nombre = input.value.trim();
        if (nombre) {
            participantes.push(nombre);
            input.value = '';
            renderizar();
        }
    };

    // Función para eliminar participante
    window.eliminar = (index) => {
        participantes.splice(index, 1);
        renderizar();
    };

    // Event listeners
    btnAgregar.addEventListener('click', agregar);
    btnContinuar.addEventListener('click', () => {
        window.location.href = 'exclusiones.html';
    });

    // Renderizar al cargar la página
    renderizar();
});