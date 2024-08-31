package Trabajo.Ingenieria.Repositorios;

import org.springframework.data.repository.CrudRepository;
import Trabajo.Ingenieria.Entidades.fichasStockEntidad;


public interface fichasStockCrudRepositorio extends CrudRepository<fichasStockEntidad, Long>{
    fichasStockEntidad findByIdItem(Long id);
}
