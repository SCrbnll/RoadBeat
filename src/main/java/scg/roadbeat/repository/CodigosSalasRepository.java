package scg.roadbeat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import scg.roadbeat.modelo.CodigosSalas;

public interface CodigosSalasRepository extends JpaRepository<CodigosSalas, String>  {
    
    @Query("SELECT cd FROM CodigosSalas cd WHERE cd.codSala = :cod AND cd.cerrada = false")
    CodigosSalas codigoSalasIdSala(@Param("cod") String cod);
    
    @Query("SELECT cd FROM CodigosSalas cd WHERE cd.cerrada = false")
    List<CodigosSalas> codigoSalasAbiertas();
}