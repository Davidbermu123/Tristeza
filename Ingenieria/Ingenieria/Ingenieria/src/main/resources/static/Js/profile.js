window.onload = function(){
    verificarTokenYRedireccionarALogin();
    traerUsuario();
}

let token = localStorage.getItem('token');
var tokenParts = token.split('.');
var tokenPayload = JSON.parse(atob(tokenParts[1]));
var username=tokenPayload.sub;


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


var rol = "";
var id = 0;
function traerUsuario() {
    // Hacer una solicitud al backend para obtener el nombre de usuario
    $.ajax({
        url: '/controladorCliente/obtenerPerfil',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: { alias: username},
        success: function(username) {
            rol = username.rol;
            id = username.id;
            $('#usernameDisplay').text(username.nombre);
            $('#nombre').val(username.nombre);
            $('#apellido').val(username.apellido);
            $('#ciudad').val(username.ciudad);
            $('#direccion').val(username.direccion);
            $('#telefono').val(username.telefono);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// Función que será llamada al presionar el botón de "Actualizar"
function actualizarPerfil() {
    const nombre = $('#nombre').val();
    const apellido = $('#apellido').val();
    const ciudad = $('#ciudad').val();
    const direccion = $('#direccion').val();
    const telefono = $('#telefono').val();

    // Realiza la petición AJAX de tipo PUT
    $.ajax({
        url: '/controladorCliente/updateUsuario',
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded' // Tipo de contenido para enviar parámetros en la URL
        },
        data: {
            username: username,
            nombre: nombre,
            apellido: apellido,
            ciudad: ciudad,
            direccion: direccion,
            rol: rol,
            telefono: telefono
        },
        success: function(response) {
            alert('Perfil actualizado exitosamente.');
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Error al actualizar el perfil.');
        }
    });
}

function borrar(){
    $.ajax({
        url: '/controladorCliente/borrarUsuario',
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded' // Tipo de contenido para enviar parámetros en la URL
        },
        data: {
            id: id
        },
        success: function(response) {
            alert('Perfil borrado exitosamente.');
            localStorage.clear();
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Error al borrar el perfil.');
        }
    });
}