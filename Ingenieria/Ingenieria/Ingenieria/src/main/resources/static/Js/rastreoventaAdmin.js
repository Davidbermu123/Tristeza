function changeStatus(element) {
    // Obtiene el valor seleccionado
    let selectedStatus = element.value;

    // Guarda el estado actual en localStorage para que se sincronice con los íconos
    localStorage.setItem('currentStatus', selectedStatus);

    // Redirecciona a la página de los íconos para actualizar la vista
    window.location.href = 'rastreoventaCliente.html';
}
