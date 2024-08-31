package Trabajo.Ingenieria.Repositorios;

import org.springframework.data.repository.CrudRepository;
import Trabajo.Ingenieria.Entidades.usuario;

public interface clienteCRUDrepositorios extends CrudRepository <usuario,Long>{

    usuario findByUsername(String username);
}
