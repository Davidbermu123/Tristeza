package Trabajo.Ingenieria.Repositorios;
import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import Trabajo.Ingenieria.Entidades.fichasStockEntidad;

@Repository
public class fichasStockRepositorio {

    @Autowired
    private fichasStockCrudRepositorio fichasStockCrudRepositorio;

    public List<fichasStockEntidad> getAllfichasStockEntidad(){
        return ((List<fichasStockEntidad>)fichasStockCrudRepositorio.findAll());
    }

    public fichasStockEntidad guardarElementoFichasStock (fichasStockEntidad e){
        return fichasStockCrudRepositorio.save(e);
    }

    public fichasStockEntidad findByIdItem(Long id){
        return fichasStockCrudRepositorio.findByIdItem(id);
    }

    public Collection<fichasStockEntidad> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }
}
