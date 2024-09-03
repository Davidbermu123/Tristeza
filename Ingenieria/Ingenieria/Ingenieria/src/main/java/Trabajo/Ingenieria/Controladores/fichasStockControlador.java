package Trabajo.Ingenieria.Controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Trabajo.Ingenieria.Entidades.fichasStockEntidad;
import Trabajo.Ingenieria.Servicios.fichasStockServicio;

@RestController
@RequestMapping("/requestFichasStock")

public class fichasStockControlador {

    @Autowired 
    private fichasStockServicio fichasStockServicio;

    @GetMapping("/getFichasStock")
    public List<fichasStockEntidad> getAllFichasStockEntidad(){
        return fichasStockServicio.getAllfichasStockEntidad();
    }

    @PostMapping("/guardarFichasStock")
    public fichasStockEntidad guardarFichasStockEntidad(@RequestBody fichasStockEntidad e){
        return fichasStockServicio.save(e);
    }

    @DeleteMapping("/eliminarFichasStock/{id}")
    public ResponseEntity<Void> eliminarFichasStock(@PathVariable("id") Long id) {
        fichasStockServicio.deleteById(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    @GetMapping("/conStock")
    public List<fichasStockEntidad> obtenerItemsConStock() {
        return fichasStockServicio.obtenerItemsConStock();
    }

    @GetMapping("/products")
    public List<fichasStockEntidad> getProductsByName(@RequestParam String name) {
        return fichasStockServicio.findProductsByName(name);
    }

    @GetMapping("/buscarFichasStock/{id}")
    public ResponseEntity<fichasStockEntidad> buscarFichasStock(@PathVariable("id") Long id) {
        fichasStockEntidad entidad = fichasStockServicio.findByIdItem(id);
        if (entidad != null) {
            return ResponseEntity.ok(entidad);
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
}
