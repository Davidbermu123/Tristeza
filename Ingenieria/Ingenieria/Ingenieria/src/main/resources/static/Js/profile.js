let token = localStorage.getItem('token');
var tokenParts = token.split('.');
var tokenPayload = JSON.parse(atob(tokenParts[1]));
var username=tokenPayload.sub;


window.onload = function(){
    verificarTokenYRedireccionarALogin();
    traerUsuario();
}

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

function traerUsuario(){
    // Hacer una solicitud al backend para obtener el nombre de usuario
    fetch('/controladorCliente/obtenerPerfil', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: { alias: username},
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = '/Vistas/inicioVista.html';
            throw new Error('No autorizado');
        }
        return response.text();
    })
    .then(username => {
        // Mostrar el nombre de usuario en el HTML
        console.log(username)
        usernameDisplay.textContent = username;
    })
    .catch(error => {
        console.error('Error:', error);
        // Opcional: Mostrar un mensaje de error o realizar otras acciones
    });
}




// Manejador de envío del formulario de actualización
document.getElementById('updateProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const username = document.getElementById('usernameSelect').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const ciudad = document.getElementById('ciudad').value;
    const rol = document.getElementById('rol').value;

    if (username) {
        fetch(`/controladorCliente/updateUsuario?username=${encodeURIComponent(username)}&nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(apellido)}&ciudad=${encodeURIComponent(ciudad)}&direccion=${encodeURIComponent(direccion)}&telefono=${encodeURIComponent(telefono)}&rol=${encodeURIComponent(rol)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                alert('Perfil actualizado exitosamente.');
                window.location.reload();  // Recarga la página para mostrar los datos actualizados
            } else {
                alert('Error al actualizar el perfil.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el perfil.');
        });
    } else {
        alert('Debe seleccionar un alias.');
    }
});
