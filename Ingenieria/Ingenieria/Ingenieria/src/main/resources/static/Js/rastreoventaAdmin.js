function changeStatus(element) {
    // Estados posibles
    const statuses = ["Alistando", "En camino", "Listo para envío"];
    const classNames = ["status-alistando", "status-en-camino", "status-listo-envio"];
    const stepIds = ["step-alistando", "step-en-camino", "step-entregado"];

    // Obtiene el estado actual
    let currentStatus = element.innerText;

    // Encuentra el índice del estado actual
    let currentIndex = statuses.indexOf(currentStatus);

    // Calcula el siguiente estado
    let nextIndex = (currentIndex + 1) % statuses.length;

    // Actualiza el texto y las clases CSS de la celda
    element.innerText = statuses[nextIndex];
    element.className = `status ${classNames[nextIndex]}`;

    // Guarda el estado actual en localStorage para que se sincronice con los íconos
    localStorage.setItem('currentStatus', statuses[nextIndex]);

    // Redirecciona a la página de los íconos para actualizar la vista
    window.location.href = 'rastreoventaCliente.html';
}


