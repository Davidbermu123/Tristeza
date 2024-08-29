package Trabajo.Ingenieria.Servicios;

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
}
