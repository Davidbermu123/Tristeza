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

function filterItems() {
    const precioFiltro = document.getElementById('precio').value;
    const stockFiltro = document.getElementById('stock').value;

    console.log("Precio Filtro: ", precioFiltro);
    console.log("Stock Filtro: ", stockFiltro);

    // Preparamos los parámetros de filtrado
    let params = {};
    if (precioFiltro && precioFiltro !== 'todos') {
        params.precio = parseFloat(precioFiltro);
    }
    if (stockFiltro && stockFiltro !== 'todos') {
        params.stock = parseInt(stockFiltro);
    }

    $.ajax({
        url: '/requestFichasStock/getFichasStock',
        type: 'GET',
        data: params,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            console.log("Datos filtrados recibidos: ", data);

            $("#imagenFicha").empty();

            if (Array.isArray(data)) {
                $.each(data, function (index, fichaExistente) {
                    // Filtrar los datos en el cliente
                    let mostrar = true;

                    if (params.precio && fichaExistente.precioItem >= params.precio) {
                        mostrar = false;
                    }

                    if (params.stock && fichaExistente.stockItem < params.stock) {
                        mostrar = false;
                    }

                    // Solo mostrar el item si cumple con los filtros
                    if (mostrar) {
                        var item = $('<div class="col-lg-3 col-sm-6"></div>');

                        var itemInner = $('<div class="item"></div>');

                        var imagen = $('<img>');
                        imagen.attr("src", fichaExistente.imagenItem);
                        imagen.attr("alt", fichaExistente.nombreItem);

                        var titulo = $('<h4></h4>').text(fichaExistente.nombreItem);

                        var lista = $('<ul></ul>');
                        lista.append('<li><i class="fa-solid fa-money-bill-wave" style="color: #1cd08b;"></i> ' + fichaExistente.precioItem + '</li>');
                        lista.append('<li><i class="fa-solid fa-box-open"></i> ' + fichaExistente.stockItem + '</li>');

                        itemInner.append(imagen);
                        itemInner.append(titulo);
                        itemInner.append(lista);

                        item.append(itemInner);
                        $("#imagenFicha").append(item);
                    }
                });
            } else {
                console.error("Los datos recibidos no son un array.");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al filtrar los items:', error);
        }
    });
}

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