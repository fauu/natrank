package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.MatchType;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchTypeRepository extends JpaRepository<MatchType, Integer> {

  @Query("SELECT fifaName FROM MatchType")
  List<String> findAllFifaNames() throws DataAccessException;

}
