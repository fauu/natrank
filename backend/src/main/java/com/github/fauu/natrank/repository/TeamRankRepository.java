package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamExtreme;
import com.github.fauu.natrank.model.entity.TeamRank;
import java.time.LocalDate;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TeamRankRepository extends PagingAndSortingRepository<TeamRank, Integer> {

  List<TeamRank> findByTeam(Team team, Sort sort) throws DataAccessException;

  // FIXME: This should take LocalDate instead of String
  // FIXME: Don't return duplicates when two ranks for the same date exist
  @Query(nativeQuery = true, value =
      "SELECT tr1.* " +
      "FROM (SELECT * FROM team_rank WHERE date <= ?1) tr1 " +
          "LEFT JOIN (SELECT * FROM team_rank WHERE date <= ?1) tr2 " +
              "ON (tr1.team_id = tr2.team_id AND tr1.date < tr2.date) " +
      "WHERE tr2.id IS NULL")
  List<TeamRank> findLatestForTeamsByDate(String date) throws DataAccessException;

  @Query("SELECT NEW com.github.fauu.natrank.model.entity.TeamExtreme(1, team, MIN(tr.value)) " +
         "FROM TeamRank tr " +
         "GROUP BY tr.team")
  List<TeamExtreme> findHighestValuesForTeams() throws DataAccessException;

  @Query("SELECT tr.date " +
         "FROM TeamRank tr " +
         "WHERE tr.team = ?1 AND (tr.value = ?2 OR (tr.value + tr.change = ?2))")
  List<LocalDate> findHighestValuePeriodDates(Team team, int highestValue) throws DataAccessException;

  @Query("SELECT NEW com.github.fauu.natrank.model.entity.TeamExtreme(2, team, MAX(tr.value)) " +
         "FROM TeamRank tr " +
         "GROUP BY tr.team")
  List<TeamExtreme> findLowestValuesForTeams() throws DataAccessException;

  @Query("SELECT tr.date " +
         "FROM TeamRank tr " +
         "WHERE tr.team = ?1 AND (tr.value = ?2 OR (tr.value + tr.change = ?2))")
  List<LocalDate> findLowestValuePeriodDates(Team team, int lowestValue) throws DataAccessException;

}
