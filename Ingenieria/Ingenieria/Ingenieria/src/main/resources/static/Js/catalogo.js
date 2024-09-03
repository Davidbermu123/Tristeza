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

function mostrar_todos() {
    $.ajax({
        url: '/requestFichasStock/getFichasStock',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            $("#featuredFichas").empty();

            $.each(data, function (index, fichaExistente) {
                var item = $('<div class="item"></div>');

                var imagen = $('<img>');
                imagen.attr("src", fichaExistente.imagenItem);  // URL de la imagen
                imagen.attr("alt", fichaExistente.nombreItem);  // Texto alternativo

                var titulo = $('<h4></h4>').text(fichaExistente.nombreItem);

                var lista = $('<ul></ul>');
                lista.append('<li><i class="fa-solid fa-money-bill-wave" style="color: #1cd08b;"></i> ' + fichaExistente.precioItem + '</li>');
                lista.append('<li><i class="fa-solid fa-box-open"></i> ' + fichaExistente.stockItem + '</li>');

                item.append(imagen);
                item.append(titulo);
                item.append(lista);

                $("#featuredFichas").append(item);
            });

            // Inicializar el carousel de Owl después de agregar los elementos
            $('.owl-features').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                items: 1, // Ajusta el número de elementos visibles según tu diseño
                autoplay: true,
                autoplayTimeout: 3000
            });
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los items:', error);
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

