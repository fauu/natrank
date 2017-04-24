package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.CountryCode;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface CountryCodeRepository extends Repository<CountryCode, Integer> {

  List<CountryCode> findByCountryName(String countryName) throws DataAccessException;

}
