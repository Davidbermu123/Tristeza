package Trabajo.Ingenieria.Controladores;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoService.obtenerTodosLosPedidos();
    }

    @GetMapping("/pedidoUsuario/{username}")
    public List<Pedido> obtenerPedidosPorUsername(@PathVariable String username) {
        return pedidoService.obtenerPedidosPorUsername(username);
    }

    @GetMapping("/pedidoId/{Id}")
    public Optional<Pedido> obtenerPedidoPorId(@PathVariable Long Id) {
        return pedidoService.obtenerPedidosPorId(Id);
    }

    @PutMapping("/actualizarEstado")
    public Pedido actualizarEstadoPedido(@RequestBody Map<String, Object> payload) {
        Long idPedido = ((Number) payload.get("id")).longValue();
        String nuevoEstado = (String) payload.get("estado");
        return pedidoService.actualizarEstadoPedido(idPedido, nuevoEstado);
    }
}
