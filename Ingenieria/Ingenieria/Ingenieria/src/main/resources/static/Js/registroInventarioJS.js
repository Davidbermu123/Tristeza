let token = localStorage.getItem('token');
function verificarTokenYRedireccionarALogin() {
    if (token === null) {
        window.location.href = '/Vistas/inicioVista.html';
    } else {
        var tokenParts = token.split('.');
        var tokenPayload = JSON.parse(atob(tokenParts[1]));
        var username=tokenPayload.sub;
        console.log(username);
    }
}

window.onload = function() {
    verificarTokenYRedireccionarALogin();
    cargarRegistros(); // Cargar registros al cargar la página

    $('#registroForm').on('submit', function(event) {
        event.preventDefault();

        const nombre = $('#nombre').val();
        const tipo = $('#tipo').val();
        const productosText = $('#productos').val();

        let productos;
        try {
            productos = JSON.parse(productosText);
            const productosNumKeys = Object.fromEntries(
                Object.entries(productos).map(([key, value]) => [parseInt(key, 10), value])
            );

            const requestBody = {
                nombre: nombre,
                tipo: tipo,
                productos: productosNumKeys
            };

            $.ajax({
                url: '/registroInventario/crearRegistro',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(requestBody),
                success: function(data) {
                    $('#response').text('Registro creado con éxito: ' + JSON.stringify(data));
                    cargarRegistros(); // Recargar los registros después de agregar uno nuevo
                },
                error: function(error) {
                    console.error('Error:', error);
                    $('#response').text('Error al crear el registro.');
                }
            });
        } catch (error) {
            alert('Formato de productos inválido. Asegúrate de que es un JSON válido.');
        }
    });
}

function cargarRegistros() {
    $.ajax({
        url: '/registroInventario/obtenerRegistros',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(data) {
            const $tableBody = $('#registrosTable tbody');
            $tableBody.empty(); // Limpiar la tabla

            data.forEach(function(registro) {
                const $row = $('<tr>');
                $row.append($('<td>').text(registro.idRegistroInventario));
                $row.append($('<td>').text(registro.nombre));
                $row.append($('<td>').text(registro.tipo));
                $row.append($('<td>').text(formatDate(registro.fechaEntrada)));

                // Añadir el botón en la última columna
                const $accionesCell = $('<td>');
                const $btnVerDetalles = $('<button>').text('Ver Detalles');
                $btnVerDetalles.on('click', function() {
                    verDetalles(registro.idRegistroInventario);
                });
                $accionesCell.append($btnVerDetalles);
                $row.append($accionesCell);

                $tableBody.append($row);
            });
        },
        error: function(error) {
            console.error('Error:', error);
            $('#response').text('Error al cargar los registros.');
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function verDetalles(idRegistro) {
    $.ajax({
        url: `/registroInventario/obtenerRegistro/${idRegistro}`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(registro) {
            const fecha = formatDate(registro.fechaEntrada);
            const nombre = registro.nombre;
            const tipo = registro.tipo;
            const productos = registro.productos;

            const idsProductos = Object.keys(productos).map(Number);

            $.ajax({
                url: '/registroInventario/obtenerNombresProductos',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(idsProductos),
                success: function(productosNombres) {
                    const productosConNombres = {};

                    for (const [id, productInfo] of Object.entries(productos)) {
                        const nombreProducto = productosNombres[parseInt(id)];
                        productosConNombres[nombreProducto] = {
                            cantidad: productInfo.cantidad,
                            precioTotal: productInfo.precioTotal
                        };
                    }

                    const invoiceData = {
                        fechaEntrada: fecha,
                        nombre: nombre,
                        tipo: tipo,
                        productos: productosConNombres
                    };

                    $.ajax({
                        url: 'http://127.0.0.1:5000/create-invoice',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(invoiceData),
                        xhrFields: {
                            responseType: 'blob'
                        },
                        success: function(response) {
                            const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'invoice.pdf';
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                        },
                        error: function(error) {
                            console.error('Error al generar el PDF:', error);
                            alert('Error al generar el PDF.');
                        }
                    });
                },
                error: function(error) {
                    console.error('Error al obtener los nombres de los productos:', error);
                    $('#response').text('Error al cargar los nombres de los productos.');
                }
            });
        },
        error: function(error) {
            console.error('Error al cargar el registro:', error);
            $('#response').text('Error al cargar el registro.');
        }
    });
}
