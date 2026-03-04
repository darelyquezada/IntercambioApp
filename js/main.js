document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('nombreInput');
    const btnAgregar = document.getElementById('btnAgregar');
    const listaParticipantes = document.getElementById('listaParticipantes');
    const btnContinuar = document.getElementById('btnContinuar');
    const btnRegresar= document.getElementById('btnRegresar');

    let participantes = JSON.parse(localStorage.getItem('participantes'));

    // Función para renderizar listaParticipantes
    const renderizar = () => {
        listaParticipantes.innerHTML = '';
        participantes.forEach((nombre, index) => {
            const col = document.createElement('div');
            col.className = 'col-12'; // Cada participante ocupa toda la fila
            col.innerHTML = `
                <div class="card border-0 bg-light shadow-sm">
                    <div class="card-body py-2 px-3 d-flex justify-content-between align-items-center">
                        <span class="small text-truncate">
                            <i class="bi bi-person-fill me-2 text-primary"></i>${nombre}
                        </span>
                        <i class="bi bi-trash text-danger" role="button" onclick="eliminar(${index})"></i>
                    </div>
                </div>
            `;
            listaParticipantes.appendChild(col);
        });

        // Mínimo deben de participar 3 personas para continuar
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

    // Función para regresar a la página anterior
    const regresar = () => {
        window.history.back();
    }

    // Event listeners
    btnAgregar.addEventListener('click', agregar);
    btnRegresar.addEventListener('click', regresar);

    // Renderizar al cargar la página
    renderizar();
});