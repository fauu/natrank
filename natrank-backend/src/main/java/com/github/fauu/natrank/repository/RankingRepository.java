package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.Ranking;
import java.time.LocalDate;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RankingRepository extends JpaRepository<Ranking, Integer> {

  @Query("FROM Ranking r WHERE r.date = (SELECT MAX(r.date) FROM Ranking r)")
  Ranking findLatest() throws DataAccessException;

  @Query("SELECT MAX(date) FROM Ranking")
  LocalDate findDateOfLatest() throws DataAccessException;

  Ranking findByDate(LocalDate date) throws DataAccessException;

  @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
         "FROM Ranking r " +
         "WHERE r.date = ?1")
  boolean existsByDate(LocalDate date) throws DataAccessException;

}
