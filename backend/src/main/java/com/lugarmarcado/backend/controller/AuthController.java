package com.lugarmarcado.backend.controller;

import com.lugarmarcado.backend.dto.CadastroRequest;
import com.lugarmarcado.backend.dto.ClienteResponse;
import com.lugarmarcado.backend.dto.LoginRequest;
import com.lugarmarcado.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteResponse cadastrar(@RequestBody @Valid CadastroRequest request) {
        return service.cadastrar(request);
    }

    @PostMapping("/login")
    public ClienteResponse login(@RequestBody @Valid LoginRequest request) {
        return service.login(request);
    }
}
 