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

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.getAllPedidos();
    }

    public List<Pedido> getPedidosByUsername(String username) {
        return pedidoRepository.getPedidosByUsername(username); 
    }

    public Optional<Pedido> findById(Long Id) {
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
