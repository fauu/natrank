package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.model.entity.NotableMatchCategory;
import java.time.LocalDate;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface MatchService {

  Page<Match> findAll(Pageable pageable) throws DataAccessException;

  Page<Match> findByYear(int year, Pageable pageable) throws DataAccessException;

  Page<Match> findByTeamName(String name, Pageable pageable) throws DataAccessException;

  Map<NotableMatchCategory, List<Match>> findNotableMatchesByTeamName(String name) throws DataAccessException;

  List<NotableMatchCategory> findNotableMatchCategories() throws DataAccessException;

  List<Integer> getTeamFormByName(String name) throws DataAccessException;

  void generateNotableMatches() throws DataAccessException;

  LocalDate findLatestDate() throws DataAccessException;

}
