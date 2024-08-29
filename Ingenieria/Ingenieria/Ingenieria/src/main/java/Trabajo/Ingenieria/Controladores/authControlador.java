package Trabajo.Ingenieria.Controladores;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Trabajo.Ingenieria.Servicios.authServicio;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class authControlador {
    private final authServicio AuthService;
    
    @PostMapping(value = "login")
    public ResponseEntity<authRespuesta> login(@RequestBody inicioPeticion request)
    {
        return ResponseEntity.ok(AuthService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<authRespuesta> register(@RequestBody registroPeticion request)
    {
        return ResponseEntity.ok(AuthService.register(request));
    }  
     
}
