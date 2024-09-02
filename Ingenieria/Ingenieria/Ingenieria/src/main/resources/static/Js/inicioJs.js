$(document).ready(function() {
    // Mostrar/Ocultar contraseña
    $("#togglePassword").click(function() {
        const passwordField = $("#usuariocontrasena");
        const eyeIcon = $("#eyeIcon");

        const type = passwordField.attr("type") === "password" ? "text" : "password";
        passwordField.attr("type", type);

        // Cambiar el icono del botón
        eyeIcon.toggleClass('fa-eye fa-eye-slash');
    });

    // Lógica para el botón de inicio de sesión
    $("#loginBtn").click(function() {
        logUsuario();
    });

    // Asociar la función regresar al botón de salir
    $("#regresarBtn").click(function() {
        regresar();
    });
});

function logUsuario() {
    var alias = $("#usuarioalias").val();
    var contrasena = $("#usuariocontrasena").val();

    // Verificar si los campos no están vacíos
    if (alias === '' || contrasena === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Datos a enviar al servidor
    var data = {
        username: alias,
        password: contrasena
    };

    // Realizar la solicitud al servidor
    $.ajax({
        url: '/auth/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log('Token recibido:', response.token);
            // Guardar el token de autenticación en el almacenamiento local
            localStorage.setItem('token', response.token);

            // Decodificar el token para obtener el nombre de usuario
            var tokenParts = response.token.split('.');
            var tokenPayload = JSON.parse(atob(tokenParts[1]));
            var username = tokenPayload.sub;

            // Obtener el rol del usuario
            $.ajax({
                url: '/controladorCliente/rol',
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + response.token // Agregar token JWT como encabezado de autorización
                },
                success: function(role) {
                    // Redirigir según el rol del usuario
                    if (role === 'ADMIN') {
                        window.location.href = "/Vistas/registroVista.html"; // Redireccionar a la página de administrador
                    } else if (role === 'USER') {
                        window.location.href = "/index.html"; // Redireccionar a la página de usuario normal
                    } else {
                        alert('Rol desconocido.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error al obtener el rol del usuario:', error);
                    alert('Ocurrió un error al obtener el rol del usuario.');
                }
            });
        },
        error: function(xhr, status, error) {
            // Manejar errores de la solicitud
            console.error('Error en la solicitud:', error);
            alert('Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.');
        }
    });
}

function regresar() {
    if (confirm("¿Estás seguro de que quieres salir?")) {
        window.history.back(); // Regresar a la página anterior
    }
}
