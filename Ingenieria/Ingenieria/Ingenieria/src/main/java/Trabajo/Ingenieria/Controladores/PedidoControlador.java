package Trabajo.Ingenieria.Controladores;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Trabajo.Ingenieria.Entidades.Pedido;
import Trabajo.Ingenieria.Servicios.PedidoService;
import Trabajo.Ingenieria.Servicios.fichasStockServicio;

@RestController
@RequestMapping("/pedidos")
public class PedidoControlador {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private fichasStockServicio fichasStockService;

    @PostMapping("/guardar")
    public Pedido guardarPedido(@RequestBody Pedido pedido) {
        Pedido pedidoGuardado = pedidoService.guardarPedido(pedido);
        
        // Actualiza el stock después de guardar el pedido
        fichasStockService.actualizarStock(pedido.getNombreProducto(), pedido.getCantidadPedido());
        
        return pedidoGuardado;
    }

    @GetMapping("/todosPedidos")
    public List<Pedido> getAllPedidos() {
        return pedidoService.getAllPedidos();
    }

    @GetMapping("/pedidoUsuario/{username}")
    public ResponseEntity<List<Pedido>> getPedidosByUsername(@PathVariable String username) {
        List<Pedido> pedidos = pedidoService.getPedidosByUsername(username);
        if (pedidos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(pedidos);
    }


    @GetMapping("/pedidoId/{Id}")
    public Optional<Pedido> findById(@PathVariable Long Id) {
        return pedidoService.findById(Id);
    }

    @PutMapping("/actualizarEstado/{idPedido}")
    public ResponseEntity<String> actualizarEstado(@PathVariable Long idPedido, @RequestParam String nuevoEstado) {
        try {
            pedidoService.actualizarEstadoPedido(idPedido, nuevoEstado);
            return ResponseEntity.ok("Estado actualizado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el estado");
        }
    }
    
}
