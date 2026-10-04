package com.lugarmarcado.backend.service;

import com.lugarmarcado.backend.dto.ReservaRequest;
import com.lugarmarcado.backend.model.Reserva;
import com.lugarmarcado.backend.model.Restaurante;
import com.lugarmarcado.backend.model.StatusReserva;
import com.lugarmarcado.backend.repository.ReservaRepository;
import com.lugarmarcado.backend.repository.RestauranteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final RestauranteRepository restauranteRepository;

    public ReservaService(ReservaRepository reservaRepository, RestauranteRepository restauranteRepository) {
        this.reservaRepository = reservaRepository;
        this.restauranteRepository = restauranteRepository;
    }

    public Reserva criar(ReservaRequest request) {
        Restaurante restaurante = restauranteRepository.findById(request.restauranteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurante não encontrado"));

        Reserva reserva = new Reserva();
        reserva.setRestaurante(restaurante);
        reserva.setNomeCliente(request.nomeCliente());
        reserva.setEmailCliente(request.emailCliente());
        reserva.setDataHora(request.dataHora());
        reserva.setQuantidadePessoas(request.quantidadePessoas());
        reserva.setStatus(StatusReserva.CONFIRMADA);
        reserva.setCriadaEm(LocalDateTime.now());

        return reservaRepository.save(reserva);
    }

    public List<Reserva> listar(String email) {
        if (email != null) {
            return reservaRepository.findByEmailClienteIgnoreCaseOrderByDataHoraAsc(email);
        }
        return reservaRepository.findAll();
    }

    public Reserva buscarPorId(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada"));
    }

    public Reserva cancelar(Long id) {
        Reserva reserva = buscarPorId(id);

        if (reserva.getStatus() == StatusReserva.CANCELADA) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Reserva já está cancelada");
        }
        if (reserva.getDataHora().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível cancelar uma reserva que já passou");
        }

        reserva.setStatus(StatusReserva.CANCELADA);
        return reservaRepository.save(reserva);
    }
}