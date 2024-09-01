package Trabajo.Ingenieria.Servicios;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Repositorios.ComprasRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AnalisisComprasService {

    @Autowired
    private ComprasRepositorio comprasRepositorio;

    public List<EntidadAnalisis> obtenerComprasPorFecha(String inicio, String fin) {
        return comprasRepositorio.findComprasPorFecha(LocalDate.parse(inicio), LocalDate.parse(fin));
    }
}
