package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.TeamExtremeType;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface TeamExtremeTypeRepository extends Repository<TeamExtremeType, Integer> {

  List<TeamExtremeType> findAll() throws DataAccessException;

}
