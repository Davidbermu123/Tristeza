package Trabajo.Ingenieria.Controladores;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class registroPeticion {
   
    String nombre;
    String apellido;
    String username;
    String direccion;
    String telefono;
    String ciudad;
    String password;
    
}
