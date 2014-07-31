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

import com.github.fauu.natrank.model.Match;
import com.github.fauu.natrank.model.Team;
import com.github.fauu.natrank.model.report.MatchReport;
import org.joda.time.LocalDate;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface MatchRepository extends Repository<Match, Integer> {

  List<Match> findByDateAndTeam1AndTeam2(LocalDate date, Team team1, Team team2)
      throws DataAccessException;

  List<Match> findAll() throws DataAccessException;

  @Query("SELECT NEW com.github.fauu.natrank.model.report.MatchReport" +
         "(m.date, ty.name, ci.name, co.name, cof.code, " +
         "t1co.name, m.team1Goals, t1cof.code, t2co.name, m.team2Goals, t2cof.code, m.resultExtra, m.penaltyShootout, " +
         "CASE WHEN (m.homeTeam.id = t1.id) THEN t1co.name WHEN (m.homeTeam.id = t2.id) THEN t2co.name ELSE NULL END, " +
         "CASE WHEN (m.winnerTeam.id = t1.id) THEN t1co.name WHEN (m.winnerTeam.id = t2.id) THEN t2co.name ELSE NULL END) " +
         "FROM Match m " +
         "JOIN m.type ty " +
         "JOIN m.team1 t1 " +
         "JOIN t1.countries t1co " +
         "JOIN t1co.flags t1cof " +
         "JOIN m.team2 t2 " +
         "JOIN t2.countries t2co " +
         "JOIN t2co.flags t2cof " +
         "JOIN m.city ci " +
         "JOIN ci.cityCountryAssocs cc " +
         "JOIN cc.country co " +
         "JOIN co.flags cof " +
         "WHERE (m.date >= cc.fromDate) AND (cc.toDate IS NULL OR m.date < cc.toDate) " +
         "AND (m.date >= t1co.fromDate) AND (t1co.toDate IS NULL OR m.date < t1co.toDate) " +
         "AND (m.date >= t2co.fromDate) AND (t2co.toDate IS NULL OR m.date < t2co.toDate) " +
         "AND (m.date >= t1cof.fromDate) AND (t1cof.toDate IS NULL OR m.date < t1cof.toDate) " +
         "AND (m.date >= t2cof.fromDate) AND (t2cof.toDate IS NULL OR m.date < t2cof.toDate) " +
         "AND (m.date >= cof.fromDate) AND (cof.toDate IS NULL OR m.date < cof.toDate) " +
         "ORDER BY m.date")
  List<MatchReport> findAllMatchReports() throws DataAccessException;

  Match save(Match match) throws DataAccessException;

  // Why doesn't this work?
  //List<Match> save(List<Match> matches) throws DataAccessException;

}
