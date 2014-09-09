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

package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.CountryTeamMerge;
import com.github.fauu.natrank.model.CountryWithFlagEntryYears;
import com.github.fauu.natrank.model.entity.Country;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface CountryService {

  List<Country> findAll() throws DataAccessException;

  Country findById(Integer id) throws DataAccessException;

  void mergeTeams(CountryTeamMerge merge) throws DataAccessException;

  void addFlags(List<CountryWithFlagEntryYears> countriesWithFlagEntryYears)
      throws DataAccessException;

}
