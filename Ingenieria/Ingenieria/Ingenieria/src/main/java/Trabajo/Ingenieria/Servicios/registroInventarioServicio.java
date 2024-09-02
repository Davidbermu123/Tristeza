package Trabajo.Ingenieria.Servicios;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Trabajo.Ingenieria.Entidades.ProductInfo;
import Trabajo.Ingenieria.Entidades.fichasStockEntidad;
import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import Trabajo.Ingenieria.Entidades.tipoRegistro;
import Trabajo.Ingenieria.Repositorios.fichasStockCrudRepositorio;
import Trabajo.Ingenieria.Repositorios.registroInventarioRepositorio;

@Service
public class registroInventarioServicio {

    @Autowired
    private registroInventarioRepositorio repositorio;

    @Autowired
    private fichasStockCrudRepositorio fichasStockEntidadRepository;

    public registroInventarioEntidad registrarInventario(String nombre, Map<Long, ProductInfo> productosMap, tipoRegistro tipo) {
        // Crear el registro de inventario
        registroInventarioEntidad registroInventario = new registroInventarioEntidad();
        registroInventario.setFechaEntrada(LocalDateTime.now());
        registroInventario.setNombre(nombre);
        registroInventario.setTipo(tipo);

        // Guardar el registro de inventario para obtener el ID
        registroInventarioEntidad registroGuardado = repositorio.guardarRegistroInventario(registroInventario);

        // Actualizar el stock de los productos
        for (Map.Entry<Long, ProductInfo> entry : productosMap.entrySet()) {
            fichasStockEntidad producto = fichasStockEntidadRepository.findById(entry.getKey())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // Actualizar el stock del producto
            producto.setStockItem(producto.getStockItem() + entry.getValue().getCantidad());
            fichasStockEntidadRepository.save(producto);
        }

        // Establecer los productos en el registro de inventario y guardar la relación
        registroGuardado.setProductos(productosMap);
        return repositorio.guardarRegistroInventario(registroGuardado);
    }

    public List<registroInventarioEntidad> obtenerTodosLosRegistros() {
        return repositorio.obtenerTodosLosRegistros();
    }

    public registroInventarioEntidad obtenerRegistroPorId(Long idRegistro) {
        return repositorio.findById(idRegistro)
                .orElseThrow(() -> new RuntimeException("Registro de inventario no encontrado"));
    }

    public Map<Long, String> obtenerNombresDeProductos(Set<Long> idsProductos) {
        return fichasStockEntidadRepository.findByIdItemIn(idsProductos).stream()
                .collect(Collectors.toMap(fichasStockEntidad::getIdItem, fichasStockEntidad::getNombreItem));
    }
}
