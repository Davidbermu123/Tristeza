package Trabajo.Ingenieria.Servicios;

import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import Trabajo.Ingenieria.Repositorios.ComprasRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AnalisisComprasService {

    @Autowired
    private ComprasRepositorio comprasRepositorio;

    public List<registroInventarioEntidad> obtenerComprasPorFecha(String inicio, String fin) {
        // Formatear las fechas agregando una parte de tiempo
        LocalDateTime fechaInicio = LocalDateTime.parse(inicio + "T00:00:00", DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        LocalDateTime fechaFin = LocalDateTime.parse(fin + "T23:59:59", DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        return comprasRepositorio.findComprasPorFecha(fechaInicio, fechaFin);
    }
}