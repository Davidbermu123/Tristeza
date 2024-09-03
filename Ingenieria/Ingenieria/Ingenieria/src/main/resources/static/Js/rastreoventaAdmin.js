let token = localStorage.getItem('token');
function verificarTokenYRedireccionarALogin() {

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



function generarFactura(pedidoId) {
    fetch('/pedidos/pedidoId/' + pedidoId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            // Obtener los datos del usuario y pasar una función de callback
            buscarUsuarioPorAlias(data.username, usuarioData => {

                // Preparar los datos para la factura
                let invoiceData = {
                    username: usuarioData.username,  // Datos del usuario
                    nombre: usuarioData.nombre,
                    apellido: usuarioData.apellido,
                    direccion: usuarioData.direccion,
                    telefono: usuarioData.telefono,
                    ciudad: usuarioData.ciudad,
                    nombreProducto: data.nombreProducto,
                    cantidadPedido: data.cantidadPedido,
                    estado: data.estado,
                    precioFinal: data.precioFinal
                };

                // Generar la factura
                fetch('http://127.0.0.1:5000/Venta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(invoiceData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error en la solicitud.");
                    }
                    return response.blob();
                })
                .then(blob => {
                    if (blob.type === 'application/pdf' && blob.size > 0) {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'Factura.pdf';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    } else {
                        console.error('El blob no es un PDF válido o está vacío.');
                        alert("Error al generar la factura.");
                    }
                })
                .catch(error => {
                    console.error('Error details:', error);
                    alert("Error al generar la factura.");
                });
            });
        } else {
            throw new Error("Pedido no encontrado.");
        }
    })
    .catch(error => {
        console.error('Error details:', error);
        alert("Error al generar la factura.");
    });
}


function llenarTabla(pedidos) {
    var tbody = $('.tracking-table tbody');
    tbody.empty(); // Limpia cualquier contenido existente en la tabla

    pedidos.forEach(function(pedido) {
        buscarUsuarioPorAlias(pedido.username, function(response) {
            console.log('Usuario encontrado:', response.direccion);
        });
        var fila = '<tr>' +
            '<td>' + pedido.estado + '</td>' +
            '<td>' + pedido.idPedido + '</td>' +
            '<td>' + pedido.nombreProducto + '</td>' +
            '<td>' + pedido.cantidadPedido + '</td>' +
            '<td>' + pedido.precioFinal + '</td>' +
            '<td>' + pedido.username + '</td>' +
            '<td><button onclick="generarFactura(' + pedido.idPedido + ')">Descargar</button></td>' +
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

function buscarUsuarioPorAlias(nombre, callback) {
    $.ajax({
        url: '/controladorCliente/findbyalias', // URL del endpoint
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token// Opcional: Si necesitas un token para la autenticación
        },
        data: {
            username: nombre // Parámetro a enviar en la solicitud
        },
        success: function(response) {
            callback(response);
        },
        error: function(xhr, status, error) {
            console.error('Error al buscar el usuario:', error);
            alert('Error al buscar el usuario.');
        }
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