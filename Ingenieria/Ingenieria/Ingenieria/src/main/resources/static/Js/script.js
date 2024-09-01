$(document).ready(function() {
    // Hacer la solicitud AJAX al backend
    $.ajax({
        url: '/requestFichasStock/conStock',
        method: 'GET',
        success: function(data) {
            // Selecciona el contenedor donde se mostrarán los items
            const itemsContainer = $('#items-container');
            
            // Itera sobre los elementos devueltos por la API
            data.forEach(function(item) {
                // Crea un contenedor para cada item
                const itemContainer = $('<div class="item-container"></div>');
                
                // Agrega la imagen del item
                const itemDetails = $('<div class="item-details"></div>');
                const itemImage = $(`<img src="${item.imagenItem}" alt="${item.nombreItem}">`);
                itemDetails.append(itemImage);
                
                // Agrega los detalles del item
                const itemInfo = $(`
                    <div>
                        <h3>${item.nombreItem}</h3>
                        <p><strong>Stock:</strong> ${item.stockItem}</p>
                        <p><strong>Precio:</strong> $${item.precioItem.toFixed(2)}</p>
                    </div>
                `);
                itemDetails.append(itemInfo);
                
                // Agrega los detalles al contenedor del item
                itemContainer.append(itemDetails);
                
                // Agrega el contenedor del item al contenedor principal
                itemsContainer.append(itemContainer);
            });
        },
        error: function(error) {
            console.error('Error al obtener los items:', error);
        }
    });
});
