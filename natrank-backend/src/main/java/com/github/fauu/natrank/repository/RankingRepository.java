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

import com.github.fauu.natrank.model.entity.Ranking;
import org.joda.time.LocalDate;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RankingRepository extends JpaRepository<Ranking, Integer> {

  @Query("FROM Ranking r WHERE r.date = (SELECT MAX(r.date) FROM Ranking r)")
  Ranking findLatest() throws DataAccessException;

  @Query("SELECT MAX(r.date) FROM Ranking r")
  LocalDate findDateOfLatest() throws DataAccessException;

  Ranking findByDate(LocalDate date) throws DataAccessException;

  @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
         "FROM Ranking r WHERE r.date = ?")
  boolean existsByDate(LocalDate date) throws DataAccessException;

}
