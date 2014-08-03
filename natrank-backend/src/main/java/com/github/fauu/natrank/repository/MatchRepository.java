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
import org.springframework.data.repository.Repository;

import java.util.List;

public interface MatchRepository extends Repository<Match, Integer> {

  List<Match> findAll() throws DataAccessException;

  List<Match> findByDateAndTeam1AndTeam2(LocalDate date, Team team1, Team team2)
      throws DataAccessException;

  Match save(Match match) throws DataAccessException;

  // Why doesn't this work?
  //List<Match> save(List<Match> matches) throws DataAccessException;

}
