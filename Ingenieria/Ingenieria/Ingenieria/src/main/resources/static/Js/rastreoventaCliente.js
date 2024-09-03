// Función para verificar el token y redirigir al login si no es válido
function verificarTokenYRedireccionarALogin() {
    let token = localStorage.getItem('token');

    if (token === null) {
        window.location.href = '/Vistas/inicioVista.html';
        return;
    }

    try {
        let tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Token JWT no válido.');
        }

        let tokenPayload = JSON.parse(atob(tokenParts[1]));
        let username = tokenPayload.sub;
        console.log(username);

        // Guardar el username en una variable global para usarla más adelante
        window.loggedInUsername = username;

    } catch (error) {
        console.error('Error al verificar el token:', error);
        window.location.href = '/Vistas/inicioVista.html';
    }
}

// Función para obtener el estado del pedido
function obtenerEstadoPedido() {
    const pedidoId = getPedidoId(); 

    if (!pedidoId) {
        console.error('ID de pedido no disponible.');
        return;
    }

    fetch(`/api/pedidos/${pedidoId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el estado del pedido.');
        }
        return response.json();
    })
    .then(data => {
        actualizarEstado(data.estado);
        updateLog();
    })
    .catch(error => {
        console.error('Error en la solicitud AJAX:', error);
    });
}

// Función para actualizar el estado visualmente
function actualizarEstado(estado) {
    const stepIds = ["step-aceptado", "step-alistando", "step-en-camino", "step-entregado"];
    const connectors = document.querySelectorAll('.connector');
    const statusIndex = {
        "Aceptado por la compañía": 0,
        "Alistando": 1,
        "En camino": 2,
        "Entregado": 3
    };

    let currentIndex = statusIndex[estado] || -1;

    stepIds.forEach(id => document.getElementById(id).classList.remove('highlight', 'active'));
    connectors.forEach(connector => connector.classList.remove('active'));

    if (currentIndex >= 0) {
        for (let i = 0; i <= currentIndex; i++) {
            document.getElementById(stepIds[i]).classList.add('highlight', 'active');
            if (i > 0) {
                connectors[i - 1].classList.add('active');
            }
        }

        if (estado === "Entregado") {
            stepIds.forEach(id => document.getElementById(id).classList.add('highlight', 'active'));
            connectors.forEach(connector => connector.classList.add('active'));
        }
    }

    localStorage.setItem('currentStatus', estado);
}

// Función para actualizar el log
function updateLog() {
    const logContainer = document.getElementById('update-log');
    logContainer.innerHTML = '';

    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.forEach(notification => {
        const logEntry = document.createElement('p');
        logEntry.textContent = `${notification.dateTime}: ${notification.message}`;
        logContainer.appendChild(logEntry);
    });
}

// Función para obtener el ID del pedido
function getPedidoId() {
    return new URLSearchParams(window.location.search).get('id');
}

// Función para cambiar el estado desde el cliente
function changeStatus(element) {
    verificarTokenYRedireccionarALogin(); 
    let selectedStatus = element.value;

    localStorage.setItem('currentStatus', selectedStatus);

    window.location.href = 'rastreoventaCliente.html';
}

// Llamadas al cargar la página
window.onload = function() {
    verificarTokenYRedireccionarALogin();
    obtenerEstadoPedido(); 
};
