package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.NotableMatchCategory;
import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface NotableMatchCategoryRepository extends Repository<NotableMatchCategory, Integer> {

  List<NotableMatchCategory> findAll() throws DataAccessException;

}
