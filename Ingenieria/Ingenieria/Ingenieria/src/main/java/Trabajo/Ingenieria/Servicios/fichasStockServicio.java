package Trabajo.Ingenieria.Servicios;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Trabajo.Ingenieria.Entidades.fichasStockEntidad;
import Trabajo.Ingenieria.Repositorios.fichasStockRepositorio;
import jakarta.transaction.Transactional;

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

    public List<fichasStockEntidad> obtenerItemsConStock() {
        return fichasStockRepositorio.obtenerItemsConStock();
    }

    public List<fichasStockEntidad> findProductsByName(String name) {
        return fichasStockRepositorio.findProductsByName(name);
    }

    @Transactional
    public void actualizarStock(String nombreItem, int cantidadPedido) {
        // Busca el producto por nombre
        fichasStockEntidad producto = fichasStockRepositorio.findProductsByName(nombreItem).get(0);

        // Resta la cantidad del pedido al stock actual
        int nuevoStock = producto.getStockItem() - cantidadPedido;

        // Asegúrate de que el stock no sea negativo
        if (nuevoStock < 0) {
            nuevoStock = 0; // o puedes lanzar una excepción si esto no debería suceder
        }

        // Actualiza el stock en la base de datos
        producto.setStockItem(nuevoStock);
        fichasStockRepositorio.guardarElementoFichasStock(producto);
    }

}
