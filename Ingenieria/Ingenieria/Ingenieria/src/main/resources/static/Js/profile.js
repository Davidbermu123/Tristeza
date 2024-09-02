// Asume que tienes un API que proporciona los datos de los usuarios
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const usernameSelect = document.getElementById('usernameSelect');
    const usernameDisplay = document.getElementById('usernameDisplay');

    function verificarTokenYMostrarNombre() {
        if (token === null) {
            window.location.href = '/Vistas/inicioVista.html';
        } else {
            // Hacer una solicitud al backend para obtener el nombre de usuario
            fetch('/api/username', {
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
                return response.text();
            })
            .then(username => {
                // Mostrar el nombre de usuario en el HTML
                usernameDisplay.textContent = username;
            })
            .catch(error => {
                console.error('Error:', error);
                // Opcional: Mostrar un mensaje de error o realizar otras acciones
            });
        }
    }
    verificarTokenYMostrarNombre();

    // Cargar usuarios para el select
    fetch('/controladorCliente/getAllUsuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            let option = document.createElement('option');
            option.value = user.username;
            option.textContent = user.username;
            usernameSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al cargar usuarios:', error);
    });

    usernameSelect.addEventListener('change', function() {
        const selectedUsername = this.value;

        if (selectedUsername) {
            fetch(`/controladorCliente/getUsuario?username=${encodeURIComponent(selectedUsername)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(user => {
                document.getElementById('nombre').value = user.nombre;
                document.getElementById('apellido').value = user.apellido;
                document.getElementById('ciudad').value = user.ciudad;
                document.getElementById('direccion').value = user.direccion;
                document.getElementById('telefono').value = user.telefono;
            })
            .catch(error => {
                console.error('Error al cargar usuario:', error);
            });
        }
    });
});

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
