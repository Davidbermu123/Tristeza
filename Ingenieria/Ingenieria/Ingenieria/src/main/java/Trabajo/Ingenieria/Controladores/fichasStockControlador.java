package Trabajo.Ingenieria.Controladores;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
     @GetMapping("/getFichasStockConLimite")
    public List<fichasStockEntidad> getFichasStockConLimite(@RequestParam int limit) {
        return fichasStockServicio.getFichasStockConLimite(limit);
    }

    @PostMapping("/guardarFichasStock")
    public fichasStockEntidad guardarFichasStockEntidad(@RequestBody fichasStockEntidad e){
        return fichasStockServicio.save(e);
    }
    
}
