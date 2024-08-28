package Trabajo.Ingenieria.Servicios;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Repositorios.ComprasRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalisisComprasService {

    @Autowired
    private ComprasRepositorio comprasRepositorio;

    public List<EntidadAnalisis> obtenerComprasPorRango(Long inicio, Long fin) {
        return comprasRepositorio.findComprasPorRango(inicio, fin);
    }
}
