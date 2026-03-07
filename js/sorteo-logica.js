function realizarSorteo() {
    // Obtener datos de LocalStorage
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const exclusiones = JSON.parse(localStorage.getItem('exclusiones')) || {};

    if (participantes.length < 2) {
        Swal.fire({
            title: '¡Faltan participantes!',
            text: 'Se necesitan al menos 2 participantes para poder realizar el sorteo.',
            icon: 'error',
            confirmButtonText: 'Agregar más',
            confirmButtonColor: '#0d6efd',
            customClass: {
                popup: 'rounded-4 shadow'
            }
        });
        return null;
    }

    let resultado = null;
    let intentos = 0;
    const MAX_INTENTOS = 500; // Para evitar bucles infinitos en casos imposibles

    while (!resultado && intentos < MAX_INTENTOS) {
        intentos++;
        const copiaSorteo = [...participantes]; // Crear una copia de la lista original para barajear
        
        // Barajar la lista (Fisher-Yates Shuffle)
        for (let i = copiaSorteo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copiaSorteo[i], copiaSorteo[j]] = [copiaSorteo[j], copiaSorteo[i]];
        }

        // Validar si la combinación actual es válida
        if (esSorteoValido(participantes, copiaSorteo, exclusiones)) {
            resultado = participantes.map((persona, index) => ({
                quienRegala: persona,
                aQuienLeRegala: copiaSorteo[index]
            }));
        }
    }

    if (resultado) {
        console.log("Sorteo realizado con éxito en el intento: " + intentos);
        localStorage.setItem('resultadoSorteo', JSON.stringify(resultado));
        return resultado;
    } else {
        console.error("No se encontró una combinación válida. Revisa las exclusiones.");
        return null;
    }
}

// Valida que nadie se regale a sí mismo y que no existan exclusiones prohibidas 
function esSorteoValido(listaOriginal, listaBarajada, exclusiones) {
    for (let i = 0; i < listaOriginal.length; i++) {
        const regala = listaOriginal[i];
        const recibe = listaBarajada[i];

        // No puede regalarse a sí mismo
        if (regala === recibe) return false;

        // Revisar si el que regala está en la lista de excluidos de a quien le regalan
        if (exclusiones[regala] && exclusiones[regala].includes(recibe)) {
            return false;
        }
    }
    return true;
}