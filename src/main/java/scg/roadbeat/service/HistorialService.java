package scg.roadbeat.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import scg.roadbeat.modelo.Historial;
import scg.roadbeat.modelo.Salas;
import scg.roadbeat.repository.HistorialRepository;

@Service
@Transactional
public class HistorialService {
	@Autowired
	private HistorialRepository historialRepository;	

	public HistorialService() {
	}

	public List<Historial> listAllHistorial() {
		return historialRepository.findAll();
	}
	public Historial getHistorial(Integer id) {
		return historialRepository.findById(id).get();
	}
	public List<Historial> historicoSalasIdUsuario(int id) {
		return historialRepository.historicoSalasIdUsuario(id);
	}
	public List<Historial> historicoSalasIdSala(int id) {
		return historialRepository.historicoSalasIdSala(id);
	}
	public Historial saveHistorial(Historial hist) {
		return historialRepository.save(hist);
	}
	public Historial historicoExiste(int salaId, int usuarioId) {
		return historialRepository.historicoExiste(salaId, usuarioId);
	}
}
