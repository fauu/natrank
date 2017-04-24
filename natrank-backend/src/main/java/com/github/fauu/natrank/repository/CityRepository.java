/*
 * Copyright (C) 2014-2016 natrank Developers (http://github.com/fauu/natrank)
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

import com.github.fauu.natrank.model.entity.City;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Integer> {

  List<City> findAll() throws DataAccessException;

//  @Query("SELECT DISTINCT(ci) " +
//         "FROM City ci " +
//         "WHERE ?1 > (SELECT p FROM ci.p WHERE )")
//  List<City> findOrphansForDate(LocalDate date) throws DataAccessException;

  @Query("SELECT name FROM City")
  List<String> findAllNames() throws DataAccessException;

  City findById(Integer id) throws DataAccessException;

}
