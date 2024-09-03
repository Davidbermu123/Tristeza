package Trabajo.Ingenieria.Servicios;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Trabajo.Ingenieria.Entidades.fichasStockEntidad;
import Trabajo.Ingenieria.Repositorios.fichasStockRepositorio;

@Service
public class fichasStockServicio {

    @Autowired
    private fichasStockRepositorio fichasStockRepositorio;

    public List<fichasStockEntidad>getAllfichasStockEntidad(){
        return fichasStockRepositorio.getAllfichasStockEntidad();
    }

    public void deleteById(Long id) {
        fichasStockRepositorio.deleteById(id);
    }

    public fichasStockEntidad save (fichasStockEntidad e){
        return fichasStockRepositorio.guardarElementoFichasStock(e);
    }

    public fichasStockEntidad findByIdItem(Long id){
        return fichasStockRepositorio.findByIdItem(id); // Asegúrate de que este método esté disponible
    }

    public List<fichasStockEntidad> obtenerItemsConStock() {
        return fichasStockRepositorio.obtenerItemsConStock();
    }

    public List<fichasStockEntidad> findProductsByName(String name) {
        return fichasStockRepositorio.findProductsByName(name);
    }

}
