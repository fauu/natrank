/*
 * Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
 *
 * This software is licensed under the GNU General Public License
 * (version 3 or later). See the COPYING file in this distribution.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this software. If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Piotr Grabowski <fau999@gmail.com>
 */

package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.model.entity.Team;
import org.joda.time.LocalDate;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MatchRepository extends PagingAndSortingRepository<Match, Integer> {

  List<Match> findByDateAndTeam1AndTeam2(LocalDate date, Team team1, Team team2)
      throws DataAccessException;

  Page<Match> findByDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable)
      throws DataAccessException;

  Page<Match> findByTeam1OrTeam2(Team team1, Team team2, Pageable pageable)
      throws DataAccessException;

  @Query(nativeQuery = true, value =
         "SELECT * FROM `Match` m " +
           "WHERE (m.team1_id = ?1 OR m.team2_id = ?1) " +
             "AND m.date = (SELECT MIN(m.date) FROM `Match` m WHERE m.team1_id = ?1 OR m.team2_id = ?1) " +
         "LIMIT 1")
  Match findFirstByTeamId(Integer teamId) throws DataAccessException;

  @Query(nativeQuery = true, value =
         "SELECT * FROM `Match` m " +
         "WHERE " +
          "(m.team1_id = ?1 AND " +
            "(m.team1_goals - m.team2_goals = " +
              "(SELECT MAX(goalDiff) FROM " +
                "(SELECT MAX(m.team1_goals - m.team2_goals) goalDiff FROM `Match` m WHERE m.team1_id = ?1 UNION " +
                 "SELECT MAX(m.team2_goals - m.team1_goals) goalDiff FROM `Match` m WHERE m.team2_id = ?1) goalDiffs))) OR " +
          "(m.team2_id = ?1 AND " +
            "(m.team2_goals - m.team1_goals = " +
              "(SELECT MAX(goalDiff) FROM " +
                "(SELECT MAX(m.team1_goals - m.team2_goals) goalDiff FROM `Match` m WHERE m.team1_id = ?1 UNION " +
                 "SELECT MAX(m.team2_goals - m.team1_goals) goalDiff FROM `Match` m WHERE m.team2_id = ?1) goalDiffs)))")
  List<Match> findBiggestWinsByTeamId(Integer teamId) throws DataAccessException;

  @Query(nativeQuery = true, value =
      "SELECT * FROM `Match` m " +
          "WHERE " +
          "(m.team1_id = ?1 AND " +
            "(m.team1_goals - m.team2_goals = " +
              "(SELECT MIN(goalDiff) FROM " +
                "(SELECT MIN(m.team1_goals - m.team2_goals) goalDiff FROM `Match` m WHERE m.team1_id = ?1 UNION " +
                 "SELECT MIN(m.team2_goals - m.team1_goals) goalDiff FROM `Match` m WHERE m.team2_id = ?1) goalDiffs))) OR " +
          "(m.team2_id = ?1 AND " +
            "(m.team2_goals - m.team1_goals = " +
              "(SELECT MIN(goalDiff) FROM " +
                "(SELECT MIN(m.team1_goals - m.team2_goals) goalDiff FROM `Match` m WHERE m.team1_id = ?1 UNION " +
                 "SELECT MIN(m.team2_goals - m.team1_goals) goalDiff FROM `Match` m WHERE m.team2_id = ?1) goalDiffs)))")
  List<Match> findBiggestDefeatsByTeamId(Integer teamId) throws DataAccessException;

  @Query("FROM Match m " +
         "WHERE m IN (SELECT tr.match FROM TeamRating tr WHERE tr.team = ?1 AND tr.change = " +
           "(SELECT MAX(tr.change) FROM TeamRating tr WHERE tr.team = ?1))")
  List<Match> findBiggestUpsetsByTeam(Team team) throws DataAccessException;

  @Query("FROM Match m " +
         "WHERE m IN (SELECT tr.match FROM TeamRating tr WHERE tr.team = ?1 AND tr.change = " +
           "(SELECT MIN(tr.change) FROM TeamRating tr WHERE tr.team = ?1))")
  List<Match> findBiggestBlundersByTeam(Team team) throws DataAccessException;

}
