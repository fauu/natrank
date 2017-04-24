package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.CityWithNewCountry;
import com.github.fauu.natrank.model.CountryTeamMerge;
import com.github.fauu.natrank.model.CountryWithFlagEntryYears;
import com.github.fauu.natrank.model.entity.Country;
import com.github.fauu.natrank.model.entity.Period;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface CountryService {

  List<Country> findAll() throws DataAccessException;

  Country findById(Integer id) throws DataAccessException;

  void mergeTeams(CountryTeamMerge merge) throws DataAccessException;

  void addFlags(List<CountryWithFlagEntryYears> countriesWithFlagEntryYears)
      throws DataAccessException;

  void reassignCities(List<CityWithNewCountry> citiesWithNewCountries) throws DataAccessException;

  void rename(Country country, String newName, String newCode, Period period)
      throws DataAccessException;

}
