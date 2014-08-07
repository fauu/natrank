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

import com.github.fauu.natrank.model.entity.TeamRating;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRatingRepository extends JpaRepository<TeamRating, Integer> {

  @Query(nativeQuery = true, value =
         "SELECT tr1.* FROM TeamRating tr1 LEFT JOIN TeamRating tr2 " +
         "ON (tr1.team_id = tr2.team_id AND tr1.date < tr2.date) WHERE tr2.id IS NULL")
  List<TeamRating> findLatestForTeam() throws DataAccessException;

  // FIXME: This should take LocalDate instead of String
  @Query(nativeQuery = true, value =
         "SELECT tr1.* " +
         "FROM (SELECT * FROM TeamRating WHERE date <= ?1) tr1 " +
           "LEFT JOIN (SELECT * FROM TeamRating WHERE date <= ?1) tr2 " +
             "ON (tr1.team_id = tr2.team_id AND tr1.date < tr2.date) " +
         "WHERE tr2.id IS NULL")
  List<TeamRating> findLatestForTeamByDate(String date) throws DataAccessException;

}
