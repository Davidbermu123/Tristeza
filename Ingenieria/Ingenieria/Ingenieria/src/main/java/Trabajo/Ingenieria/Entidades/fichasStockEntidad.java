package Trabajo.Ingenieria.Entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class fichasStockEntidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idItem;

    private String nombreItem;
    private String imagenItem;
    private Integer stockItem;
    private Float precioItem;
    private String descripcionItem;
    
    public Long getIdItem() {
        return idItem;
    }
    public void setIdItem(Long idItem) {
        this.idItem = idItem;
    }
    public String getNombreItem(){
        return nombreItem;
    }
    public void setNombreItem(String nombreItem){
        this.nombreItem = nombreItem;
    }
    public String getImagenItem() {
        return imagenItem;
    }
    public void setImagenItem(String imagenItem) {
        this.imagenItem = imagenItem;
    }
    public Integer getStockItem() {
        return stockItem;
    }
    public void setStockItem(Integer stockItem) {
        this.stockItem = stockItem;
    }
    public Float getPrecioItem() {
        return precioItem;
    }
    public void setPrecioItem(Float precioItem) {
        this.precioItem = precioItem;
    }
    public String getDescripcionItem() {
        return descripcionItem;
    }
    public void setDescripcionItem(String descripcionItem) {
        this.descripcionItem = descripcionItem;
    }
    
}