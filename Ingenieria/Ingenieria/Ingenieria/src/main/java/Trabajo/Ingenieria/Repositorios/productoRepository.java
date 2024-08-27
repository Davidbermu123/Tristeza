package Trabajo.Ingenieria.Repositorios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Trabajo.Ingenieria.Entidades.productoPrueba;

@Repository
public class productoRepository {

    @Autowired
    private productoCRUDrepository productoCRUDrepository;

    public productoPrueba findProductoByNombreProducto (String nombreProducto){
        return productoCRUDrepository.findByNombreProducto(nombreProducto);
    }

}
