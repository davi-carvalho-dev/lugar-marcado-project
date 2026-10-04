package com.lugarmarcado.backend.controller;

import com.lugarmarcado.backend.model.Restaurante;
import com.lugarmarcado.backend.repository.RestauranteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/restaurantes")
@CrossOrigin(origins = "http://localhost:5173")
public class RestauranteController {

    private final RestauranteRepository repository;

    public RestauranteController(RestauranteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Restaurante> listar(@RequestParam(required = false) String bairro) {
        if (bairro != null) {
            return repository.findByBairroIgnoreCase(bairro);
        }
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}