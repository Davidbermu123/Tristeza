package Trabajo.Ingenieria.Repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import Trabajo.Ingenieria.Entidades.role;
import Trabajo.Ingenieria.Entidades.usuario;
@Repository
public class clienteRepositorio {
    @Autowired
    private clienteCRUDrepositorios clienteCRUD;

    public usuario findByUsername(String username){
        return clienteCRUD.findByUsername(username);
    }    

    @SuppressWarnings("null")
    public usuario guardaraUsuario (usuario m){
        return clienteCRUD.save(m);
    }

    public role obtenerRolPorUsuario(String username) {
        usuario user = clienteCRUD.findByUsername(username);
        return user.getRol();
    }

    public List<usuario> getAllUsuarios() {
        return (List<usuario>) clienteCRUD.findAll();
    }

    public List<usuario> encontrarRol(role rol) {
        return (List<usuario>) clienteCRUD.findByRol(rol);
    }

    @Transactional
    public void actualizarUserPorUsername(String usernameBusqueda, 
                                        String nombre, 
                                        String apellido, 
                                        String ciudad, 
                                        String direccion, 
                                        role rol, 
                                        String telefono){
        clienteCRUD.updateUserByUsername(usernameBusqueda, nombre, apellido, ciudad, direccion, rol, telefono);
    }
    
}
