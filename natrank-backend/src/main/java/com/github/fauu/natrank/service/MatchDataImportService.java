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

package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.City;
import com.github.fauu.natrank.model.Country;
import com.github.fauu.natrank.model.ProcessedMatchData;
import com.github.fauu.natrank.model.Team;
import org.springframework.dao.DataAccessException;

import javax.xml.crypto.Data;
import java.util.List;

public interface MatchDataImportService {

  ProcessedMatchData processMatchData(String rawMatchData);

  List<Country> findAllCountriesSorted() throws DataAccessException;

  Country findCountryById(Integer id) throws DataAccessException;

  void addCountries(List<Country> countries) throws DataAccessException;

  Team findTeamById(Integer id) throws DataAccessException;

  List<Team> findAllTeams() throws DataAccessException;

  void addCities(List<City> cities) throws DataAccessException;

}
