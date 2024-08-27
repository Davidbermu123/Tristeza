function saveUsuario(){
    
    let name = $("#usuarioname").val();
    let lastname = $("#usuarioapellido").val();
    let alias = $("#usuarioalias").val();
    let dir = $("#usuariodireccion").val();
    let cel = $("#usuariotelefono").val();
    let barrio = $("#usuariociudad").val();
    let contrasena = $("#usuariocontrasena").val();


    if (name === '' || lastname === '' || alias === '' || dir === '' || cel === '' || barrio === ''  || contrasena === '') {
        alert('Por favor, complete todos los campos.');
        return; // Detener la ejecución si algún campo está vacío
    }
    let data = {
        nombre: name,
        apellido: lastname,
        username: alias,
        direccion: dir,
        telefono: cel,
        ciudad: barrio,
        password: contrasena,
        
        
    }
    localStorage.clear();
    $.ajax({
        url: '/auth/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            localStorage.setItem('token', response.token);
            window.location.href = "/Vistas/inicioVista.html";
        },
        error: function(xhr, status, error) {
            alert('Este usuario ya existe, por favor escoger otro', error);
            window.location.href = "/Vistas/registroVista.html";
        }
    });
}
function regresar() {
    window.location.href = "../index.html";
}