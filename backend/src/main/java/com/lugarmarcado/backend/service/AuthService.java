package com.lugarmarcado.backend.service;

import com.lugarmarcado.backend.dto.CadastroRequest;
import com.lugarmarcado.backend.dto.ClienteResponse;
import com.lugarmarcado.backend.dto.LoginRequest;
import com.lugarmarcado.backend.model.Cliente;
import com.lugarmarcado.backend.repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final ClienteRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(ClienteRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public ClienteResponse cadastrar(CadastroRequest request) {
        if (repository.existsByEmailIgnoreCase(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe uma conta com esse e-mail");
        }

        Cliente cliente = new Cliente();
        cliente.setNome(request.nome().trim());
        cliente.setEmail(request.email().trim().toLowerCase());
        cliente.setSenha(passwordEncoder.encode(request.senha()));
        cliente.setCriadoEm(LocalDateTime.now());

        return ClienteResponse.de(repository.save(cliente));
    }

    public ClienteResponse login(LoginRequest request) {
        Cliente cliente = repository.findByEmailIgnoreCase(request.email().trim())
                .filter(c -> passwordEncoder.matches(request.senha(), c.getSenha()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos"));

        return ClienteResponse.de(cliente);
    }
}
