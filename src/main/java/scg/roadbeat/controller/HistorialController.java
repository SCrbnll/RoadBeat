package scg.roadbeat.controller;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import scg.roadbeat.modelo.Historial;
import scg.roadbeat.modelo.Salas;
import scg.roadbeat.modelo.Usuarios;
import scg.roadbeat.service.HistorialService;

@RestController
@RequestMapping("/historial")
public class HistorialController {
	@Autowired
	HistorialService historialService;

	@GetMapping("")
	public List<Historial> list() {
		return historialService.listAllHistorial();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Historial> get(@PathVariable Integer id) {
		try {
			Historial fact = historialService.getHistorial(id);
			return new ResponseEntity<Historial>(fact, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Historial>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/historialSalas/{idSala}")
	public List<Historial> getHistoricoSalasIdSala(@PathVariable int idSala) {
		try {
			return historialService.historicoSalasIdSala(idSala);
		} catch (NoSuchElementException e) {
			return null;
		}
	}
	
	@GetMapping("/salasUsuario/{idUsuario}")
	public List<Historial> getHistoricoSalasIdUsuario(@PathVariable int idUsuario) {
		try {
			return historialService.historicoSalasIdUsuario(idUsuario);
		} catch (NoSuchElementException e) {
			return null;
		}
	}
	@GetMapping("existe/{idSala}/{idUsuario}")
	public ResponseEntity<Historial> comprobarExiste(@PathVariable Integer idSala, @PathVariable Integer idUsuario) {
		try {
			Historial hist = historialService.historicoExiste(idSala, idUsuario);
			return new ResponseEntity<Historial>(hist, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Historial>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping("")
	public ResponseEntity<Integer> add(@RequestBody Historial hist) {
		Historial historial = historialService.saveHistorial(hist);
		return new ResponseEntity<>(historial.getId(), HttpStatus.CREATED);
	}
	
}
