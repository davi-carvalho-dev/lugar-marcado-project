package com.lugarmarcado.backend.repository;

import com.lugarmarcado.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByEmailClienteIgnoreCaseOrderByDataHoraAsc(String emailCliente);
}