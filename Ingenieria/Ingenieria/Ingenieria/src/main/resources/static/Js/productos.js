let productos = [];
let currentIndex = 0;
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
mostrar_todos();

function mostrar_todos() {
    $.ajax({
        url: '/requestFichasStock/getFichasStock',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(data) {
            // Limpiamos el contenedor principal antes de añadir nuevos elementos
            $("#imagenFicha").empty();

            // Añade solo los primeros 4 items
            var limite = 4;
            $.each(data.slice(0, limite), function(index, fichaExistente) {
                // Creamos la estructura completa para cada ficha
                var item = $('<div class="col-lg-3 col-sm-6"></div>');
                
                var itemInner = $('<div class="item"></div>');
                
                var img = $('<img>').attr('src', fichaExistente.imagenItem).addClass('templatemo-item');
                var nombre = $('<h4></h4>').text(fichaExistente.nombreItem);
                var descripcion = $('<p></p>').text(fichaExistente.descripcionItem);
                var precio = $('<span></span>').text('Precio: ' + fichaExistente.precioItem);
                
                itemInner.append(img).append(nombre).append(descripcion).append(precio);
                item.append(itemInner);

                $("#imagenFicha").append(item);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar los productos: ', error);
        }
    });
}