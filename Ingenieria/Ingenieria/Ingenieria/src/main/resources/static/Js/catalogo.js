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

document.addEventListener('DOMContentLoaded', function () {
    verificarTokenYRedireccionarALogin();
    mostrar_todos();
});

function mostrar_todos(){
    $.ajax({
        url: '/requestFichasStock/getFichasStock',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(data) {
            // Limpiamos el contenedor principal antes de añadir nuevos elementos
            $("#imagenFicha").empty();

            $.each(data, function(index, fichaExistente) {
                // Creamos la estructura completa para cada ficha
                var item = $('<div class="col-lg-3 col-sm-6"></div>');
                
                var itemInner = $('<div class="item"></div>');
                
                var imagen = $('<img>');
                imagen.attr("src", fichaExistente.imagenItem);  // URL de la imagen
                imagen.attr("alt", fichaExistente.nombreItem);  // Texto alternativo

                var titulo = $('<h4></h4>').html(fichaExistente.nombreItem +  '</span>');

                var lista = $('<ul></ul>');
                lista.append('<li><i class="fa-solid fa-money-bill-wave" style="color: #1cd08b;"></i> ' + fichaExistente.precioItem + '</li>');
                lista.append('<li><i class="fa-solid fa-box-open"></i> ' + fichaExistente.stockItem + '</li>');
                lista.append('<li><i class="fa-solid fa-file-alt"></i> ' + fichaExistente.descripcionItem + '</li>');

                // Añadimos los elementos a su contenedor
                itemInner.append(imagen);
                itemInner.append(titulo);
                itemInner.append(lista);

                // Añadimos la estructura completa al div 'col-lg-3 col-sm-6'
                item.append(itemInner);

                // Finalmente, añadimos este elemento al contenedor principal
                $("#imagenFicha").append(item);
            });

        },error: function(xhr, status, error) {
            console.error('Error al verificar la existencia:', error);
        }
    });
}
$(document).ready(function() {
    $.ajax({
        url: "/requestFichasStock/getFichasStock",
        type: "GET",
        success: function(data) {
            data.forEach(function(item) {
                const productoHtml = `
                    <div class="producto">
                        <img src="${item.imagenItem}" alt="${item.nombreItem}" />
                        <h3>${item.nombreItem}</h3>
                        <p>Stock: ${item.stockItem}</p>
                        <p>Precio: $${item.precioItem.toFixed(2)}</p>
                        <p>Descripción: ${item.descripcionItem}</p>
                    </div>
                `;
                $("#productosContainer").append(productoHtml);
            });
        },
        error: function(error) {
            console.error("Error al obtener los productos:", error);
        }
    });
});
