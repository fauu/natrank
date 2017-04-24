package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.ProcessedMatchData;
import com.github.fauu.natrank.model.entity.*;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface MatchDataImportService {

  ProcessedMatchData processMatchData(String rawMatchData);

  List<Country> findAllCountriesSortedByName() throws DataAccessException;

  List<Team> findAllTeams() throws DataAccessException;

  void addCountries(List<Country> countries) throws DataAccessException;

  void addCities(List<City> cities) throws DataAccessException;

  void addMatchTypes(List<MatchType> types) throws DataAccessException;

  List<Match> createMatches(ProcessedMatchData matchData) throws DataAccessException;

  void addMatches(List<Match> matches) throws DataAccessException;

}
