function changeStatus(element) {
    // Estados posibles
    const statuses = ["Aceptado por la compañía", "Alistando", "En camino", "Entregado"];
    const classNames = ["status-aceptado", "status-alistando", "status-en-camino", "status-entregado"];
    const stepIds = ["step-aceptado", "step-alistando", "step-en-camino", "step-entregado"];

    // Obtiene el estado actual
    let currentStatus = element.innerText; // Cambiado de element.value a element.innerText

    // Encuentra el índice del estado actual
    let currentIndex = statuses.indexOf(currentStatus);

    // Calcula el siguiente estado
    let nextIndex = (currentIndex + 1) % statuses.length;

    // Actualiza el texto y las clases CSS de la celda
    element.innerText = statuses[nextIndex];
    element.className = `status ${classNames[nextIndex]}`;

    // Guarda el estado actual en localStorage para que se sincronice con los íconos
    localStorage.setItem('currentStatus', statuses[nextIndex]);

    // Añade una nueva notificación
    addNotification(statuses[nextIndex]);

    // Redirecciona a la página de los íconos para actualizar la vista
    window.location.href = 'rastreoventaCliente.html';
}

function addNotification(status) {
    // Obtener la fecha y hora actual
    const now = new Date();
    const dateTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    // Crear el mensaje de notificación
    const statusMessages = {
        "Aceptado por la compañía": "El estado ha sido actualizado a 'Aceptado por la compañía'.",
        "Alistando": "El estado ha sido actualizado a 'Alistando'.",
        "En camino": "El estado ha sido actualizado a 'En camino'.",
        "Entregado": "El estado ha sido actualizado a 'Entregado'."
    };
    const notificationMessage = statusMessages[status];

    // Crear una nueva entrada de notificación
    const newNotification = {
        dateTime: dateTime,
        message: notificationMessage
    };

    // Guardar las notificaciones en localStorage
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Actualiza el log de notificaciones en la interfaz
    updateLog();
}

function updateLog() {
    const logContainer = document.getElementById('update-log');
    logContainer.innerHTML = ''; // Limpiar el contenedor de log antes de agregar las nuevas entradas

    // Cargar las notificaciones almacenadas
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.forEach(notification => {
        const logEntry = document.createElement('p');
        logEntry.textContent = `${notification.dateTime}: ${notification.message}`;
        logContainer.appendChild(logEntry);
    });
}

window.onload = function() {
    // Carga el estado actual desde localStorage
    let currentStatus = localStorage.getItem('currentStatus');
    const stepIds = ["step-aceptado", "step-alistando", "step-en-camino", "step-entregado"];
    const connectors = document.querySelectorAll('.connector');

    // Mapea el estado al índice correspondiente
    const statusIndex = {
        "Aceptado por la compañía": 0,
        "Alistando": 1,
        "En camino": 2,
        "Entregado": 3
    };

    // Elimina las clases 'highlight' y 'active' de todos los pasos e íconos
    stepIds.forEach(id => document.getElementById(id).classList.remove('highlight', 'active'));
    connectors.forEach(connector => connector.classList.remove('active'));

    // Agrega las clases correspondientes al estado actual
    if (currentStatus) {
        let currentIndex = statusIndex[currentStatus];

        // Resalta los pasos e íconos correspondientes
        for (let i = 0; i <= currentIndex; i++) {
            document.getElementById(stepIds[i]).classList.add('highlight', 'active');
            if (i > 0) {
                connectors[i - 1].classList.add('active');
            }
        }

        // Si el estado es "Entregado", resalta todos los pasos e íconos
        if (currentStatus === "Entregado") {
            stepIds.forEach(id => document.getElementById(id).classList.add('highlight', 'active'));
            connectors.forEach(connector => connector.classList.add('active'));
        }
    }

    // Actualiza el log de notificaciones
    updateLog();
};
