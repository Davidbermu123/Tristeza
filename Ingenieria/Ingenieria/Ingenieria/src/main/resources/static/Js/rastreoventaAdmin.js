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



function changeStatus(element) {
    verificarTokenYRedireccionarALogin(); 
    // Obtiene el valor seleccionado
    let selectedStatus = element.value;

    // Guarda el estado actual en localStorage para que se sincronice con los íconos
    localStorage.setItem('currentStatus', selectedStatus);

    // Redirecciona a la página de los íconos para actualizar la vista
    window.location.href = 'rastreoventaCliente.html';
}

function llenarTabla(pedidos) {
    var tbody = $('.tracking-table tbody');
    tbody.empty(); // Limpia cualquier contenido existente en la tabla

    pedidos.forEach(function(pedido) {
        var fila = '<tr>' +
            '<td>' + pedido.estado + '</td>' +
            '<td>' + pedido.idPedido + '</td>' +
            '<td>' + pedido.nombreProducto + '</td>' +
            '<td>' + pedido.cantidadPedido + '</td>' +
            '<td>' + pedido.precioFinal + '</td>' +
            '<td>' + pedido.username + '</td>' +
            '</tr>';

        tbody.append(fila);
    });
}

$(document).ready(function(){
    $.ajax({
        url: '/pedidos/todosPedidos',
        method: 'GET',
        success: function(response) {
            // Llama a la función que inserta los datos en la tabla
            llenarTabla(response);
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar los pedidos:', error);
        }
    });
});

function logout() {
    // Mostrar un mensaje de confirmación al usuario
    var confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    // Si el usuario confirma el logout, limpiar el token del almacenamiento local y redirigirlo a la página de inicio de sesión
    if (confirmLogout) {
        localStorage.removeItem('token');
        window.location.href = "/Vistas/inicioVista.html"
    }
}