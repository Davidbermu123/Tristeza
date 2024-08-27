package Trabajo.Ingenieria.Repositorios;

import org.springframework.data.repository.CrudRepository;

import Trabajo.Ingenieria.Entidades.productoPrueba;



public interface productoCRUDrepository extends CrudRepository<productoPrueba, Long>{

    productoPrueba findByNombreProducto(String nombreProducto);

}
