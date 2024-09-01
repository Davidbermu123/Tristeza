function verificarTokenYRedireccionarALogin() {
    let token = localStorage.getItem('token');

    // Verificar si el token está presente
    if (token === null) {
        // Si el token no está presente, redirigir al usuario al inicio de sesión
        window.location.href = '/Vistas/inicioVista.html';
        return;
    }

    try {
        // Dividir el token en partes
        let tokenParts = token.split('.');
        
        // Verificar que el token tenga al menos 2 partes
        if (tokenParts.length !== 3) {
            throw new Error('Token JWT no válido.');
        }

        // Decodificar el payload
        let tokenPayload = JSON.parse(atob(tokenParts[1]));

        // Extraer el nombre de usuario
        let username = tokenPayload.sub;

        // Imprimir el nombre de usuario en la consola
        console.log(username);
    } catch (error) {
        console.error('Error al verificar el token:', error);
        // Redirigir al inicio de sesión en caso de error
        window.location.href = '/Vistas/inicioVista.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    verificarTokenYRedireccionarALogin();
    const pageContent = document.querySelector('.page-content');
    const formContainer = document.createElement('div');
    formContainer.className = 'p-4';
    pageContent.appendChild(formContainer);

    let productForms = []; // Para almacenar referencias a los formularios de producto

    const createProductForm = (index) => {
        const container = document.createElement('div');
        container.className = 'flex mb-4 p-4 border border-gray-300 rounded-lg position-relative';
        container.dataset.index = index; // Usar dataset para almacenar el índice

        // Botón para eliminar el div
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'absolute top-2 right-2 bg-red-500 text-white rounded-full p-1';
        deleteButton.addEventListener('click', () => {
            container.remove();
            productForms = productForms.filter(form => form !== container); // Eliminar del array
            updateProductOptions(); // Actualizar las opciones para evitar mostrar productos eliminados
        });
        container.appendChild(deleteButton);

        // Contenedor de la imagen
        const imageContainer = document.createElement('div');
        imageContainer.className = 'mr-4';

        const img = document.createElement('img');
        img.src = ''; // Inicialmente vacío
        img.alt = 'Imagen';
        img.className = 'border border-gray-400';
        imageContainer.appendChild(img);

        // Contenedor de los campos de entrada
        const inputContainer = document.createElement('div');
        inputContainer.className = 'flex-1 space-y-2';

        const productSelect = document.createElement('select');
        productSelect.className = 'w-full p-2 border border-gray-300 rounded';
        productSelect.addEventListener('change', (event) => {
            updateProductDetails(index, event.target.value);
        });

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.placeholder = 'Cantidad del pedido';
        quantityInput.className = 'w-full p-2 border border-gray-300 rounded';
        quantityInput.addEventListener('input', () => {
            updatePrice(index);
        });

        const stockSpan = document.createElement('span');
        stockSpan.className = 'block text-gray-300 stock-text'; // Para mostrar la cantidad en stock

        const priceInput = document.createElement('input');
        priceInput.type = 'text';
        priceInput.placeholder = 'Precio final';
        priceInput.className = 'w-full p-2 border border-gray-300 rounded';
        priceInput.disabled = true; // Solo para mostrar el precio final

        inputContainer.appendChild(productSelect);
        inputContainer.appendChild(quantityInput);
        inputContainer.appendChild(stockSpan);
        inputContainer.appendChild(priceInput);

        // Añadir la imagen y los campos al contenedor principal
        container.appendChild(imageContainer);
        container.appendChild(inputContainer);

        productForms.push(container); // Añadir a la lista de formularios
        return container;
    };

    const updateProductOptions = () => {
        fetch('/requestFichasStock/conStock')
            .then(response => response.json())
            .then(products => {
                document.querySelectorAll('select').forEach(select => {
                    // Obtener los productos ya seleccionados
                    const selectedValues = Array.from(document.querySelectorAll('select')).map(s => s.value);

                    select.innerHTML = ''; // Limpiar las opciones actuales

                    products.forEach(product => {
                        if (!selectedValues.includes(product.nombreItem)) {
                            const option = document.createElement('option');
                            option.value = product.nombreItem;
                            option.textContent = product.nombreItem;
                            select.appendChild(option);
                        }
                    });
                });
            });
    };

    const updateProductDetails = (index, productName) => {
        fetch(`/requestFichasStock/products?name=${encodeURIComponent(productName)}`)
            .then(response => response.json())
            .then(products => {
                if (products && products.length > 0) {
                    const product = products[0];
                    const container = productForms.find(form => form.dataset.index == index);

                    if (container) {
                        const img = container.querySelector('img');
                        const stockSpan = container.querySelector('span');
                        const quantityInput = container.querySelector('input[type="number"]');
                        const priceInput = container.querySelector('input[type="text"]');

                        if (img && stockSpan && quantityInput && priceInput) {
                            img.src = product.imagenItem || 'default-image.jpg'; // Imagen por defecto si es necesario
                            const stock = product.stockItem || 0;
                            const price = product.precioItem || 0;

                            stockSpan.textContent = `Stock disponible: ${stock}`;
                            quantityInput.setAttribute('max', stock);
                            priceInput.value = price;

                            updatePrice(index);
                        } else {
                            console.error('Elementos del contenedor no encontrados');
                        }
                    } else {
                        console.error('Contenedor no encontrado en el índice:', index);
                    }
                } else {
                    console.error('No se encontró el producto');
                }
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    };

    const updatePrice = (index) => {
        const container = productForms.find(form => form.dataset.index == index);
        const quantity = container.querySelector('input[type="number"]').value;
        const stock = container.querySelector('span').textContent.match(/\d+/);
        const price = container.querySelector('input[type="text"]');

        if (quantity > 0 && stock) {
            price.value = (quantity * stock).toFixed(2);
        } else {
            price.value = '';
        }
    };

    const addProduct = () => {
        const form = createProductForm(productForms.length);
        formContainer.insertBefore(form, addButtonContainer);
        updateProductOptions();
    };

    const addButtonContainer = document.createElement('div');
    addButtonContainer.className = 'mt-4 flex items-center justify-between';

    const addButton = document.createElement('button');
    addButton.className = 'p-2 bg-blue-500 text-white rounded hover:bg-blue-600';
    addButton.textContent = 'Agregar más productos';
    addButton.addEventListener('click', addProduct);

    const confirmButton = document.createElement('button');
    confirmButton.className = 'p-2 bg-green-500 text-white rounded hover:bg-green-600';
    confirmButton.textContent = 'Confirmar pedido';

    addButtonContainer.appendChild(addButton);
    addButtonContainer.appendChild(confirmButton);
    formContainer.appendChild(addButtonContainer);

    // Inicializar opciones de productos
    updateProductOptions();
});
