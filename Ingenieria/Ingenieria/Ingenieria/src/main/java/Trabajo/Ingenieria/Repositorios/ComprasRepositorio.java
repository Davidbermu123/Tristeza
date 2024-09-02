package Trabajo.Ingenieria.Repositorios;

import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ComprasRepositorio extends JpaRepository<registroInventarioEntidad, Long> {

    @Query("SELECT r FROM registroInventarioEntidad r WHERE r.tipo = Trabajo.Ingenieria.Entidades.tipoRegistro.COMPRA AND r.fechaEntrada BETWEEN ?1 AND ?2")
    List<registroInventarioEntidad> findComprasPorFecha(LocalDateTime inicio, LocalDateTime fin);
}

