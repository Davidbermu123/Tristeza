package Trabajo.Ingenieria.Controladores;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Servicios.AnalisisComprasService;
import Trabajo.Ingenieria.Servicios.AnalisisVentasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/graficos")
public class AnalisisControlador {

    @Autowired
    private AnalisisVentasService ventasService;

    @Autowired
    private AnalisisComprasService comprasService;

@GetMapping("/ventas-semanal")
public Map<String, Integer> obtenerVentasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
    List<EntidadAnalisis> ventasDiarias = ventasService.obtenerVentasPorFecha(inicio, fin);
    Map<String, Integer> ventasPorFecha = new HashMap<>();
    
    for (EntidadAnalisis venta : ventasDiarias) {
        LocalDate fechaVenta = venta.getFechaVenta().toLocalDate();
        String key = fechaVenta.toString(); // Fecha sin la hora
        ventasPorFecha.merge(key, venta.getVentas(), Integer::sum);
    }

    return ventasPorFecha;
}

@GetMapping("/compras-semanal")
public Map<String, Integer> obtenerComprasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
    List<EntidadAnalisis> comprasDiarias = comprasService.obtenerComprasPorFecha(inicio, fin);
    Map<String, Integer> comprasPorFecha = new HashMap<>();

    for (EntidadAnalisis compra : comprasDiarias) {
        LocalDate fechaCompra = compra.getFechaCompras().toLocalDate();
        String key = fechaCompra.toString(); // Fecha sin la hora
        comprasPorFecha.merge(key, compra.getCompras(), Integer::sum);
    }

    return comprasPorFecha;
}
}
