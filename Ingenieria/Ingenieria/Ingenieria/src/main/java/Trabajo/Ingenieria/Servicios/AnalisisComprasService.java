package Trabajo.Ingenieria.Servicios;

import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import Trabajo.Ingenieria.Repositorios.ComprasRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnalisisComprasService {

    @Autowired
    private ComprasRepositorio comprasRepositorio;

    public List<registroInventarioEntidad> obtenerComprasPorFecha(LocalDateTime inicio, LocalDateTime fin) {
        return comprasRepositorio.findComprasPorFecha(inicio, fin);
    }
}
