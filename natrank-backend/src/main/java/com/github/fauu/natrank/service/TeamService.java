package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamRank;
import com.github.fauu.natrank.model.entity.TeamRating;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface TeamService {

  Team findById(int id) throws DataAccessException;

  Team findByName(String name) throws DataAccessException;

  List<TeamRank> findRanksByName(String name) throws DataAccessException;

  List<TeamRating> findRatingsByName(String name) throws DataAccessException;

}
