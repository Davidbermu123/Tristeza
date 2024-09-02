package Trabajo.Ingenieria.Repositorios;

import java.util.List;
import java.util.Optional;

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

    public List<Pedido> getAllPedidos() {
        return (List<Pedido>) pedidoCRUDrepository.findAll();
    }

    public List<Pedido> getPedidosByUsername(String username) {
        return pedidoCRUDrepository.findByUsername(username); 
    }

    public Optional<Pedido> findById(Long Id){
        return pedidoCRUDrepository.findById(Id);
    }

}
