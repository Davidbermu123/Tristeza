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
        var alias = $("#usuarioalias").val();
        var contrasena = $("#usuariocontrasena").val();

        if (alias === '' || contrasena === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        var data = {
            username: alias,
            password: contrasena
        };

        $.ajax({
            url: '/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                localStorage.setItem('token', response.token);
                alert('Inicio de sesión exitoso');
                // Redirigir según el rol
            },
            error: function(xhr, status, error) {
                alert('Error al iniciar sesión.');
            }
        });
    });
});
