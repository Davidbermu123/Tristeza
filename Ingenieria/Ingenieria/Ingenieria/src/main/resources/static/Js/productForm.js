document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.querySelector('.page-content');
  
    const createProductForm = (index) => {
      const container = document.createElement('div');
      container.className = 'flex mb-4 p-4 border border-gray-300 rounded-lg';
  
      // Contenedor de la imagen
      const imageContainer = document.createElement('div');
      imageContainer.className = 'mr-4'; // Margen a la derecha para separar la imagen de los campos
  
      const img = document.createElement('img');
      img.src = '/Imagenes/a.jpg'; // Cambia esta ruta por la ruta de tu imagen
      img.alt = 'Imagen';
      img.className = 'border border-gray-400';
  
      imageContainer.appendChild(img);
  
      // Contenedor de los campos de entrada
      const inputContainer = document.createElement('div');
      inputContainer.className = 'flex-1 space-y-2'; // flex-1 para ocupar el resto del espacio
  
      const productInput = document.createElement('input');
      productInput.type = 'text';
      productInput.placeholder = 'Lista productos';
      productInput.className = 'w-full p-2 border border-gray-300 rounded';
  
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.placeholder = 'Cantidad del pedido';
      quantityInput.className = 'w-full p-2 border border-gray-300 rounded';
  
      const stockInput = document.createElement('input');
      stockInput.type = 'number';
      stockInput.placeholder = 'Cantidad en stock';
      stockInput.className = 'w-full p-2 border border-gray-300 rounded';
  
      const priceInput = document.createElement('input');
      priceInput.type = 'number';
      priceInput.placeholder = 'Precio por unidad';
      priceInput.className = 'w-full p-2 border border-gray-300 rounded';
  
      inputContainer.appendChild(productInput);
      inputContainer.appendChild(quantityInput);
      inputContainer.appendChild(stockInput);
      inputContainer.appendChild(priceInput);
  
      // Añadir la imagen y los campos al contenedor principal
      container.appendChild(imageContainer);
      container.appendChild(inputContainer);
  
      return container;
    };
  
    const addProduct = () => {
      const form = createProductForm(products.length);
      formContainer.appendChild(form);
      products.push({});
    };
  
    const formContainer = document.createElement('div');
    formContainer.className = 'p-4';
  
    const products = [{}];
    products.forEach((_, index) => {
      const form = createProductForm(index);
      formContainer.appendChild(form);
    });
  
    const addButton = document.createElement('button');
    addButton.className = 'mt-4 flex items-center justify-center w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600';
    addButton.textContent = 'Agregar más productos';
    addButton.addEventListener('click', addProduct);
  
    formContainer.appendChild(addButton);
    pageContent.appendChild(formContainer);
  });
  