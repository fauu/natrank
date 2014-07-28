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

import com.github.fauu.natrank.model.*;
import com.github.fauu.natrank.repository.CityRepository;
import com.github.fauu.natrank.repository.CountryRepository;
import com.github.fauu.natrank.repository.TeamRepository;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.hibernate.criterion.Order;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.*;

@Service
public class MatchDataImportServiceImpl implements MatchDataImportService {

  @Autowired
  private CountryRepository countryRepository;

  @Autowired
  private TeamRepository teamRepository;

  @Autowired
  private CityRepository cityRepository;

  @Override
  public ProcessedMatchData processMatchData(String rawMatchData) {
    ProcessedMatchData matchData = new ProcessedMatchData();
    BufferedReader reader = new BufferedReader(new StringReader(rawMatchData));
    String line;
    String[] splitLine;
    int numFields;
    ParsedMatch match;
    MatchDataError error;
    int lineNo = 1;
    DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy");
    DateTime matchDate;

    try {
      while ((line = reader.readLine()) != null) {
        splitLine = line.split(";");
        numFields = splitLine.length;

        if (numFields == 6) {
          for (int i = 0; i < numFields; i++) {
            if (splitLine[i] == null || splitLine[i].trim().length() == 0) {
              error = new MatchDataError(lineNo, line, MatchDataErrorType.ERROR_MISSING_FIELD);

              matchData.getErrors().add(error);
            }
          }

          match = new ParsedMatch();
          try {
            matchDate = formatter.parseDateTime(splitLine[0]);
          } catch (IllegalArgumentException e) {
            error = new MatchDataError(lineNo, line, MatchDataErrorType.ERROR_INCORRECT_DATE_FORMAT);
            matchData.getErrors().add(error);

            matchDate = null;
          }
          match.setDate(matchDate);
          match.setType(splitLine[1]);
          match.setCity(splitLine[2]);
          match.setTeam1(splitLine[3]);
          match.setTeam2(splitLine[4]);
          match.setResult(splitLine[5]);

          matchData.getMatches().add(match);
        } else {
          error = new MatchDataError(lineNo, line, MatchDataErrorType.ERROR_INCORRECT_LINE_FORMAT);

          matchData.getErrors().add(error);
        }

        lineNo++;
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        reader.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    // TODO: filter matches that are already present in the database

    if (matchData.getErrors().size() == 0) {
      List<String> existingCountryNames = countryRepository.findAllNames();
      Set<String> processedNewCountryNames = new HashSet<>();
      List<String> countryNamesTemp = new LinkedList<>();
      List<String> existingCityNames = cityRepository.findAllNames();
      Set<String> processedNewCityNames = new HashSet<>();

      for (ParsedMatch parsedMatch : matchData.getMatches()) {
        matchData.getTypes().add(parsedMatch.getType());

        countryNamesTemp.clear();
        countryNamesTemp.add(parsedMatch.getTeam1());
        countryNamesTemp.add(parsedMatch.getTeam2());
        for (String countryName : countryNamesTemp) {
          if (!processedNewCountryNames.contains(countryName) &&
              !existingCountryNames.contains(countryName)) {
            Country newCountry = new Country();
            newCountry.setName(countryName);
            newCountry.setFromDate(parsedMatch.getDate());

            processedNewCountryNames.add(countryName);
            matchData.getCountries().add(newCountry);
          }
        }

        String cityName = parsedMatch.getCity();
        if (!processedNewCityNames.contains(cityName) &&
            !existingCityNames.contains(cityName)) {
          City newCity = new City();
          newCity.setName(cityName);

          CityCountryAssoc cityCountryAssoc = new CityCountryAssoc();
          cityCountryAssoc.setCity(newCity);
          cityCountryAssoc.setFromDate(parsedMatch.getDate());

          newCity.getCityCountryAssocs().add(cityCountryAssoc);

          processedNewCityNames.add(cityName);
          matchData.getCities().add(newCity);
          matchData.getCitiesInferredCountryNames().add(parsedMatch.getTeam1());
        }

      }
    }

    return matchData;
  }

  @Override
  public List<Team> findAllTeams() throws DataAccessException {
    return teamRepository.findAll();
  }

  @Override
  public Team findTeamById(Integer id) throws DataAccessException {
    return teamRepository.findOne(id);
  }

  @Override
  public List<Country> findAllCountriesSorted() throws DataAccessException {
    return countryRepository.findAll(new Sort(Sort.Direction.ASC, "name"));
  }

  @Override
  public Country findCountryById(Integer id) throws DataAccessException {
    return countryRepository.findById(id);
  }

  @Override
  public void addCountries(List<Country> countries) throws DataAccessException {
    for (Country country : countries) {
      // TODO: Perhaps do this in a DB trigger/JPA event listener?
      String oldTeamName = country.getTeam().getCurrentName();

      if (oldTeamName != null) {
        Country oldTeamCountry = countryRepository.findByName(oldTeamName);
        oldTeamCountry.setToDate(country.getFromDate());
        countryRepository.save(oldTeamCountry);
      }

      countryRepository.save(country);
    }
  }

  @Override
  public void addCities(List<City> cities) throws DataAccessException {
    for (City city : cities) {
      cityRepository.save(city);
    }
  }

}
