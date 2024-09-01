package Trabajo.Ingenieria.Servicios;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Repositorios.VentasRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AnalisisVentasService {
    
    @Autowired
    private VentasRepositorio ventasRepositorio;

    public List<EntidadAnalisis> obtenerVentasPorFecha(String inicio, String fin) {
        return ventasRepositorio.findVentasPorFecha(LocalDate.parse(inicio), LocalDate.parse(fin));
    }
}