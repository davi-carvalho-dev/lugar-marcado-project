package com.lugarmarcado.backend.repository;

import com.lugarmarcado.backend.model.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {
    List<Restaurante> findByBairroIgnoreCase(String bairro);
}