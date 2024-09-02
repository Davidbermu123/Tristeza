package Trabajo.Ingenieria.Repositorios;

import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ComprasRepositorio extends JpaRepository<registroInventarioEntidad, Long> {

    @Query("SELECT r FROM registroInventarioEntidad r WHERE r.tipo = 0 AND r.fechaEntrada BETWEEN :inicio AND :fin")
    List<registroInventarioEntidad> findComprasPorFecha(LocalDateTime inicio, LocalDateTime fin);
}
