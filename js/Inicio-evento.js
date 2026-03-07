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
            alert("Por favor, introduce tu nombre.");
            return;
        }

        // Guardamos el nombre del organizador y si quiere ser incluido
        localStorage.setItem("organizador", nombre);
        localStorage.setItem("incluirOrganizador", checkIncluir.checked);

        // Redirigir
        window.location.href = "../pages/participantes.html";

    });
});