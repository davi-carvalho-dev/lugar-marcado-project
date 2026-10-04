package com.lugarmarcado.backend.controller;

import com.lugarmarcado.backend.dto.ReservaRequest;
import com.lugarmarcado.backend.model.Reserva;
import com.lugarmarcado.backend.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    private final ReservaService service;

    public ReservaController(ReservaService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva criar(@RequestBody @Valid ReservaRequest request) {
        return service.criar(request);
    }

    @GetMapping
    public List<Reserva> listar(@RequestParam(required = false) String email) {
        return service.listar(email);
    }

    @GetMapping("/{id}")
    public Reserva buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PatchMapping("/{id}/cancelar")
    public Reserva cancelar(@PathVariable Long id) {
        return service.cancelar(id);
    }
}