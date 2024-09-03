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

verificarTokenYRedireccionarALogin(); 

// Función para obtener los pedidos del usuario logueado
function obtenerPedidosPorUsuario(username) {
    return $.ajax({
        url: '/pedidos/pedidoUsuario/' + username,
        method: 'GET',
        dataType: 'json' // Especificar que esperamos una respuesta en formato JSON
    }).done(function(pedidos) {
        return pedidos; // Devolver la lista de pedidos
    }).fail(function(xhr, status, error) {
        console.error('Error al obtener los pedidos del usuario:', error);
        return []; // Devolver una lista vacía en caso de error
    });
}

// Función para llenar el contenedor con las tarjetas de pedidos del usuario logueado
function llenarTarjetas(pedidos) {
    var container = $('#order-cards-container');
    container.empty();

    pedidos.forEach(function(pedido) {
        var statusClass = '';
        var iconClass = '';

        switch (pedido.estado) {
            case 'Aceptado por la compañia':
                iconClass = 'icon-aceptado';
                break;
            case 'Alistando':
                iconClass = 'icon-alistando';
                break;
            case 'En camino':
                iconClass = 'icon-en-camino';
                break;
            case 'Entregado':
                iconClass = 'icon-entregado';
                break;
            default:
                iconClass = '';
        }

        var card = `
            <div class="order-card">
                <div class="status-icon ${iconClass}"></div>
                <h3>Pedido #${pedido.idPedido}</h3>
                <div class="details">
                    <p><span>Estado:</span> <span class="status ${pedido.estado.toLowerCase().replace(/\s+/g, '-') }">${pedido.estado}</span></p>
                    <p><span>Usuario:</span> ${pedido.username}</p>
                    <p><span>Producto:</span> ${pedido.nombreProducto}</p>
                    <p><span>Cantidad:</span> ${pedido.cantidadPedido}</p>
                    <p><span>Precio:</span> ${pedido.precioFinal}</p>
                </div>
            </div>
        `;
        container.append(card);
    });
}

// Función para obtener la clase CSS para el estado
function getStatusClass(estado) {
    switch (estado) {
        case 'Aceptado por la compañia':
            return 'aceptado';
        case 'En camino':
            return 'en-camino';
        case 'Entregado':
            return 'entregado';
        default:
            return '';
    }
}

$(document).ready(function(){
    // Obtener los pedidos del usuario logueado
    obtenerPedidosPorUsuario(window.loggedInUsername).done(function(pedidos) {
        // Llama a la función que inserta los datos en las tarjetas
        llenarTarjetas(pedidos);
    });
});

function logout() {
    // Mostrar un mensaje de confirmación al usuario
    var confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    // Si el usuario confirma el logout, limpiar el token del almacenamiento local y redirigirlo a la página de inicio de sesión
    if (confirmLogout) {
        localStorage.removeItem('token');
        window.location.href = "/Vistas/inicioVista.html";
    }
}
