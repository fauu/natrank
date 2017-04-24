package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.DynamicRanking;
import com.github.fauu.natrank.model.entity.Ranking;
import com.github.fauu.natrank.model.entity.Team;
import java.time.LocalDate;
import org.springframework.dao.DataAccessException;

public interface RankingService {

  Ranking findLatest() throws DataAccessException;

  Ranking findByDate(LocalDate date) throws DataAccessException;

  DynamicRanking findExcerptFromLatestByTeam(Team team) throws DataAccessException;

  void createRankings() throws DataAccessException;

  DynamicRanking createDynamicForDate(LocalDate date) throws DataAccessException;

}
