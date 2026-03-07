document.addEventListener("DOMContentLoaded", function () {
    const btnRegresar = document.getElementById("btnRegresar");
    btnRegresar.addEventListener("click", function () {
        window.history.back();
    });
    const btnContinuar = document.getElementById("btnContinuar");
    btnContinuar.addEventListener("click", function () {
        window.location.href = "../pages/participantes.html";
    });
});