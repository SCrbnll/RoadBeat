package scg.roadbeat.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import scg.roadbeat.modelo.Salas;
import scg.roadbeat.modelo.Usuarios;
import scg.roadbeat.repository.SalasRepository;

@Service
@Transactional
public class SalasService {
	@Autowired
	private SalasRepository salasRepository;	

	public SalasService() {
	}

	public List<Salas> listAllSalas() {
		return salasRepository.findAll();
	}
	public Salas getSala(Integer id) {
		return salasRepository.findById(id).get();
	}
	public List<Salas> salasAnfitrionIdUsuarios(int id) {
		return salasRepository.salasAnfitrionIdUsuarios(id);
	}
	public List<Salas> salasFecha(Date fecha, int id) {
		return salasRepository.salasFecha(fecha, id);
	}
	public Salas saveSala(Salas sala) {
		return salasRepository.save(sala);
	}


}
