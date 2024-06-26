package scg.roadbeat.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import scg.roadbeat.modelo.Salas;

public interface SalasRepository extends JpaRepository<Salas, Integer>  {
    
    @Query("SELECT s FROM Salas s WHERE s.usuarios.id = :usuarioId")
    List<Salas> salasAnfitrionIdUsuarios(@Param("usuarioId") Integer usuarioId);
    
    @Query("SELECT s FROM Salas s WHERE s.fecha < :fechaActual and s.usuarios.id = :usuarioId")
    List<Salas> salasFecha(@Param("fechaActual") Date fecha, @Param("usuarioId") Integer usuarioId);
}