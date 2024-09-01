function verificarTokenYRedireccionarALogin() {
    let token = localStorage.getItem('token');

    // Verificar si el token está presente
    if (token === null) {
        // Si el token no está presente, redirigir al usuario al inicio de sesión
        window.location.href = '/Vistas/inicioVista.html';
    } else {
        var tokenParts = token.split('.');
        var tokenPayload = JSON.parse(atob(tokenParts[1]));
        var username=tokenPayload.sub;
        console.log(username);
    }
}

function guardarPedido() {
    // Crear el objeto pedido basado en los valores del formulario
    var pedido = {
        idUsuario: $("#idUsuario").val(),
        nombreProducto: $("#nombreProducto").val(),
        cantidadPedido: $("#cantidadPedido").val(),
        estado: $("#estado").val(),
        precioFinal: $("#precioFinal").val()
    };

    $.ajax({
        url: '/pedidos/guardar',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(pedido),
        success: function(response) {
            $("#responseMessage").text("Pedido guardado con éxito: " + response.idPedido);
        },
        error: function(error) {
            $("#responseMessage").text("Error al guardar el pedido: " + error.responseText);
        }
    });
}

