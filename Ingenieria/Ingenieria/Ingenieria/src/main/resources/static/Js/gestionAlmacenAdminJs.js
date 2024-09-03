window.onload = function(){
    verificarTokenYRedireccionarALogin();
    mostrarAdmins();
}

let token = localStorage.getItem('token');

function verificarTokenYRedireccionarALogin() {
    // Verificar si el token está presente
    if (token === null) {
        // Si el token no está presente, redirigir al usuario al inicio de sesión
        window.location.href = '/Vistas/inicioVista.html';
    }
}

var tokenParts = token.split('.');
var tokenPayload = JSON.parse(atob(tokenParts[1]));
var username = tokenPayload.sub;

function buscarUsuario(){
    username = $('#buscador').val();

    if (username.trim() === '') { // Verifica si está vacío
        alert('Por favor, ingrese un nombre de usuario.');
        return; // Sal de la función si está vacío
    }

    $.ajax({
            url: '/controladorCliente/findbyalias',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: { username: username}, 
            success: function(response) {

                if(response.username == undefined){
                    alert('El usuario no se encontro en la base de datos');
                    return;
                }
                   // Asegúrate de que response.username tiene el valor esperado
                var user = response.username;
                var nombre = response.nombre;
                var apellido = response.apellido;
                var ciudad = response.ciudad;
                var direccion = response.direccion;
                var telefono = response.telefono;
                var rol = response.rol;

                // Limpia el contenido de la lista ul antes de agregar el nuevo elemento
                $('#caja-resultado').empty();
                
                // Agrega un nuevo elemento li con los datos obtenidos
                if (rol === 'ADMIN') {
                // Muestra una alerta si el rol es ADMIN
                    alert('El usuario ya es un administrador.');
                } else {
                    // Agrega un nuevo elemento li con los datos obtenidos si el rol no es ADMIN
                    $('#caja-resultado').append(`
                        <li>
                            <h6><i class="fa fa-check"></i> ${user}</h6>
                            <div class="main-button">
                                <button 
                                onclick="cambiarRol('${user}', '${nombre}', '${apellido}', '${ciudad}', '${direccion}', 'ADMIN', '${telefono}')">
                                Hacer administrador
                                </button>
                            </div>
                        </li>
                    `);
                    }
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

}

function mostrarAdmins(){
    rol = 'ADMIN';
    $.ajax({
            url: '/controladorCliente/findbyrol',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: { rol: rol}, 
            success: function(response) {
                // Limpia el contenido de la lista ul antes de agregar el nuevo elemento
            $('#caja-administradores').empty();

            // Itera sobre la lista de usuarios
            response.forEach(function(user) {
                    // Desestructura los atributos del usuario
                    var username = user.username;
                    var nombre = user.nombre;
                    var apellido = user.apellido;
                    var ciudad = user.ciudad;
                    var direccion = user.direccion;
                    var telefono = user.telefono;

                    // Agrega un nuevo elemento li con los datos obtenidos
                    $('#caja-administradores').append(`
                        <li>
                            <h6><i class="fa fa-check"></i> ${username}</h6>
                            <div class="main-button">
                                <button 
                                onclick="cambiarRol('${username}', '${nombre}', '${apellido}', '${ciudad}', '${direccion}', 'USER', '${telefono}')">
                                Quitar administrador
                                </button>
                            </div>
                        </li>
                    `);
                });
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

}

function cambiarRol(username, nombre, apellido, ciudad, direccion, rol, telefono) {
    $.ajax({
        url: '/controladorCliente/updateUsuario', // Cambia la URL al endpoint correcto
        type: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
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
            alert(`Administrador actualizado: ${username}`);
        },
        error: function(xhr, status, error) {
            console.log(`Error al actualizar administrador:`, error);
        }
    });
    window.location.reload();
}