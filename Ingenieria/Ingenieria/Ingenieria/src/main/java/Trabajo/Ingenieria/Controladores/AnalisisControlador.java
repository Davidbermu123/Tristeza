package Trabajo.Ingenieria.Controladores;

import Trabajo.Ingenieria.Entidades.ProductInfo;
import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import Trabajo.Ingenieria.Entidades.usuario;
import Trabajo.Ingenieria.Servicios.AnalisisComprasService;
import Trabajo.Ingenieria.Servicios.clienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/graficos")
public class AnalisisControlador {

    @Autowired
    private AnalisisComprasService comprasService;

    @Autowired
    private clienteServicio usuarioService;

    @GetMapping("/compras-semanal")
    public List<Map<String, Object>> obtenerComprasDiarias(@RequestParam("inicio") String inicio, @RequestParam("fin") String fin) {
        // Verificar el rol del usuario antes de procesar la solicitud
        String rol = obtenerRolPorUsuario();
        if (!"ADMIN".equals(rol) && !"COMPRAS".equals(rol)) {
            throw new SecurityException("No tienes permiso para acceder a esta información");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime fechaInicio = LocalDateTime.parse(inicio, formatter);
        LocalDateTime fechaFin = LocalDateTime.parse(fin, formatter);

        List<registroInventarioEntidad> comprasDiarias = comprasService.obtenerComprasPorFecha(fechaInicio, fechaFin);
        List<Map<String, Object>> comprasPorFecha = new ArrayList<>();

        for (registroInventarioEntidad compra : comprasDiarias) {
            for (Map.Entry<Long, ProductInfo> entry : compra.getProductos().entrySet()) {
                Map<String, Object> compraData = new HashMap<>();
                compraData.put("fecha", compra.getFechaEntrada().toString());
                compraData.put("cantidad", entry.getValue().getCantidad());
                comprasPorFecha.add(compraData);
            }
        }

        return comprasPorFecha;
    }
    
    private String obtenerRolPorUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        usuario user = usuarioService.findByUsername(username);
        return (user != null) ? user.getRol().toString() : "Usuario no encontrado";
    }
}
