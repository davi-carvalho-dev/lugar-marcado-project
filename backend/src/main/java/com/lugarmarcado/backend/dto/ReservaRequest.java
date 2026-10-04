package com.lugarmarcado.backend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record ReservaRequest(
        @NotNull(message = "Restaurante é obrigatório")
        Long restauranteId,

        @NotBlank(message = "Nome é obrigatório")
        String nomeCliente,

        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String emailCliente,

        @NotNull(message = "Data e hora são obrigatórias")
        @Future(message = "A reserva precisa ser para uma data futura")
        LocalDateTime dataHora,

        @NotNull(message = "Quantidade de pessoas é obrigatória")
        @Min(value = 1, message = "Mínimo de 1 pessoa")
        @Max(value = 20, message = "Máximo de 20 pessoas")
        Integer quantidadePessoas
) {}