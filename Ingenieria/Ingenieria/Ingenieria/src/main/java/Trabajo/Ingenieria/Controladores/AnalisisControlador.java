package Trabajo.Ingenieria.Controladores;

import Trabajo.Ingenieria.Entidades.EntidadAnalisis;
import Trabajo.Ingenieria.Servicios.AnalisisComprasService;
import Trabajo.Ingenieria.Servicios.AnalisisVentasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.DayOfWeek;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Collections;

@RestController
@RequestMapping("/graficos")
public class AnalisisControlador {

    @Autowired
    private AnalisisVentasService ventasService;

    @Autowired
    private AnalisisComprasService comprasService;

    @GetMapping("/ventas-semanal")
    public Map<LocalDate, Integer> obtenerVentasSemanal(@RequestParam("inicio") Long inicio, @RequestParam("fin") Long fin) {
        LocalDate fechaActual = LocalDate.now();
        LocalDate inicioSemanaActual = fechaActual.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate finSemanaActual = fechaActual.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        Instant inicioSemanaInstant = inicioSemanaActual.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant finSemanaInstant = finSemanaActual.atStartOfDay(ZoneId.systemDefault()).toInstant();

        List<EntidadAnalisis> ventasSemanal = ventasService.obtenerVentasPorRango(inicio, fin);
        Map<LocalDate, Integer> ventasPorFecha = new HashMap<>();
        for (EntidadAnalisis venta : ventasSemanal) {
            // Ejemplo de cómo podrías extraer la fecha para tu gráfico
            LocalDate fechaVenta = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
            ventasPorFecha.put(fechaVenta, venta.getVentas());
        }

        return ventasPorFecha;
    }

    @GetMapping("/compras-semanal")
    public Map<LocalDate, Integer> obtenerComprasSemanal(@RequestParam("inicio") Long inicio, @RequestParam("fin") Long fin) {
        LocalDate fechaActual = LocalDate.now();
        LocalDate inicioSemanaActual = fechaActual.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate finSemanaActual = fechaActual.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        Instant inicioSemanaInstant = inicioSemanaActual.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant finSemanaInstant = finSemanaActual.atStartOfDay(ZoneId.systemDefault()).toInstant();

        List<EntidadAnalisis> comprasSemanal = comprasService.obtenerComprasPorRango(inicio, fin);
        Map<LocalDate, Integer> comprasPorFecha = new HashMap<>();
        for (EntidadAnalisis compra : comprasSemanal) {
            LocalDate fechaCompra = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
            comprasPorFecha.put(fechaCompra, compra.getCompras());
        }

        return comprasPorFecha;
    }
}