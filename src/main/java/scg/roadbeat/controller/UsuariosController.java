package scg.roadbeat.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import scg.Utilidades;
import scg.roadbeat.modelo.Usuarios;
import scg.roadbeat.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuariosController {
	@Autowired
	UsuarioService usuarioService;

	@GetMapping("")
	public List<Usuarios> list() {
		return usuarioService.listAllUsuarios();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Usuarios> get(@PathVariable Integer id) {
		try {
			Usuarios usr = usuarioService.getUsuario(id);
			return new ResponseEntity<Usuarios>(usr, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Usuarios>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/login/{email}/{password}")
	public ResponseEntity<Usuarios> login (@PathVariable String email, @PathVariable String password) {
		try {
			Usuarios usr = usuarioService.getUsuarioByEmail(email);
			String pass = Utilidades.sha1(password);
			if(usr.getPassword().equals(pass)) {
				return new ResponseEntity<Usuarios>(usr, HttpStatus.OK);
			} else throw new NoSuchElementException();
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Usuarios>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping("")
	public ResponseEntity<Integer> add(@RequestBody Usuarios usr) {
		usr.setPassword(Utilidades.sha1(usr.getPassword()));
		Usuarios cliNuevo = usuarioService.saveUsuario(usr);
		return new ResponseEntity<>(cliNuevo.getId(), HttpStatus.CREATED);
	}
	
	@PutMapping("/changepass/{password}")
	public ResponseEntity<Usuarios> update (@RequestBody Usuarios usr, @PathVariable String password) {
		try {
			Usuarios actualCli = usuarioService.getUsuarioByEmail(usr.getEmail());
			if(actualCli.getPassword().equals(Utilidades.sha1(password))) {
				throw new NoSuchElementException();
			}
			String pass = Utilidades.sha1(password);
			actualCli.setPassword(pass);
			usuarioService.saveUsuario(actualCli);
			return new ResponseEntity<Usuarios>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Usuarios>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PutMapping("changeprofile")
	public ResponseEntity<Integer> update (@RequestBody Usuarios usr) {
		try {
			Usuarios actualCli = usuarioService.getUsuario(usr.getId());
			if(!actualCli.getPassword().equals(usr.getPassword())) {
			throw new NoSuchElementException();
			}
			actualCli.setNombre(usr.getNombre());
			actualCli.setEmail(usr.getEmail());
			actualCli.setUsername(usr.getUsername());
			actualCli.setPassword(usr.getPassword());
			actualCli.setCanciones(usr.getCanciones());
			actualCli.setClosed(usr.getClosed());
			actualCli.setFoto(usr.getFoto());
			usuarioService.saveUsuario(actualCli);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("incrementSongs/{id}")
	public ResponseEntity<Integer> update (@RequestBody Usuarios usr, @PathVariable Integer id) {
		try {
			Usuarios actualCli = usuarioService.getUsuario(id);
			if(!actualCli.getPassword().equals(usr.getPassword())) {
			throw new NoSuchElementException();
			}
			actualCli.setNombre(usr.getNombre());
			actualCli.setEmail(usr.getEmail());
			actualCli.setUsername(usr.getUsername());
			actualCli.setPassword(usr.getPassword());
			actualCli.setCanciones(usr.getCanciones());
			actualCli.setFoto(usr.getFoto());
			actualCli.setClosed(usr.getClosed());
			usuarioService.saveUsuario(actualCli);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		try {
			usuarioService.deleteUsuario(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

}
