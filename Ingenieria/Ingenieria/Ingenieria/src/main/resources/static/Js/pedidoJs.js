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
