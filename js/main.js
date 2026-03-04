document.addEventListener('DOMContentLoaded', () => {
    const btnRegresar= document.getElementById('btnRegresar');
    btnRegresar.addEventListener('click', () => {
        window.history.back();
    });
});