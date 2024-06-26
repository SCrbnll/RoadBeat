package scg.roadbeat.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import scg.roadbeat.modelo.CodigosSalas;
import scg.roadbeat.modelo.Historial;
import scg.roadbeat.repository.CodigosSalasRepository;

@Service
@Transactional
public class CodigosSalasService {
	@Autowired
	private CodigosSalasRepository codigosSalasRepository;	

	public CodigosSalasService() {
	}

	public List<CodigosSalas> listAllHistorial() {
		return codigosSalasRepository.findAll();
	}
	public List<CodigosSalas> codigoSalasAbiertas() {
		return codigosSalasRepository.codigoSalasAbiertas();
	}
	public CodigosSalas codigoSalasIdSala(String cod) {
		return codigosSalasRepository.codigoSalasIdSala(cod);
	}
	public CodigosSalas saveCodigoSalas(CodigosSalas codSala) {
		return codigosSalasRepository.save(codSala);
	}
}
