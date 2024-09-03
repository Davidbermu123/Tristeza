package Trabajo.Ingenieria.Repositorios;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Trabajo.Ingenieria.Entidades.fichasStockEntidad;

@Repository
public class fichasStockRepositorio {

    @Autowired
    private fichasStockCrudRepositorio fichasStockCrudRepositorio;


    public void deleteById(Long id) {
        fichasStockCrudRepositorio.deleteById(id);
    }

    public List<fichasStockEntidad> getAllfichasStockEntidad(){
        return ((List<fichasStockEntidad>)fichasStockCrudRepositorio.findAll());
    }

    public fichasStockEntidad guardarElementoFichasStock (fichasStockEntidad e){
        return fichasStockCrudRepositorio.save(e);
    }

    public fichasStockEntidad findByIdItem(Long id){
        return fichasStockCrudRepositorio.findByIdItem(id);
    }

    public List<fichasStockEntidad> obtenerItemsConStock() {
        return fichasStockCrudRepositorio.findByStockItemGreaterThan(0);
    }

    public List<fichasStockEntidad> findProductsByName(String name) {
        return fichasStockCrudRepositorio.findByNombreItem(name);
    }

    public List<fichasStockEntidad> obtenerNombresDeProductos(Set<Long> idsProductos){
        return fichasStockCrudRepositorio.findByIdItemIn(idsProductos);
    }
}
