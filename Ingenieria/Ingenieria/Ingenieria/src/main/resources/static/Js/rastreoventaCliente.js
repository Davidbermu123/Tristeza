function changeStatus(element) {
    // Estados posibles
    const statuses = ["Aceptado por la compañía", "Alistando", "En camino", "Entregado"];
    const classNames = ["status-aceptado", "status-alistando", "status-en-camino", "status-entregado"];
    const stepIds = ["step-aceptado", "step-alistando", "step-en-camino", "step-entregado"];

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

    // Añade un registro de la actualización de estado
    addStatusLog(statuses[nextIndex]);

    // Redirecciona a la página de los íconos para actualizar la vista
    window.location.href = 'rastreoventaCliente.html';
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
};

// Función para añadir un registro de estado
function addStatusLog(status) {
    const logContainer = document.getElementById('status-log');

    // Crea un nuevo registro
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';

    // Obtén la fecha y hora actual
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    // Define el contenido del registro
    logEntry.innerHTML = `
        <span class="log-status">${status}</span>
        <span class="log-timestamp">${timestamp}</span>
    `;

    // Añade el registro al contenedor
    logContainer.appendChild(logEntry);
}

window.onload = function() {
    // Cargar estado desde localStorage
    let currentStatus = localStorage.getItem('currentStatus');
    const stepIds = ["step-aceptado", "step-alistando", "step-en-camino", "step-entregado"];
    const connectors = document.querySelectorAll('.connector');

    const statusIndex = {
        "Aceptado por la compañía": 0,
        "Alistando": 1,
        "En camino": 2,
        "Entregado": 3
    };

    stepIds.forEach(id => document.getElementById(id).classList.remove('highlight', 'active'));
    connectors.forEach(connector => connector.classList.remove('active'));

    if (currentStatus) {
        let currentIndex = statusIndex[currentStatus];
        for (let i = 0; i <= currentIndex; i++) {
            document.getElementById(stepIds[i]).classList.add('highlight', 'active');
            if (i > 0) {
                connectors[i - 1].classList.add('active');
            }
        }
        if (currentStatus === "Entregado") {
            stepIds.forEach(id => document.getElementById(id).classList.add('highlight', 'active'));
            connectors.forEach(connector => connector.classList.add('active'));
        }
    }

    // Cargar detalles del pedido del usuario
    const username = 'usuarioEjemplo'; // Cambia esto para obtener el nombre del usuario actual
    fetch(`/pedidos/pedidoUsuario/${username}`)
        .then(response => response.json())
        .then(data => {
            const ordersTableBody = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
            data.forEach(order => {
                const row = ordersTableBody.insertRow();
                row.insertCell(0).innerText = order.id;
                row.insertCell(1).innerText = order.nombreProducto;
                row.insertCell(2).innerText = order.cantidadPedido;
                row.insertCell(3).innerText = order.estado;
            });
        })
        .catch(error => console.error('Error al cargar los pedidos:', error));
};

window.onload = function() {
    // Cargar estado desde localStorage
    let currentStatus = localStorage.getItem('currentStatus');
    const stepIds = ["step-aceptado", "step-alistando", "step-en-camino", "step-entregado"];
    const connectors = document.querySelectorAll('.connector');

    const statusIndex = {
        "Aceptado por la compañía": 0,
        "Alistando": 1,
        "En camino": 2,
        "Entregado": 3
    };

    stepIds.forEach(id => document.getElementById(id).classList.remove('highlight', 'active'));
    connectors.forEach(connector => connector.classList.remove('active'));

    if (currentStatus) {
        let currentIndex = statusIndex[currentStatus];
        for (let i = 0; i <= currentIndex; i++) {
            document.getElementById(stepIds[i]).classList.add('highlight', 'active');
            if (i > 0) {
                connectors[i - 1].classList.add('active');
            }
        }
        if (currentStatus === "Entregado") {
            stepIds.forEach(id => document.getElementById(id).classList.add('highlight', 'active'));
            connectors.forEach(connector => connector.classList.add('active'));
        }
    }

    // Cargar detalles del pedido del usuario
    const username = 'usuarioEjemplo'; // Cambia esto para obtener el nombre del usuario actual
    fetch(`/pedidos/pedidoUsuario/${username}`)
        .then(response => response.json())
        .then(data => {
            const ordersTableBody = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
            data.forEach(order => {
                const row = ordersTableBody.insertRow();
                row.insertCell(0).innerText = order.id;
                row.insertCell(1).innerText = order.nombreProducto;
                row.insertCell(2).innerText = order.cantidadPedido;
                row.insertCell(3).innerText = order.estado;
            });
        })
        .catch(error => console.error('Error al cargar los pedidos:', error));
};


//NUEVO CODIGO

function changeStatus(element) {
    const statuses = ["Aceptado por la compañía", "Alistando", "En camino", "Entregado"];
    const classNames = ["status-aceptado", "status-alistando", "status-en-camino", "status-entregado"];
    const stepIds = ["step-aceptado", "step-alistando", "step-en-camino", "step-entregado"];

    let currentStatus = element.innerText;
    let currentIndex = statuses.indexOf(currentStatus);
    let nextIndex = (currentIndex + 1) % statuses.length;

    element.innerText = statuses[nextIndex];
    element.className = `status ${classNames[nextIndex]}`;

    localStorage.setItem('currentStatus', statuses[nextIndex]);
    addStatusLog(statuses[nextIndex]);

    window.location.href = '/Vistas/rastreoventaCliente.html';
}

function addStatusLog(status) {
    const logContainer = document.getElementById('status-log');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    logEntry.innerHTML = `
        <span class="log-status">${status}</span>
        <span class="log-timestamp">${timestamp}</span>
    `;
    logContainer.appendChild(logEntry);
}
