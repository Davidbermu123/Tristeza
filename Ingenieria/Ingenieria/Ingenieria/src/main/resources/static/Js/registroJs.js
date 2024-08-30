function saveUsuario() {
    let name = $("#usuarioname").val();
    let lastname = $("#usuarioapellido").val();
    let alias = $("#usuarioalias").val();
    let dir = $("#usuariodireccion").val();
    let cel = $("#usuariotelefono").val();
    let barrio = $("#usuariociudad").val();
    let contrasena = $("#usuariocontrasena").val();

    if (name === '' || lastname === '' || alias === '' || dir === '' || cel === '' || barrio === '' || contrasena === '') {
        alert('Por favor, complete todos los campos.');
        return; // Detener la ejecución si algún campo está vacío
    }

    // Validación de la seguridad de la contraseña
    if (!isPasswordSecure(contrasena)) {
        alert('La contraseña no cumple con los criterios de seguridad: Debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter especial.');
        return; // Detener la ejecución si la contraseña no es segura
    }

    let data = {
        nombre: name,
        apellido: lastname,
        username: alias,
        direccion: dir,
        telefono: cel,
        ciudad: barrio,
        password: contrasena
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
            alert('Este usuario ya existe, por favor escoger otro');
            window.location.href = "/Vistas/registroVista.html";
        }
    });
}

function isPasswordSecure(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar;
}

function regresar() {
    window.location.href = "../index.html";
}
// Mostrar/Ocultar contraseña
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("usuariocontrasena");
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
}

// Generar contraseña segura automáticamente
function generatePassword() {
    const length = 8; // Longitud mínima de la contraseña
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let password = "";

    // Garantizar al menos un carácter de cada tipo
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

    // Rellenar el resto de la contraseña con caracteres aleatorios
    const allChars = lowercase + uppercase + numbers + specialChars;
    for (let i = 4; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    // Mezclar los caracteres para que no siga siempre el mismo patrón
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    document.getElementById("usuariocontrasena").value = password;
}


