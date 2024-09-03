let token = localStorage.getItem('token');

function verificarTokenYRedireccionarALogin() {

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

verificarTokenYRedireccionarALogin();

$(document).ready(function() {
    // Capturamos el evento de envío del formulario
    $('#agregar_form').on('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        // Obtenemos los datos del formulario
        var nombre = $('#nombre_item').val();
        var imagen = $('#imagen_item').val();
        var stock = $('#stock_item').val();
        var precio = $('#precio_item').val();
        var descripcion = $('#descripcion_item').val();

        var data = {
            imagenItem: imagen,
            nombreItem: nombre,
            precioItem: precio,
            stockItem: stock,
            descripcionItem: descripcion
        };

        // Realizamos la petición AJAX
        $.ajax({
            url: '/requestFichasStock/guardarFichasStock', // Cambia esta URL al endpoint de tu servidor
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                // Maneja la respuesta del servidor (puede ser un mensaje de éxito, redirección, etc.)
                console.log('Item añadido exitosamente');
            },
            error: function(xhr, status, error) {
                // Maneja los errores
                console.error('Error:', error);
                alert('Hubo un problema al añadir el item');
            }
        });
    });
});

$(document).ready(function() {
    // Capturamos el evento de envío del formulario
    $('#eliminar_form').on('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        // Obtenemos el ID del elemento a eliminar
        var id = $('#id_borrar').val();

        // Realizamos la petición AJAX para eliminar el elemento
        $.ajax({
            url: '/requestFichasStock/eliminarFichasStock/' + id, // Cambia esta URL al endpoint de tu servidor
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token // Agrega el token de autenticación si es necesario
            },
            success: function(response) {
                // Maneja la respuesta del servidor (puede ser un mensaje de éxito, actualización de la UI, etc.)
                console.log('Item eliminado exitosamente');
                alert('Elemento eliminado exitosamente');
                $('#eliminar_form')[0].reset(); // Limpia el formulario después de eliminar
            },
            error: function(xhr, status, error) {
                // Maneja los errores
            console.error('Error:', error);
            }
        });
    });
});