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
import scg.roadbeat.modelo.CodigosSalas;
import scg.roadbeat.modelo.Salas;
import scg.roadbeat.modelo.Usuarios;
import scg.roadbeat.service.CodigosSalasService;

@RestController
@RequestMapping("/codigosSalas")
public class CodigosSalasController {
	@Autowired
	CodigosSalasService codigosSalasService;

	@GetMapping("")
	public List<CodigosSalas> list() {
		return codigosSalasService.listAllHistorial();
	}
	
	@GetMapping("/codigo/{cod}")
	public CodigosSalas getCodigoSalasIdSala(@PathVariable String cod) {
		try {
			return codigosSalasService.codigoSalasIdSala(cod);
		} catch (NoSuchElementException e) {
			return null;
		}
	}
	@GetMapping("/salas")
	public List<CodigosSalas> getCodigosSalasAbiertas() {
		try {
			return codigosSalasService.codigoSalasAbiertas();
		} catch (NoSuchElementException e) {
			return null;
		}
	}
	
	@PostMapping("")
	public ResponseEntity<String> add(@RequestBody CodigosSalas codSala) {
		CodigosSalas codSalaNueva = codigosSalasService.saveCodigoSalas(codSala);
		return new ResponseEntity<>(codSalaNueva.getCodSala(), HttpStatus.CREATED);
	}
	
	@PutMapping("cerrada")
	public ResponseEntity<CodigosSalas> update (@RequestBody CodigosSalas csala) {
		try {
			csala.setCerrada(true);
			codigosSalasService.saveCodigoSalas(csala);
			return new ResponseEntity<CodigosSalas>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<CodigosSalas>(HttpStatus.NOT_FOUND);
		}
	}
	
}
