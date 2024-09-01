package Trabajo.Ingenieria.Servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Trabajo.Ingenieria.Entidades.Pedido;
import Trabajo.Ingenieria.Repositorios.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido guardarPedido(Pedido p){
        return pedidoRepository.guardarPedido(p);
    }

    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository. obtenerTodosLosPedidos();
    }

    public List<Pedido> obtenerPedidosPorUsername(String username) {
        return pedidoRepository.obtenerPedidosPorUsername(username); 
    }

    public Optional<Pedido> obtenerPedidosPorId(Long Id) {
        return pedidoRepository.findById(Id); 
    }

    public Pedido actualizarEstadoPedido(Long idPedido, String nuevoEstado) {
        Optional<Pedido> optionalPedido = pedidoRepository.findById(idPedido);
        if (optionalPedido.isPresent()) {
            Pedido pedido = optionalPedido.get();
            pedido.setEstado(nuevoEstado);
            return pedidoRepository.guardarPedido(pedido);
        } else {
            throw new RuntimeException("Pedido no encontrado con ID: " + idPedido);
        }
    }
}
