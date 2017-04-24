package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.Country;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

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

}
