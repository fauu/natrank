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

import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.repository.MatchRepository;
import com.github.fauu.natrank.repository.TeamRepository;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MatchServiceImpl implements MatchService {

  @Autowired
  private MatchRepository matchRepository;

  @Autowired
  private TeamRepository teamRepository;

  @Override
  public Page<Match> findAll(Pageable pageable) throws DataAccessException {
    return matchRepository.findAll(pageable);
  }

  @Override
  public Page<Match> findByYear(int year, Pageable pageable) throws DataAccessException {
    return matchRepository
           .findByDateBetween(new LocalDate(year, 1, 1), new LocalDate(year, 12, 31), pageable);
  }

  @Override
  public Page<Match> findByCurrentTeamName(String name, Pageable pageable) throws DataAccessException {
    Team team = teamRepository.findByCurrentName(name);

    return matchRepository.findByTeam1OrTeam2(team, team, pageable);
  }

}
