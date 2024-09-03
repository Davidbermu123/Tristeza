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
        success: function (data) {
            // Limpiamos el contenedor principal antes de añadir nuevos elementos
            $("#imagenFicha").empty();

            $.each(data, function (index, fichaExistente) {
                // Creamos la estructura completa para cada ficha
                var item = $('<div class="col-lg-3 col-sm-6"></div>');

                var itemInner = $('<div class="item"></div>');

                var imagen = $('<img>');
                imagen.attr("src", fichaExistente.imagenItem);  // URL de la imagen
                imagen.attr("alt", fichaExistente.nombreItem);  // Texto alternativo

                var titulo = $('<h4></h4>').html(fichaExistente.nombreItem + '</span>');

                var lista = $('<ul></ul>');
                lista.append('<li><i class="fa-solid fa-money-bill-wave" style="color: #1cd08b;"></i> ' + fichaExistente.precioItem + '</li>');
                lista.append('<li><i class="fa-solid fa-box-open"></i> ' + fichaExistente.stockItem + '</li>');

                // Añadimos los elementos a su contenedor
                itemInner.append(imagen);
                itemInner.append(titulo);
                itemInner.append(lista);

                // Añadimos la estructura completa al div 'col-lg-3 col-sm-6'
                item.append(itemInner);

                // Finalmente, añadimos este elemento al contenedor principal
                $("#imagenFicha").append(item);
            });

        }, error: function (xhr, status, error) {
            console.error('Error al verificar la existencia:', error);
        }
    });
}
function cargarProductos() {
    let token = localStorage.getItem('token'); // Suponiendo que el token se usa para la autorización

    $.ajax({
        url: '/requestFichasStock/getFichasStock',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token // Agrega el token en los encabezados si es necesario
        },
        success: function (data) {
            console.log('Data received:', data); // Imprimir los datos recibidos
            productos = data; // Asumiendo que `data` es una lista de objetos `fichasStockEntidad`
            actualizarProductos();
        },
        error: function (xhr, status, error) {
            console.error('Error al cargar los productos:', error);
        }
    });
}

function actualizarProductos() {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        const producto = productos[(currentIndex + i) % productos.length];
        if (producto) {
            const item = `
                <div class="col-lg-3 col-sm-6">
                    <div class="item">
                        <img src="${producto.imagen}" alt="">
                        <h4>${producto.nombre}<br><span>${producto.categoria}</span></h4>
                        <ul>
                            <li><i class="fa fa-star"></i> ${producto.calificacion}</li>
                            <li><i class="fa fa-money-bill"></i> ${producto.precio}</li>
                        </ul>
                    </div>
                </div>
            `;
            container.innerHTML += item;
        }
    }

    currentIndex = (currentIndex + 4) % productos.length;
}

cargarProductos();
setInterval(actualizarProductos, 5 * 60 * 1000); // Actualiza cada 5 minutos

