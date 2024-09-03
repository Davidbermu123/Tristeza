package Trabajo.Ingenieria.Controladores;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Trabajo.Ingenieria.Entidades.ProductInfo;
import Trabajo.Ingenieria.Entidades.registroInventarioEntidad;
import Trabajo.Ingenieria.Entidades.tipoRegistro;
import Trabajo.Ingenieria.Servicios.registroInventarioServicio;

@RestController
@RequestMapping("/registroInventario")
public class registroInventarioControlador {

    @Autowired
    private registroInventarioServicio registroInventarioService;

    @PostMapping("/crearRegistro")
    public registroInventarioEntidad registrarInventario(@RequestBody Map<String, Object> requestBody) {
        // Obtener el nombre y tipo
        String nombre = (String) requestBody.get("nombre");
        String tipoStr = (String) requestBody.get("tipo");
        tipoRegistro tipo = tipoRegistro.valueOf(tipoStr);

        // Convertir productos de Map<String, Object> a Map<Long, ProductInfo>
        @SuppressWarnings("unchecked")
        Map<String, Map<String, Object>> productosMap = (Map<String, Map<String, Object>>) requestBody.get("productos");

        Map<Long, ProductInfo> productos = new HashMap<>();
        for (Map.Entry<String, Map<String, Object>> entry : productosMap.entrySet()) {
            Long key = Long.parseLong(entry.getKey());
            Map<String, Object> productInfoMap = (Map<String, Object>) entry.getValue();
            Integer cantidad = Integer.parseInt(productInfoMap.get("cantidad").toString());
            Double precioTotal = Double.parseDouble(productInfoMap.get("precioTotal").toString());

            ProductInfo productInfo = new ProductInfo();
            productInfo.setCantidad(cantidad);
            productInfo.setPrecioTotal(precioTotal);

            productos.put(key, productInfo);
        }

        return registroInventarioService.registrarInventario(nombre, productos, tipo);
    }

    @GetMapping("/obtenerRegistros")
    public List<registroInventarioEntidad> obtenerRegistros() {
        return registroInventarioService.obtenerTodosLosRegistros();
    }

    @GetMapping("/obtenerRegistro/{idRegistro}")
    public registroInventarioEntidad obtenerRegistroPorId(@PathVariable Long idRegistro) {
        return registroInventarioService.obtenerRegistroPorId(idRegistro);
    }

    @PostMapping("/obtenerNombresProductos")
    public Map<Long, String> obtenerNombresProductos(@RequestBody Set<Long> idsProductos) {
        return registroInventarioService.obtenerNombresDeProductos(idsProductos);
    }
}