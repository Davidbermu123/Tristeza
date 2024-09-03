package Trabajo.Ingenieria.Controladores;

import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import Trabajo.Ingenieria.Entidades.usuario;
import Trabajo.Ingenieria.Servicios.AnalisisComprasService;
import Trabajo.Ingenieria.Servicios.clienteServicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/graficos")
public class AnalisisControlador {

    @Autowired
    private AnalisisComprasService comprasService;

    @Autowired
    private clienteServicio usuarioService;

    @GetMapping("/compras-semanal")
    public List<Map<String, Object>> obtenerComprasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        List<registroInventarioEntidad> comprasDiarias = comprasService.obtenerComprasPorFecha(inicio, fin);
        List<Map<String, Object>> comprasPorFecha = new ArrayList<>();

        for (registroInventarioEntidad compra : comprasDiarias) {
            Map<String, Object> compraData = new HashMap<>();
            compraData.put("fecha", compra.getFechaEntrada().toString());
            compraData.put("cantidad", compra.getProductos().values().stream().mapToInt(p -> p.getCantidad()).sum());
            comprasPorFecha.add(compraData);
        }

        return comprasPorFecha;
    }

    @GetMapping("/ventas-semanal")
        public List<Map<String, Object>> obtenerVentasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            List<registroInventarioEntidad> comprasDiarias = comprasService.obtenerComprasPorFecha(inicio, fin);
            List<Map<String, Object>> ventasPorFecha = new ArrayList<>();

    for (registroInventarioEntidad compra : comprasDiarias) {
        int cantidadTotal = compra.getProductos().values().stream().mapToInt(p -> p.getCantidad()).sum();
        int mitadCantidad = cantidadTotal / 2;
        int cantidadDiaSiguiente = cantidadTotal - mitadCantidad;

        Map<String, Object> ventaDia = new HashMap<>();
        ventaDia.put("fecha", compra.getFechaEntrada().toString());
        ventaDia.put("cantidad", mitadCantidad);
        ventasPorFecha.add(ventaDia);

        Map<String, Object> ventaDiaSiguiente = new HashMap<>();
        ventaDiaSiguiente.put("fecha", compra.getFechaEntrada().plusDays(1).toString());
        ventaDiaSiguiente.put("cantidad", cantidadDiaSiguiente);
        ventasPorFecha.add(ventaDiaSiguiente);
    }

    return ventasPorFecha;
}

    @GetMapping("/rol")
    public String obtenerRolPorUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        usuario user = usuarioService.findByUsername(username);

        if (user != null) {
            return user.getRol().toString();
        } else {
            return "Usuario no encontrado";
        }
    }
}
