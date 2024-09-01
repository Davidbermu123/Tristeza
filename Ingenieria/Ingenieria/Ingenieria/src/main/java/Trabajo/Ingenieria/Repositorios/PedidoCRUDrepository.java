package Trabajo.Ingenieria.Repositorios;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import Trabajo.Ingenieria.Entidades.Pedido;

public interface PedidoCRUDrepository extends CrudRepository<Pedido, Long>{
    
    List<Pedido> findByUsername(String username);
}
