package Trabajo.Ingenieria.Entidades;

import jakarta.persistence.Embeddable;

@Embeddable
public class ProductInfo {
    private Integer cantidad;
    private Double precioTotal;

    // Constructor sin argumentos
    public ProductInfo() {}

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(Double precioTotal) {
        this.precioTotal = precioTotal;
    }
}
