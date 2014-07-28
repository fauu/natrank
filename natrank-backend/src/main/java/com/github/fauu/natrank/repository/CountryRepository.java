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

import com.github.fauu.natrank.model.Country;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface CountryRepository extends PagingAndSortingRepository<Country, Integer> {

  @Override
  List<Country> findAll() throws DataAccessException;

  @Override
  List<Country> findAll(Sort sort) throws DataAccessException;

  @Query("SELECT name FROM Country")
  List<String> findAllNames() throws DataAccessException;

  Country findById(Integer id) throws DataAccessException;

  Country findByName(String name) throws DataAccessException;

  @Override
  Country save(Country country) throws DataAccessException;

}
