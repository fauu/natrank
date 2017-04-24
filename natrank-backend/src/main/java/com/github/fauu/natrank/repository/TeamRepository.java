package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.Team;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamRepository extends JpaRepository<Team, Integer> {

  Team findById(Integer id) throws DataAccessException;

  @Query("SELECT t FROM Country c LEFT JOIN c.team t WHERE c.name = ?1")
  Team findByName(String name) throws DataAccessException;

}
