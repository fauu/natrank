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
import com.github.fauu.natrank.repository.MatchTypeRepository;
import com.github.fauu.natrank.repository.TeamRepository;
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

  @Autowired
  private MatchTypeRepository matchTypeRepository;

  @Override
  public ProcessedMatchData processMatchData(String rawMatchData) {
    ProcessedMatchData matchData = new ProcessedMatchData();
    DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy");

    int lineNo = 1;
    BufferedReader reader = new BufferedReader(new StringReader(rawMatchData));
    try {
      String line;
      while ((line = reader.readLine()) != null) {
        String[] splitLine = line.split(";");
        int numFields = splitLine.length;

        if (numFields == 6) {
          for (int i = 0; i < numFields; i++) {
            if (splitLine[i] == null || splitLine[i].trim().length() == 0) {
              MatchDataError error =
                  new MatchDataError(lineNo, line, MatchDataErrorType.ERROR_MISSING_FIELD);

              matchData.getErrors().add(error);
            }
          }

          ParsedRawMatchDatum match = new ParsedRawMatchDatum();
          DateTime matchDate;
          try {
            matchDate = formatter.parseDateTime(splitLine[0]);
          } catch (IllegalArgumentException e) {
            MatchDataError error =
                new MatchDataError(lineNo, line, MatchDataErrorType.ERROR_INCORRECT_DATE_FORMAT);
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
          MatchDataError error =
              new MatchDataError(lineNo, line, MatchDataErrorType.ERROR_INCORRECT_LINE_FORMAT);

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
      List<String> existingCityNames = cityRepository.findAllNames();
      Set<String> processedNewCityNames = new HashSet<>();
      List<String> existingMatchTypesFifaNames = matchTypeRepository.findAllFifaNames();
      Set<String> processedNewMatchTypeFifaNames = new HashSet<>();

      for (ParsedRawMatchDatum parsedRawMatchDatum : matchData.getMatches()) {
        String matchTypeFifaName = parsedRawMatchDatum.getType();
        if (!processedNewMatchTypeFifaNames.contains(matchTypeFifaName) &&
            !existingMatchTypesFifaNames.contains(matchTypeFifaName)) {
          MatchType newType = new MatchType();
          newType.setFifaName(matchTypeFifaName);

          processedNewMatchTypeFifaNames.add(matchTypeFifaName);
          matchData.getTypes().add(newType);
        }

        List<String> countryNamesTemp = new LinkedList<>();
        countryNamesTemp.add(parsedRawMatchDatum.getTeam1());
        countryNamesTemp.add(parsedRawMatchDatum.getTeam2());
        for (String countryName : countryNamesTemp) {
          if (!processedNewCountryNames.contains(countryName) &&
              !existingCountryNames.contains(countryName)) {
            Country newCountry = new Country();
            newCountry.setName(countryName);
            newCountry.setFromDate(parsedRawMatchDatum.getDate());

            processedNewCountryNames.add(countryName);
            matchData.getCountries().add(newCountry);
          }
        }

        String cityName = parsedRawMatchDatum.getCity();
        if (!processedNewCityNames.contains(cityName) &&
            !existingCityNames.contains(cityName)) {
          City newCity = new City();
          newCity.setName(cityName);

          CityCountryAssoc cityCountryAssoc = new CityCountryAssoc();
          cityCountryAssoc.setCity(newCity);
          cityCountryAssoc.setFromDate(parsedRawMatchDatum.getDate());

          newCity.getCityCountryAssocs().add(cityCountryAssoc);

          processedNewCityNames.add(cityName);
          matchData.getCities().add(newCity);
          matchData.getCitiesInferredCountryNames().add(parsedRawMatchDatum.getTeam1());
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

  @Override
  public void addMatchTypes(List<MatchType> types) throws DataAccessException {
    for (MatchType type : types) {
      matchTypeRepository.save(type);
    }
  }

  @Override
  public List<Match> createMatches(ProcessedMatchData matchData) throws DataAccessException {
    List<Match> newMatches = new LinkedList<>();

    List<MatchType> types = matchTypeRepository.findAll();
    List<City> cities = cityRepository.findAll();
    List<Country> countries = countryRepository.findAll();

    for (ParsedRawMatchDatum intMatch : matchData.getMatches()) {
      // TODO: Discard matches already present in the database

      Match newMatch = new Match();

      newMatch.setDate(intMatch.getDate());

      for (MatchType type : types) {
        if (type.getFifaName().equals(intMatch.getType())) {
          newMatch.setType(type);
          break;
        }
      }

      for (City city : cities) {
        if (city.getName().equals(intMatch.getCity())) {
          newMatch.setCity(city);
          break;
        }
      }

      for (Country country : countries) {
        if (country.getName().equals(intMatch.getTeam1())) {
          newMatch.setTeam1(country.getTeam());
        } else if (country.getName().equals(intMatch.getTeam2())) {
          newMatch.setTeam2(country.getTeam());
        }

        if ((newMatch.getTeam1() != null) && (newMatch.getTeam2() != null)) {
          break;
        }
      }

      // TODO: Parse result, ...
    }

    return newMatches;
  }

}
