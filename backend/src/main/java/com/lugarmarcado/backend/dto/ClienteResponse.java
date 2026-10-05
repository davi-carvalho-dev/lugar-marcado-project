package com.lugarmarcado.backend.dto;

import com.lugarmarcado.backend.model.Cliente;

// O que a API devolve sobre o cliente: nunca inclui a senha
public record ClienteResponse(Long id, String nome, String email) {

    public static ClienteResponse de(Cliente cliente) {
        return new ClienteResponse(cliente.getId(), cliente.getNome(), cliente.getEmail());
    }
}