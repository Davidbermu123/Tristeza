package Trabajo.Ingenieria.Servicios;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import Trabajo.Ingenieria.Controladores.authRespuesta;
import Trabajo.Ingenieria.Controladores.inicioPeticion;
import Trabajo.Ingenieria.Controladores.registroPeticion;
import Trabajo.Ingenieria.Entidades.role;
import Trabajo.Ingenieria.Entidades.usuario;
import Trabajo.Ingenieria.Repositorios.usuarioRepositorio;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class authServicio {
    private final usuarioRepositorio userRepository;
    private final jwtServicio jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public authRespuesta login(inicioPeticion request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails usuario=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(usuario);
        return authRespuesta.builder()
            .token(token)
            .build();

    }

    public authRespuesta register(registroPeticion request) {
        usuario user = usuario.builder()
            .nombre(request.getNombre())
            .apellido(request.getApellido())
            .username(request.getUsername())
            .direccion(request.getDireccion())
            .telefono(request.getTelefono())
            .ciudad(request.getCiudad())
            .password(passwordEncoder.encode(request.getPassword()))
            .rol(role.USER)
            .build();

        userRepository.save(user);

        return authRespuesta.builder()
            .token(jwtService.getToken(user))
            .build();
        
    } 
}
