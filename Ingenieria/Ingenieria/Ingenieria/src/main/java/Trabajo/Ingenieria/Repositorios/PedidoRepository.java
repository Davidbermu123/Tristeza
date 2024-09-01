package Trabajo.Ingenieria.Repositorios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Trabajo.Ingenieria.Entidades.Pedido;

@Repository
public class PedidoRepository {

    @Autowired
    private PedidoCRUDrepository pedidoCRUDrepository;

    public Pedido guardarPedido(Pedido p){
        return pedidoCRUDrepository.save(p);
    }


}
