package Trabajo.Ingenieria.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;

public interface registroInventarioCRUDRepositorio extends JpaRepository<registroInventarioEntidad, Long>  {

}
