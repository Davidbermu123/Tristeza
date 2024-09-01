package Trabajo.Ingenieria.Entidades;

import java.time.LocalDateTime;
import java.util.Map;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.JoinColumn;

@Entity
public class registroInventarioEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRegistroInventario;

    private String nombre;
    private LocalDateTime fechaEntrada;
    private tipoRegistro tipo;

    @ElementCollection
    @CollectionTable(name = "productos_registro", joinColumns = @JoinColumn(name = "id_registro"))
    @MapKeyColumn(name = "id_producto")
    private Map<Long, ProductInfo> productos;

    // Getters and Setters

    public Long getIdRegistroInventario() {
        return idRegistroInventario;
    }

    public void setIdRegistroInventario(Long idRegistroInventario) {
        this.idRegistroInventario = idRegistroInventario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDateTime getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(LocalDateTime fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public tipoRegistro getTipo() {
        return tipo;
    }

    public void setTipo(tipoRegistro tipo) {
        this.tipo = tipo;
    }

    public Map<Long, ProductInfo> getProductos() {
        return productos;
    }

    public void setProductos(Map<Long, ProductInfo> productos) {
        this.productos = productos;
    }
}