package Trabajo.Ingenieria.Controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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

}
