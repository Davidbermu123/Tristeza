package Trabajo.Ingenieria.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Trabajo.Ingenieria.Entidades.role;
import Trabajo.Ingenieria.Entidades.usuario;
import Trabajo.Ingenieria.Repositorios.clienteRepositorio;

@Service
public class clienteServicio {
  @Autowired
    private clienteRepositorio usuarioRepository;
    
    public usuario findByUsername(String username){
        return usuarioRepository.findByUsername(username);
    }

    public role obtenerRolPorUsuario(String username) {
        usuario user = usuarioRepository.findByUsername(username);
        return user.getRol();
    }

    public List<usuario> getAllUsuarios(){
        return usuarioRepository.getAllUsuarios();
    }    

    public usuario save(usuario k){
        return usuarioRepository.guardaraUsuario(k);
    }

    public List<usuario> obtenerRol(role rol){
        return usuarioRepository.encontrarRol(rol);
    }  

    public void actualizarUsuarioPorUsername(String usernameBusqueda, String nombre, String apellido, String ciudad, String direccion, role rol, String telefono) {
        // Obtener el usuario a actualizars
        usuario usuario = usuarioRepository.findByUsername(usernameBusqueda);
        
        // Verificar si se encontró el usuario
        if (usuario != null) {
            // Actualizar los campos permitidos
            usuario.setNombre(nombre);
            usuario.setApellido(apellido);
            usuario.setCiudad(ciudad);
            usuario.setDireccion(direccion);
            usuario.setRol(rol);
            usuario.setTelefono(telefono);
            
            // Guardar los cambios en la base de datos
            usuarioRepository.guardaraUsuario(usuario);
        } else {
            // Manejar el caso en que no se encuentre el usuario
            throw new RuntimeException("El usuario con el alias proporcionado no existe: " + usernameBusqueda);
        }
    }
}
