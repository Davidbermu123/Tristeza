package Trabajo.Ingenieria.Entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EntidadAnalisis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idItem;

    private Integer Ventas;
    private Integer Compras;


    public Long getIdItem() {
        return idItem;
    }
    public void setIdItem(Long idItem) {
        this.idItem = idItem;
    }
    public Integer getVentas() {
        return Ventas;
    }
    public void setVentas(Integer ventas) {
        Ventas = ventas;
    }
    public Integer getCompras() {
        return Compras;
    }
    public void setCompras(Integer compras) {
        Compras = compras;
    }
    
}