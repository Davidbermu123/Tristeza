package Trabajo.Ingenieria.Controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Trabajo.Ingenieria.Entidades.Pedido;
import Trabajo.Ingenieria.Servicios.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoControlador {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/guardar")
    public Pedido guardarPedido(@RequestBody Pedido pedido) {
        return pedidoService.guardarPedido(pedido);
    }

}
