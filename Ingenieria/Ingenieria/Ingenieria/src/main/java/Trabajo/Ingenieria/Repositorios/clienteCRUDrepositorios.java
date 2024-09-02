package Trabajo.Ingenieria.Repositorios;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

import Trabajo.Ingenieria.Entidades.role;
import Trabajo.Ingenieria.Entidades.usuario;

public interface clienteCRUDrepositorios extends CrudRepository <usuario,Long>{

    usuario findByUsername(String username);

    List<usuario> findByRol(role rol);

    @Modifying
    @Query("UPDATE usuario u SET u.nombre = :nombre, u.apellido = :apellido, u.ciudad = :ciudad, u.direccion = :direccion, u.rol = :rol, u.telefono = :telefono WHERE u.username = :usernameBusqueda")
    void updateUserByUsername(@Param("usernameBusqueda") String usernameBusqueda,
                              @Param("nombre") String nombre,
                              @Param("apellido") String apellido,
                              @Param("ciudad") String ciudad,
                              @Param("direccion") String direccion,
                              @Param("rol") role rol,
                              @Param("telefono") String telefono);
    
}
