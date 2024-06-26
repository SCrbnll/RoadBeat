package scg.roadbeat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import scg.roadbeat.modelo.Historial;

public interface HistorialRepository extends JpaRepository<Historial, Integer>  {
    
    @Query("SELECT h FROM Historial h INNER JOIN CodigosSalas cd ON h.salas.id = cd.salas.id WHERE h.usuarios.id = :usuarioId AND cd.cerrada = true")
    List<Historial> historicoSalasIdUsuario(@Param("usuarioId") int usuarioId);
    
    @Query("SELECT h FROM Historial h WHERE h.salas.id = :salaId")
    List<Historial> historicoSalasIdSala(@Param("salaId") int salaId);
    
    @Query("SELECT h FROM Historial h WHERE h.salas.id = :salaId AND h.usuarios.id = :usuarioId")
    Historial historicoExiste(@Param("salaId")int salaId, @Param("usuarioId")int usuarioId);
}