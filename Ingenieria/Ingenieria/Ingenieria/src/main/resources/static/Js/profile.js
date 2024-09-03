let token = localStorage.getItem('token');
var tokenParts = token.split('.');
var tokenPayload = JSON.parse(atob(tokenParts[1]));
var username=tokenPayload.sub;


window.onload = function(){
    verificarTokenYRedireccionarALogin();
    traerUsuario();
}

function verificarTokenYRedireccionarALogin() {
    let token = localStorage.getItem('token');

    if (token === null) {
        window.location.href = '/Vistas/inicioVista.html';
    } else {
        var tokenParts = token.split('.');
        var tokenPayload = JSON.parse(atob(tokenParts[1]));
        var username = tokenPayload.sub;
        console.log("Usuario autenticado:", username);
    }
}

function traerUsuario() {
    let token = localStorage.getItem('token');
    var tokenParts = token.split('.');
    var tokenPayload = JSON.parse(atob(tokenParts[1]));
    var username = tokenPayload.sub;

    fetch(`/controladorCliente/obtenerPerfil?alias=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = '/Vistas/inicioVista.html';
            throw new Error('No autorizado');
        }
        return response.json();
    })
    .then(data => {
        // Asignar los valores obtenidos a los campos del formulario
        document.getElementById('username').textContent = data.nombreUsuario; // Si tienes un campo para mostrar el nombre de usuario
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('apellido').value = data.apellido;
        document.getElementById('ciudad').value = data.ciudad;
        document.getElementById('direccion').value = data.direccion;
        document.getElementById('telefono').value = data.telefono;
    })
    .catch(error => {
        console.error('Error al obtener el perfil:', error);
    });
}




// Manejador de envío del formulario de actualización
// Manejador de envío del formulario de actualización
document.getElementById('updateProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    const tokenParts = token.split('.');
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    const username = tokenPayload.sub;  // Se obtiene el username directamente desde el token

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const ciudad = document.getElementById('ciudad').value;
    const rol = document.getElementById('rol').value;

    // Realizar la solicitud PUT para actualizar el perfil del usuario
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
});
