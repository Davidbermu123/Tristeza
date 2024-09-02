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
        // Obtener el nombre de usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

       
        // Aquí podrías usar el username para realizar más validaciones si es necesario 
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
}
