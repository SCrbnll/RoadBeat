package scg.roadbeat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scg.roadbeat.modelo.Usuarios;

public interface UsuarioRepository extends JpaRepository<Usuarios, Integer> {
	
	@Query("SELECT u FROM Usuarios u WHERE u.email = :email AND u.closed = false")
	Usuarios findByEmail(@Param("email") String email);
	
    @Query("SELECT u FROM Usuarios u WHERE u.id = :usuarioId AND u.closed = false")
    Usuarios findById(@Param("usuarioId") int usuarioId);

}
