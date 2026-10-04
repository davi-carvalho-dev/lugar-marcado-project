package com.lugarmarcado.backend.config;

import com.lugarmarcado.backend.model.Restaurante;
import com.lugarmarcado.backend.repository.RestauranteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DadosIniciais implements CommandLineRunner {

    private final RestauranteRepository repository;

    public DadosIniciais(RestauranteRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        repository.saveAll(List.of(
                new Restaurante("Casa Brasa", "Cortes na parrilla, carta de vinhos sul-americanos e ambiente à luz de velas.",
                        "Carnes", "Centro", "Rio de Janeiro", 3, 4.7, "/image/casa-brasa.jpg"),
                new Restaurante("Trattoria Lume", "Massas frescas feitas na casa e receitas clássicas do norte da Itália.",
                        "Italiana", "Botafogo", "Rio de Janeiro", 2, 4.5, "/image/trattoria-lume.jpg"),
                new Restaurante("Maré Alta", "Frutos do mar do dia, moquecas e drinks autorais com vista para a baía.",
                        "Frutos do mar", "Urca", "Rio de Janeiro", 3, 4.8, "/image/mare-alta.jpg")
        ));
    }
}