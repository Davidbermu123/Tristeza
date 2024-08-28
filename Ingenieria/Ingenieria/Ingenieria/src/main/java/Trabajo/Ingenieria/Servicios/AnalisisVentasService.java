package Trabajo.Ingenieria.Servicios;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Repositorios.VentasRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalisisVentasService {

    @Autowired
    private VentasRepositorio ventasRepositorio;

    public List<EntidadAnalisis> obtenerVentasPorRango(Long inicio, Long fin) {
        return ventasRepositorio.findVentasPorRango(inicio, fin);
    }
}