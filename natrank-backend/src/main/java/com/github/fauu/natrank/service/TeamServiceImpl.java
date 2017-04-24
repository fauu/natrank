package com.github.fauu.natrank.service;

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamRank;
import com.github.fauu.natrank.model.entity.TeamRating;
import com.github.fauu.natrank.repository.TeamRankRepository;
import com.github.fauu.natrank.repository.TeamRatingRepository;
import com.github.fauu.natrank.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

  @Autowired
  TeamRankRepository teamRankRepository;

  @Autowired
  TeamRatingRepository teamRatingRepository;

  @Autowired
  TeamRepository teamRepository;

  @Override
  public Team findById(int id) throws DataAccessException {
    return teamRepository.findById(id);
  }

  @Override
  public Team findByName(String name) throws DataAccessException {
    return teamRepository.findByName(name);
  }

  @Override
  public List<TeamRank> findRanksByName(String name) throws DataAccessException {
    Team team = teamRepository.findByName(name);

    return teamRankRepository.findByTeam(team, new Sort(Sort.Direction.ASC, "date"));
  }

  @Override
  public List<TeamRating> findRatingsByName(String name) throws DataAccessException {
    Team team = teamRepository.findByName(name);

    return teamRatingRepository.findByTeamAndProvisionalFalse(team, new Sort(Sort.Direction.ASC, "date", "match"));
  }

}
