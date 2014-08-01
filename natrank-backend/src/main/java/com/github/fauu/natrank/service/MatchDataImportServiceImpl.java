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
import com.github.fauu.natrank.repository.*;
import org.joda.time.LocalDate;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class MatchDataImportServiceImpl implements MatchDataImportService {

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private CountryCodeRepository countryCodeRepository;

  @Autowired
  private CountryRepository countryRepository;

  @Autowired
  private MatchRepository matchRepository;

  @Autowired
  private MatchTypeRepository matchTypeRepository;

  @Autowired
  private TeamRepository teamRepository;

  @Override
  public ProcessedMatchData processMatchData(String rawMatchData) {
    ProcessedMatchData matchData = new ProcessedMatchData();
    DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern("dd/MM/yyyy");

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
          LocalDate matchDate;
          try {
            matchDate = dateTimeFormatter.parseLocalDate(splitLine[0]);
          } catch (IllegalArgumentException e) {
            MatchDataError error =
                new MatchDataError(lineNo, line, MatchDataErrorType.ERROR_INCORRECT_DATE_FORMAT);
            matchData.getErrors().add(error);
            e.printStackTrace();

            matchDate = null;
          }

          String matchType = splitLine[1];
          String matchCity = splitLine[2];
          String matchTeam1 = splitLine[3];
          String matchTeam2 = splitLine[4];
          String matchResult = splitLine[5];

          Country team1Country = countryRepository.findByName(matchTeam1);
          Country team2Country = countryRepository.findByName(matchTeam2);
          if ((team1Country != null) && (team2Country != null)) {
            List<Match> duplicates = matchRepository.findByDateAndTeam1AndTeam2(matchDate,
                team1Country.getTeam(), team2Country.getTeam());
            if (duplicates.size() > 0) {
              continue;
            }
          }

          match.setDate(matchDate);
          match.setType(matchType);
          match.setCity(matchCity);
          match.setTeam1(matchTeam1);
          match.setTeam2(matchTeam2);
          match.setResult(matchResult);

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

    if (matchData.getErrors().size() == 0) {
      List<String> existingCountryNames = countryRepository.findAllNames();
      Set<String> processedNewCountryNames = new HashSet<>();
      List<String> existingCityNames = cityRepository.findAllNames();
      Set<String> processedNewCityNames = new HashSet<>();
      List<String> existingMatchTypesFifaNames = matchTypeRepository.findAllFifaNames();
      Set<String> processedNewMatchTypeFifaNames = new HashSet<>();

      List<String> countryNamesTemp = new LinkedList<>();

      for (ParsedRawMatchDatum parsedRawMatchDatum : matchData.getMatches()) {
        String matchTypeFifaName = parsedRawMatchDatum.getType();
        if (!processedNewMatchTypeFifaNames.contains(matchTypeFifaName) &&
            !existingMatchTypesFifaNames.contains(matchTypeFifaName)) {
          MatchType newType = new MatchType();
          newType.setFifaName(matchTypeFifaName);

          processedNewMatchTypeFifaNames.add(matchTypeFifaName);
          matchData.getTypes().add(newType);
        }

        countryNamesTemp.add(parsedRawMatchDatum.getTeam1());
        countryNamesTemp.add(parsedRawMatchDatum.getTeam2());
        for (String countryName : countryNamesTemp) {
          if (!processedNewCountryNames.contains(countryName) &&
              !existingCountryNames.contains(countryName)) {
            Country newCountry = new Country();
            newCountry.setName(countryName);
            newCountry.setFromDate(parsedRawMatchDatum.getDate());
            List<CountryCode> matchingCountryCodes
                = countryCodeRepository.findByCountryName(newCountry.getName());
            String inferredCountryCode = "";
            if (matchingCountryCodes.size() > 0) {
              inferredCountryCode = matchingCountryCodes.get(0).getCode();
            }
            newCountry.setCode(inferredCountryCode);


            processedNewCountryNames.add(newCountry.getName());
            matchData.getCountries().add(newCountry);
          }
        }
        countryNamesTemp.clear();

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
        oldTeamCountry.setToDate(country.getFromDate().minusDays(1));
        countryRepository.save(oldTeamCountry);
      }

      Flag countryFlag = new Flag();
      countryFlag.setCountry(country);
      countryFlag.setCode(country.getCode() + "1");
      countryFlag.setFromDate(country.getFromDate());
      country.getFlags().add(countryFlag);

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

    StringBuilder resultExtraBuilder = new StringBuilder(50);

    for (ParsedRawMatchDatum intMatch : matchData.getMatches()) {
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

      String fullResult = intMatch.getResult();
      Pattern resultPattern = Pattern.compile(
          "(\\d+):(\\d+)(?:\\s(a\\.e\\.t\\.))?(?:\\s(\\(\\d+:\\d+(?:,\\s\\d+:\\d+)?\\)))?" +
          "(?:\\s(\\d+):(\\d+)\\sPSO)?");
      Matcher resultMatcher = resultPattern.matcher(fullResult);
      int team1Goals = 0;
      int team2Goals = 0;
      boolean extraTime = false;
      String resultsOnGameBreaks = null;
      int penTeam1Goals = 0;
      int penTeam2Goals = 0;
      if (resultMatcher.matches()) {
        if ((resultMatcher.group(1) != null) && (resultMatcher.group(2) != null)) {
          team1Goals = Integer.parseInt(resultMatcher.group(1));
          team2Goals = Integer.parseInt(resultMatcher.group(2));
        } else {
          // TODO: Should not happen, log this
        }
        extraTime = (resultMatcher.group(3) != null) ? true : false;
        resultsOnGameBreaks = resultMatcher.group(4);
        if ((resultMatcher.group(5) != null) && (resultMatcher.group(6) != null)) {
          penTeam1Goals = Integer.parseInt(resultMatcher.group(5));
          penTeam2Goals = Integer.parseInt(resultMatcher.group(6));
        }
      } else {
        // TODO: Should not happen, log this
        System.out.println("no match");
      }

      newMatch.setTeam1Goals(team1Goals);
      newMatch.setTeam2Goals(team2Goals);

      if (newMatch.getTeam1().isCityHomeForDate(newMatch.getCity(), newMatch.getDate())) {
        newMatch.setHomeTeam(newMatch.getTeam1());
      } else if(newMatch.getTeam2().isCityHomeForDate(newMatch.getCity(), newMatch.getDate())) {
        newMatch.setHomeTeam(newMatch.getTeam2());
      } else {
        // TODO: Should not happen, log this
      }

      resultExtraBuilder.delete(0, resultExtraBuilder.length());
      if (extraTime) {
        resultExtraBuilder.append("AET");
        resultExtraBuilder.append(' ');
      }
      if (resultsOnGameBreaks != null) {
        resultExtraBuilder.append(resultsOnGameBreaks);
        resultExtraBuilder.append(' ');
      }
      if (penTeam1Goals > 0 || penTeam2Goals > 0) {
        resultExtraBuilder.append(' ');
        resultExtraBuilder.append(penTeam1Goals);
        resultExtraBuilder.append(':');
        resultExtraBuilder.append(penTeam2Goals);
        resultExtraBuilder.append(" PEN");
        newMatch.setPenaltyShootout(true);
      } else {
        newMatch.setPenaltyShootout(false);
      }

      if (!newMatch.isPenaltyShootout()) {
        if (team1Goals > team2Goals) {
          newMatch.setWinnerTeam(newMatch.getTeam1());
        } else if (team1Goals < team2Goals) {
          newMatch.setWinnerTeam(newMatch.getTeam2());
        } else {
          newMatch.setWinnerTeam(null);
        }
      } else {
        if(penTeam1Goals > penTeam2Goals) {
          newMatch.setWinnerTeam(newMatch.getTeam1());
        } else {
          newMatch.setWinnerTeam(newMatch.getTeam2());
        }
      }

      newMatch.setResultExtra(resultExtraBuilder.toString());

      newMatches.add(newMatch);
    }

    return newMatches;
  }

  @Override
  public void addMatches(List<Match> matches) {
    for (Match match : matches) {
      matchRepository.save(match);
    }
  }

  @Override
  public String getWikiCountryFlagMarkup(List<Country> countries) throws DataAccessException {
    StringBuilder flagMarkupBuilder = new StringBuilder();

    for (Country country : countries) {
      flagMarkupBuilder.append("{{flagicon|");
      flagMarkupBuilder.append(country.getCode());
      flagMarkupBuilder.append("|size=150px}}");
      flagMarkupBuilder.append("{{flagicon|");
      flagMarkupBuilder.append(country.getCode());
      flagMarkupBuilder.append("|");
      flagMarkupBuilder.append(country.getFromDate().toString("yyyy"));
      flagMarkupBuilder.append("}}");
      flagMarkupBuilder.append(country.getCode());
      flagMarkupBuilder.append("1 ");
      flagMarkupBuilder.append("http://en.wikipedia.org/wiki/Template:Country_data_");
      flagMarkupBuilder.append(country.getName());
      flagMarkupBuilder.append('\n');
    }

    return flagMarkupBuilder.toString();
  }

}
