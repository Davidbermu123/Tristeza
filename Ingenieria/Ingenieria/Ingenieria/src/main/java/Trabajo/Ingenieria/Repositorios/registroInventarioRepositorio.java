package Trabajo.Ingenieria.Repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;

@Repository
public class registroInventarioRepositorio {

    @Autowired
    private registroInventarioCRUDRepositorio registroInventarioRepository;

    public registroInventarioEntidad guardarRegistroInventario(registroInventarioEntidad registrarInventario){
        return registroInventarioRepository.save(registrarInventario);
    }

    public List<registroInventarioEntidad> obtenerTodosLosRegistros() {
        return registroInventarioRepository.findAll();
    }

    public Optional<registroInventarioEntidad> findById(Long id){
        return registroInventarioRepository.findById(id);
    }
}
