package Trabajo.Ingenieria.Repositorios;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import Trabajo.Ingenieria.Entidades.fichasStockEntidad;


public interface fichasStockCrudRepositorio extends CrudRepository<fichasStockEntidad, Long>{
    fichasStockEntidad findByIdItem(Long id);
    List<fichasStockEntidad> findByIdItemIn(Set<Long> ids);
}
