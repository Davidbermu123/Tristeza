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

// Función para obtener la dirección del usuario dado su username
function obtenerDireccion(username) {
    verificarTokenYRedireccionarALogin(); 
    return $.ajax({
        url: '/controladorCliente/findbyalias',
        method: 'GET',
        data: { username: username },
        dataType: 'json' // Especificar que esperamos una respuesta en formato JSON
    }).done(function(usuario) {
        return usuario; // Devolver el objeto usuario
    }).fail(function(xhr, status, error) {
        console.error('Error al obtener la dirección del usuario:', error);
        return null; // Devolver null en caso de error
    });
}

function changeStatus(element, idPedido) {
    verificarTokenYRedireccionarALogin(); 
    let selectedStatus = element.value;

    // Enviar el nuevo estado al backend para actualizarlo en la base de datos
    $.ajax({
        url: '/pedidos/actualizarEstado/' + idPedido,
        method: 'PUT',
        data: { nuevoEstado: selectedStatus },
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Estado actualizado',
                text: "El estado se ha actualizado a " + selectedStatus
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al actualizar el estado:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El estado no se actualizo nuevamente",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    });
}

// Función para llenar la tabla con los pedidos y la dirección del usuario
function llenarTabla(pedidos) {
    var tbody = $('.tracking-table tbody');
    tbody.empty();

    pedidos.forEach(function(pedido) {
        x = obtenerDireccion(pedido.username);
        console.log(x);
        d = x.direccion;
        console.log(d);
        var fila = '<tr>' +
            '<td>' +
            '<select onchange="changeStatus(this, ' + pedido.idPedido + ')">' +
                '<option value="Aceptado por la compañia"' + (pedido.estado === 'Aceptado por la compañia' ? ' selected' : '') + '>Aceptado por la compañia</option>' +
                '<option value="Alistando"' + (pedido.estado === 'Alistando' ? ' selected' : '') + '>Alistando</option>' +
                '<option value="En camino"' + (pedido.estado === 'En camino' ? ' selected' : '') + '>En camino</option>' +
                '<option value="Entregado"' + (pedido.estado === 'Entregado' ? ' selected' : '') + '>Entregado</option>' +
            '</select>' +
            '</td>' +
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

// Función para obtener la dirección del usuario dado su username
function obtenerDireccion(username) {
    return $.ajax({
        url: '/controladorCliente/findbyalias',
        method: 'GET',
        data: { username: username },
        dataType: 'json' // Especificar que esperamos una respuesta en formato JSON
    }).done(function(usuario) {
        return usuario; // Devolver el objeto usuario
    }).fail(function(xhr, status, error) {
        console.error('Error al obtener la dirección del usuario:', error);
        return null; // Devolver null en caso de error
    });
}



function logout() {
    // Mostrar un mensaje de confirmación al usuario
    var confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    // Si el usuario confirma el logout, limpiar el token del almacenamiento local y redirigirlo a la página de inicio de sesión
    if (confirmLogout) {
        localStorage.removeItem('token');
        window.location.href = "/Vistas/inicioVista.html"
    }
}