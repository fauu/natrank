package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamExtreme;
import com.github.fauu.natrank.model.entity.TeamRating;
import java.time.LocalDate;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TeamRatingRepository extends PagingAndSortingRepository<TeamRating, Integer> {

  List<TeamRating> findByTeamAndProvisionalFalse(Team team, Sort sort) throws DataAccessException;

  @Query(nativeQuery = true, value =
         "SELECT tr1.* FROM team_rating tr1 LEFT JOIN team_rating tr2 " +
         "ON (tr1.team_id = tr2.team_id AND tr1.date < tr2.date) WHERE tr2.id IS NULL")
  List<TeamRating> findLatestForTeam() throws DataAccessException;

  // FIXME: This should take LocalDate instead of String
  // FIXME: Don't return duplicates when two ratings for the same date exist.
  //        Perhaps use TeamRating id and then just limit the date?
  @Query(nativeQuery = true, value =
         "SELECT tr1.* " +
         "FROM (SELECT * FROM team_rating WHERE date <= ?1) tr1 " +
           "LEFT JOIN (SELECT * FROM team_rating WHERE date <= ?1) tr2 " +
             "ON (tr1.team_id = tr2.team_id AND tr1.date < tr2.date) " +
         "WHERE tr2.id IS NULL")
  List<TeamRating> findLatestForTeamsByDate(String date) throws DataAccessException;

  @Query("SELECT NEW com.github.fauu.natrank.model.entity.TeamExtreme(3, team, MAX(tr.value))" +
         "FROM TeamRating tr " +
         "WHERE tr.provisional IS FALSE " +
         "GROUP BY tr.team")
  List<TeamExtreme> findHighestValuesForTeams() throws DataAccessException;

  @Query("SELECT tr.date " +
         "FROM TeamRating tr " +
         "WHERE tr.team = ?1 " +
               "AND tr.provisional IS FALSE " +
               "AND (tr.value = ?2 " +
                    "OR (tr.change != 0 AND tr.value - tr.change = ?2))")
  List<LocalDate> findHighestValuePeriodDates(Team team, int highestValue) throws DataAccessException;

  @Query("SELECT NEW com.github.fauu.natrank.model.entity.TeamExtreme(4, team, MIN(tr.value))" +
         "FROM TeamRating tr " +
         "WHERE tr.provisional IS FALSE " +
         "GROUP BY tr.team")
  List<TeamExtreme> findLowestValuesForTeams() throws DataAccessException;

  @Query("SELECT tr.date " +
         "FROM TeamRating tr " +
         "WHERE tr.team = ?1 " +
               "AND tr.provisional IS FALSE " +
               "AND (tr.value = ?2 " +
                    "OR (tr.change != 0 AND tr.value - tr.change = ?2))")
  List<LocalDate> findLowestValuePeriodDates(Team team, int lowestValue) throws DataAccessException;

}
