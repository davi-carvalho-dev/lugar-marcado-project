package com.lugarmarcado.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurante")
public class Restaurante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(length = 500)
    private String descricao;

    private String culinaria;
    private String bairro;
    private String cidade;
    private Integer faixaPreco;
    private Double avaliacao;
    private String imagemUrl;

    public Restaurante() {}

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public Double getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(Double avaliacao) {
        this.avaliacao = avaliacao;
    }

    public Integer getFaixaPreco() {
        return faixaPreco;
    }

    public void setFaixaPreco(Integer faixaPreco) {
        this.faixaPreco = faixaPreco;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCulinaria() {
        return culinaria;
    }

    public void setCulinaria(String culinaria) {
        this.culinaria = culinaria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Restaurante(String nome, String descricao, String culinaria, String bairro,
                       String cidade, Integer faixaPreco, Double avaliacao, String imagemUrl) {
        this.nome = nome;
        this.descricao = descricao;
        this.culinaria = culinaria;
        this.bairro = bairro;
        this.cidade = cidade;
        this.faixaPreco = faixaPreco;
        this.avaliacao = avaliacao;
        this.imagemUrl = imagemUrl;
    }
}