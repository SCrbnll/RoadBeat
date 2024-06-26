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

import scg.Utilidades;
import scg.roadbeat.modelo.Salas;
import scg.roadbeat.modelo.Usuarios;
import scg.roadbeat.service.SalasService;

@RestController
@RequestMapping("/salas")
public class SalasController {
	@Autowired
	SalasService salasService;

	@GetMapping("")
	public List<Salas> list() {
		return salasService.listAllSalas();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Salas> get(@PathVariable Integer id) {
		try {
			Salas fact = salasService.getSala(id);
			return new ResponseEntity<Salas>(fact, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Salas>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/salasUsuario/{idUsuario}")
	public List<Salas> getSalasPorIdAnfitrion(@PathVariable int idUsuario) {
		try {
			return salasService.salasAnfitrionIdUsuarios(idUsuario);
		} catch (NoSuchElementException e) {
			return null;
		}
	}
	
	@GetMapping("/salasUsuario/{idUsuario}/{fecha}")
	public List<Salas> getSalasPorFechaIdAnfitrion(@PathVariable Date fecha, @PathVariable int idUsuario) {
		try {
			return salasService.salasFecha(fecha, idUsuario);
		} catch (NoSuchElementException e) {
			return null;
		}
	}
	
	@PostMapping("")
	public ResponseEntity<Integer> add(@RequestBody Salas sala) {
		Salas salaNueva = salasService.saveSala(sala);
		return new ResponseEntity<>(salaNueva.getId(), HttpStatus.CREATED);
	}
	
	@PutMapping("addplaylist")
	public ResponseEntity<Integer> update (@RequestBody Salas sala) {
		try {
			Salas actualSala = salasService.getSala(sala.getId());
			if(!actualSala.getId().equals(sala.getId())) {
			throw new NoSuchElementException();
			}
			actualSala.setLinkPlaylist(sala.getLinkPlaylist());
			salasService.saveSala(actualSala);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
