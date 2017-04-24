package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.NotableMatch;
import com.github.fauu.natrank.model.entity.Team;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotableMatchRepository extends JpaRepository<NotableMatch, Integer> {

  List<NotableMatch> findByTeam(Team team) throws DataAccessException;

}
