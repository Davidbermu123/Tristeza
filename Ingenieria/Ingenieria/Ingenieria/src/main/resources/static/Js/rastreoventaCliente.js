window.onload = function() {
    // Carga el estado actual desde localStorage
    let currentStatus = localStorage.getItem('currentStatus');
    const stepIds = ["step-alistando", "step-en-camino", "step-entregado"];

    // Mapea el estado al índice correspondiente
    const statusIndex = {
        "Alistando": 0,
        "En camino": 1,
        "Listo para envío": 2
    };

    // Elimina la clase 'highlight' de todos los pasos
    stepIds.forEach(id => document.getElementById(id).classList.remove('highlight'));

    // Agrega la clase 'highlight' al ícono correspondiente al estado actual
    if (currentStatus) {
        let currentIndex = statusIndex[currentStatus];
        document.getElementById(stepIds[currentIndex]).classList.add('highlight');
    }
}
