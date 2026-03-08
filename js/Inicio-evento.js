document.addEventListener("DOMContentLoaded", function () {
    const btnContinuar = document.getElementById("btnContinuar");
    const inputNombre = document.getElementById("nombreOrganizador");
    const checkIncluir = document.getElementById("sorteoCheck");
    const btnLimpiar = document.querySelector(".bi-x");

    btnLimpiar.addEventListener("click", () => {
        inputNombre.value = "";
        inputNombre.focus();
    }); 
    
    btnContinuar.addEventListener("click", function () {
        const nombre = inputNombre.value.trim();
        
        if (nombre === "") {
            Swal.fire({
                title: '¿Cómo te llamas?',
                text: 'Por favor, introduce tu nombre.',
                icon: 'question',
                confirmButtonText: 'Escribir nombre',
                confirmButtonColor: '#0d6efd',
                customClass: {
                    popup: 'rounded-4'
                }
            });
            return;
        }

        // Guardamos el nombre del organizador y si quiere ser incluido
        localStorage.setItem("organizador", nombre);
        localStorage.setItem("incluirOrganizador", checkIncluir.checked);

        // Redirigir
        window.location.href = "participantes.html";

    });
});