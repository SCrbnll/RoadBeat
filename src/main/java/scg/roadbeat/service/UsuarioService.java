package scg.roadbeat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import scg.roadbeat.modelo.Usuarios;
import scg.roadbeat.repository.UsuarioRepository;

@Service
@Transactional
public class UsuarioService {
	@Autowired
	private UsuarioRepository usuarioRepository;	

	public UsuarioService() {
	}
	public List<Usuarios> listAllUsuarios() {
		return usuarioRepository.findAll();
	}
	public Usuarios getUsuario(Integer id) {
		return usuarioRepository.findById(id).get();
	}
	public Usuarios saveUsuario(Usuarios usr) {
		return usuarioRepository.save(usr);
	}
	public void deleteUsuario(Integer id) {
		usuarioRepository.deleteById(id);
	}
	public Usuarios getUsuarioByEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}

}
