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

    public fichasStockEntidad save (fichasStockEntidad e){
        return fichasStockRepositorio.guardarElementoFichasStock(e);
    }

    public fichasStockEntidad findByIdItem(Long id){
        return fichasStockRepositorio.findByIdItem(id);
    }
}
