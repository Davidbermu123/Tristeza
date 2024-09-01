function verificarTokenYRedireccionarALogin() {
    let token = localStorage.getItem('token');

    // Verificar si el token está presente
    if (token === null) {
        window.location.href = '/Vistas/inicioVista.html';
        return;
    }

    try {
        let tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Token JWT no válido.');
        }

        let tokenPayload = JSON.parse(atob(tokenParts[1]));
        let username = tokenPayload.sub;
        console.log(username);

        // Guardar el username en una variable global para usarla más adelante
        window.loggedInUsername = username;

    } catch (error) {
        console.error('Error al verificar el token:', error);
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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'absolute top-2 right-2 bg-red-500 rounded-full p-1 delete-button';
        deleteButton.addEventListener('click', () => {
            container.remove();
            productForms = productForms.filter(form => form !== container); // Eliminar del array
            updateProductOptions(); // Actualizar las opciones para evitar mostrar productos eliminados
        });
        container.appendChild(deleteButton);

        const imageContainer = document.createElement('div');
        imageContainer.className = 'mr-4';

        const img = document.createElement('img');
        img.src = ''; // Inicialmente vacío
        img.alt = 'Imagen';
        img.className = 'border border-gray-400';
        imageContainer.appendChild(img);

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

    const generateOrderJSON = () => {
        const orders = [];
        const token = localStorage.getItem('token');

        // Verificar si el token está presente
        if (token === null) {
            console.error('Token no encontrado. No se puede generar el pedido.');
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
            let username = tokenPayload.sub;

            productForms.forEach(form => {
                const productSelect = form.querySelector('select');
                const quantityInput = form.querySelector('input[type="number"]');
                const priceInput = form.querySelector('input[type="text"]');
                const productName = productSelect.value;
                const quantity = quantityInput.value;
                const priceFinal = priceInput.value;

                if (productName && quantity > 0 && priceFinal) {
                    orders.push({
                        username: username,
                        nombreProducto: productName,
                        cantidad: parseInt(quantity),
                        precioFinal: parseFloat(priceFinal)
                    });
                }
            });

            return orders;
        } catch (error) {
            console.error('Error al verificar el token:', error);
        }
    };

    const confirmButton = document.createElement('button');
    confirmButton.className = 'p-2 bg-green-500 text-white rounded hover:bg-green-600';
    confirmButton.textContent = 'Confirmar pedido';
    confirmButton.addEventListener('click', () => {
        let isStockValid = true;
    
        productForms.forEach(container => {
            const quantityInput = container.querySelector('input[type="number"]');
            const stockText = container.querySelector('.stock-text').textContent;
            const stockMatch = stockText.match(/\d+/);
            const stock = stockMatch ? parseInt(stockMatch[0]) : 0;
    
            const quantity = parseInt(quantityInput.value);
    
            if (quantity > stock) {
                isStockValid = false;
            }
        });
    
        if (!isStockValid) {
            Swal.fire({
                title: 'Error',
                text: 'No es posible hacer el pedido porque la cantidad solicitada supera el stock disponible.',
                icon: 'error',
                confirmButtonColor: '#F505A5',
                background: '#1f1f1f',
                color: '#ffffff'
            });
            return; // Detiene la ejecución si hay un problema con el stock
        }
    
        const orders = generateOrderJSON();
        console.log(orders);
        // Proceder a crear los pedidos si todo es válido
        productForms.forEach(container => {
            const productSelect = container.querySelector('select').value;
            const quantity = container.querySelector('input[type="number"]').value;
            const priceFinal = container.querySelector('input[type="text"]').value;
            console.log(window.loggedInUsername);
            const pedidoData = {
                username: window.loggedInUsername, // Ya obtenido del token
                nombreProducto: productSelect,
                cantidadPedido: parseInt(quantity),
                estado: 'Aceptado por la compañia',
                precioFinal: parseFloat(priceFinal)
            };
    
            fetch('/pedidos/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoData)
            })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Los pedidos se han realizado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#F505A5',
                    background: '#1f1f1f',
                    color: '#ffffff'
                });
                console.log('Pedido guardado:', data);
            })
            .catch(error => {
                Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al realizar los pedidos.',
                icon: 'error',
                confirmButtonColor: '#F505A5',
                background: '#1f1f1f',
                color: '#ffffff'
                });
                console.error('Error al guardar el pedido:', error);
            });
        });
    });

    addButtonContainer.appendChild(addButton);
    addButtonContainer.appendChild(confirmButton);
    formContainer.appendChild(addButtonContainer);

    // Inicializar opciones de productos
    updateProductOptions();
});



