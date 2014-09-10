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

import com.github.fauu.natrank.model.CityWithNewCountry;
import com.github.fauu.natrank.model.CountryTeamMerge;
import com.github.fauu.natrank.model.CountryWithFlagEntryYears;
import com.github.fauu.natrank.model.entity.*;
import com.github.fauu.natrank.repository.*;
import com.google.common.base.Strings;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

  @Autowired
  public CityCountryAssocRepository cityCountryAssocRepository;

  @Autowired
  public CityRepository cityRepository;

  @Autowired
  public CountryRepository countryRepository;

  @Autowired
  public FlagRepository flagRepository;

  @Autowired
  public MatchRepository matchRepository;

  @Autowired
  public TeamRepository teamRepository;

  public List<Country> findAll() throws DataAccessException {
    return countryRepository.findAll();
  }

  @Override
  public Country findById(Integer id) throws DataAccessException {
    return countryRepository.findById(id);
  }

  @Override
  @Transactional
  public void mergeTeams(CountryTeamMerge merge) throws DataAccessException {
    Team subjectOldTeam = merge.getSubject().getTeam();

    teamRepository.delete(subjectOldTeam);

    merge.getSubject().setTeam(merge.getTarget().getTeam());

    List<Match> subjectMatches = matchRepository.findByTeam1OrTeam2(subjectOldTeam, subjectOldTeam);

    for (Match match : subjectMatches) {
      if (match.getTeam1() == subjectOldTeam) {
        match.setTeam1(merge.getSubject().getTeam());
      } else if (match.getTeam2() == subjectOldTeam) {
        match.setTeam2(merge.getSubject().getTeam());
      }
    }

    merge.getTarget().getPeriod().setToDate(merge.getSubject().getPeriod().getFromDate().minusDays(1));

    teamRepository.save(merge.getTarget().getTeam());
    countryRepository.save(merge.getTarget());
    countryRepository.save(merge.getSubject());
  }

  @Override
  @Transactional
  public void addFlags(List<CountryWithFlagEntryYears> countriesWithFlagEntryYears)
      throws DataAccessException {
    for (CountryWithFlagEntryYears countryWithFlagEntryYears : countriesWithFlagEntryYears) {
      if (Strings.isNullOrEmpty(countryWithFlagEntryYears.getFlagEntryYears())) {
        continue;
      }

      Country country = countryWithFlagEntryYears.getCountry();
      String[] entryYears = countryWithFlagEntryYears.getFlagEntryYears().split(";");

      for (String entryYearStr : entryYears) {
        int entryYear = Integer.parseInt(entryYearStr);

        Flag newFlag = new Flag();
        newFlag.setCode(country.getCode() + entryYearStr);
        newFlag.setCountry(country);
        Period flagPeriod = new Period();
        flagPeriod.setFromDate(new LocalDate(entryYear, 1, 1));
        newFlag.setPeriod(flagPeriod);

        Flag latestFlag = country.getCurrentFlag();
        latestFlag.getPeriod().setToDate(flagPeriod.getFromDate().minusDays(1));

        country.getFlags().add(newFlag);
      }

      countryRepository.save(country);
    }
  }

  @Override
  @Transactional
  public void reassignCities(List<CityWithNewCountry> citiesWithNewCountries)
      throws DataAccessException {
    for (CityWithNewCountry cityWithNewCountry : citiesWithNewCountries) {
      Country country = cityWithNewCountry.getNewCountry();

      if(country == null) {
        continue;
      }

      City city = cityWithNewCountry.getCity();

      CityCountryAssoc lastCityCountryAssoc = city.getLastCityCountryAssoc();
      lastCityCountryAssoc.getPeriod().setToDate(country.getPeriod().getFromDate().minusDays(1));
      if (lastCityCountryAssoc.getPeriod().getFromDate()
              .isAfter(lastCityCountryAssoc.getPeriod().getToDate())) {
        city.getCityCountryAssocs().remove(lastCityCountryAssoc);
        cityCountryAssocRepository.delete(lastCityCountryAssoc);
      }

      lastCityCountryAssoc = city.getLastCityCountryAssoc();
      lastCityCountryAssoc.getPeriod().setToDate(country.getPeriod().getFromDate().minusDays(1));

      CityCountryAssoc newCityCountryAssoc = new CityCountryAssoc();
      newCityCountryAssoc.setCity(city);
      newCityCountryAssoc.setCountry(country);
      Period period = new Period();
      period.setFromDate(country.getPeriod().getFromDate());
      period.setToDate(country.getPeriod().getToDate());
      newCityCountryAssoc.setPeriod(period);
      city.getCityCountryAssocs().add(newCityCountryAssoc);

      // List<Match> matches = city.getMatches() throws org.hibernate.LazyInitializationException :(
      List<Match> matches = matchRepository.findByCity(city);
      for (Match match : matches) {
        if (newCityCountryAssoc.getPeriod().includesDate(match.getDate())
            && (match.getTeam1() == country.getTeam() || match.getTeam2() == country.getTeam())) {
            match.setHomeTeam(country.getTeam());
        }
      }

      cityRepository.save(city);
    }
  }
}
