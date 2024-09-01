package Trabajo.Ingenieria.Controladores;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Servicios.AnalisisComprasService;
import Trabajo.Ingenieria.Servicios.AnalisisVentasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/graficos")
public class AnalisisControlador {

    @Autowired
    private AnalisisVentasService ventasService;

    @Autowired
    private AnalisisComprasService comprasService;

    @GetMapping("/ventas-semanal")
    public List<Map<String, Object>> obtenerVentasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
        List<EntidadAnalisis> ventasDiarias = ventasService.obtenerVentasPorFecha(inicio, fin);
        List<Map<String, Object>> ventasPorFecha = new ArrayList<>();
        
        for (EntidadAnalisis venta : ventasDiarias) {
            Map<String, Object> ventaData = new HashMap<>();
            ventaData.put("fecha", venta.getFechaVenta().toString());
            ventaData.put("cantidad", venta.getVentas());
            ventasPorFecha.add(ventaData);
        }
    
        return ventasPorFecha;
    }
    
    @GetMapping("/compras-semanal")
    public List<Map<String, Object>> obtenerComprasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
        List<EntidadAnalisis> comprasDiarias = comprasService.obtenerComprasPorFecha(inicio, fin);
        List<Map<String, Object>> comprasPorFecha = new ArrayList<>();
    
        for (EntidadAnalisis compra : comprasDiarias) {
            Map<String, Object> compraData = new HashMap<>();
            compraData.put("fecha", compra.getFechaCompras().toString());
            compraData.put("cantidad", compra.getCompras());
            comprasPorFecha.add(compraData);
        }
    
        return comprasPorFecha;
    }
}
