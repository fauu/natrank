/*
 * Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
 *
 * This software is licensed under the GNU General Public License
 * (version 3 or later). See the COPYING file in this distribution.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this software. If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Piotr Grabowski <fau999(at)gmail.com>
 */

package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamRating;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TeamRatingRepository extends PagingAndSortingRepository<TeamRating, Integer> {

  List<TeamRating> findByTeam(Team team, Sort sort) throws DataAccessException;

  @Query(nativeQuery = true, value =
         "SELECT tr1.* FROM TeamRating tr1 LEFT JOIN TeamRating tr2 " +
         "ON (tr1.team_id = tr2.team_id AND tr1.date < tr2.date) WHERE tr2.id IS NULL")
  List<TeamRating> findLatestForTeam() throws DataAccessException;

  // FIXME: This should take LocalDate instead of String
  // FIXME: Don't return duplicates when two ratings for the same date exist.
  //        Perhaps use TeamRating id and then just limit the date?
  @Query(nativeQuery = true, value =
         "SELECT tr1.* " +
         "FROM (SELECT * FROM TeamRating WHERE date <= ?1) tr1 " +
           "LEFT JOIN (SELECT * FROM TeamRating WHERE date <= ?1) tr2 " +
             "ON (tr1.team_id = tr2.team_id AND tr1.date < tr2.date) " +
         "WHERE tr2.id IS NULL")
  List<TeamRating> findLatestForTeamsByDate(String date) throws DataAccessException;

}
