package Trabajo.Ingenieria.Controladores;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Entidades.usuario;
import Trabajo.Ingenieria.Servicios.AnalisisComprasService;
import Trabajo.Ingenieria.Servicios.AnalisisVentasService;
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
    private AnalisisVentasService ventasService;

    @Autowired
    private AnalisisComprasService comprasService;

    @Autowired
    private clienteServicio usuarioService;

    @GetMapping("/rol")
    public String obtenerRolPorUsuario() {
        // Obtener el nombre de usuario del objeto Authentication
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Buscar el usuario en el servicio Usuario_modelos
        usuario user = usuarioService.findByUsername(username);

        // Verificar si el usuario existe y devolver su rol
        if (user != null) {
            return user.getRol().toString();
        } else {
            return "Usuario no encontrado";
        }
    }

    @GetMapping("/ventas-semanal")
    public List<Map<String, Object>> obtenerVentasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
        // Verificar el rol del usuario antes de procesar la solicitud
        String rol = obtenerRolPorUsuario();
        if (!"ADMIN".equals(rol) && !"VENTAS".equals(rol)) {
            throw new SecurityException("No tienes permiso para acceder a esta información");
        }

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
        // Verificar el rol del usuario antes de procesar la solicitud
        String rol = obtenerRolPorUsuario();
        if (!"ADMIN".equals(rol) && !"COMPRAS".equals(rol)) {
            throw new SecurityException("No tienes permiso para acceder a esta información");
        }

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