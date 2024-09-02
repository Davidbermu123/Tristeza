let productos = [];
let currentIndex = 0;

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

