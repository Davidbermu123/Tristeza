package Trabajo.Ingenieria.Repositorios;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ComprasRepositorio extends JpaRepository<EntidadAnalisis, Long> {
    
    @Query("SELECT e FROM EntidadAnalisis e WHERE e.Compras IS NOT NULL AND e.idItem BETWEEN ?1 AND ?2")
    List<EntidadAnalisis> findComprasPorRango(Long inicio, Long fin);
}