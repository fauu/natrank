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
import com.github.fauu.natrank.model.entity.NotableMatch;
import com.github.fauu.natrank.model.entity.NotableMatchCategory;
import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.repository.MatchRepository;
import com.github.fauu.natrank.repository.NotableMatchCategoryRepository;
import com.github.fauu.natrank.repository.NotableMatchRepository;
import com.github.fauu.natrank.repository.TeamRepository;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchServiceImpl implements MatchService {

  @Autowired
  private MatchRepository matchRepository;

  @Autowired
  private NotableMatchCategoryRepository notableMatchCategoryRepository;

  @Autowired
  private NotableMatchRepository notableMatchRepository;

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

  @Override
  public Map<NotableMatchCategory, List<Match>> findNotableMatchesByTeamName(String name) throws DataAccessException {
    List<NotableMatch> notableMatches =
        notableMatchRepository.findByTeam(teamRepository.findByCurrentName(name));
    List<NotableMatchCategory> notableMatchCategories =
        notableMatchCategoryRepository.findAll();
    SortedMap<NotableMatchCategory, List<Match>> notableMatchMap = new TreeMap<>();

    for (NotableMatchCategory category : notableMatchCategories) {
      notableMatchMap.put(category, new LinkedList<Match>());
    }

    for (NotableMatch notableMatch : notableMatches) {
      notableMatchMap.get(notableMatch.getCategory()).add(notableMatch.getMatch());
    }

    return notableMatchMap;
  }

  @Override
  public List<NotableMatchCategory> findNotableMatchCategories() throws DataAccessException {
    return notableMatchCategoryRepository.findAll();
  }

  @Override
  public List<Integer> getTeamFormByName(String name) throws DataAccessException {
    Team team = teamRepository.findByCurrentName(name);
    Page<Match> matchPage
        = matchRepository.findByTeam1OrTeam2(team, team,
            new PageRequest(0, 5, Sort.Direction.DESC, "id"));

    List<Integer> form = new LinkedList<>();

    for (Match match : matchPage.getContent()) {
      int formEntryValue = 0;

      if (match.getWinnerTeam() == null) {
        formEntryValue = 0;
      } else if (match.getWinnerTeam() == team) {
        formEntryValue = 1;
      } else if (match.getWinnerTeam() != team) {
        formEntryValue = -1;
      }

      form.add(formEntryValue);
    }

    Collections.reverse(form);

    return form;
  }

  @Override
  public void generateNotableMatches() throws DataAccessException {
    notableMatchRepository.deleteAll();

    List<Team> teams = teamRepository.findAll();
    List<NotableMatchCategory> notableMatchCategories = notableMatchCategoryRepository.findAll();

    Map<Integer, List<Match>> notableMatchesMap = new HashMap<>();
    List<NotableMatch> newNotableMatches = new LinkedList<>();

    for (Team team : teams) {
      List<Match> firstMatchList = new LinkedList<>();
      firstMatchList.add(matchRepository.findFirstByTeamId(team.getId()));

      notableMatchesMap.put(1, firstMatchList);
      notableMatchesMap.put(2, matchRepository.findBiggestWinsByTeamId(team.getId()));
      notableMatchesMap.put(3, matchRepository.findBiggestDefeatsByTeamId(team.getId()));
      notableMatchesMap.put(4, matchRepository.findBiggestUpsetsByTeam(team));
      notableMatchesMap.put(5, matchRepository.findBiggestBlundersByTeam(team));

      for (Map.Entry<Integer, List<Match>> notableMatchesOfCategory : notableMatchesMap.entrySet()) {
        for (Match match : notableMatchesOfCategory.getValue()) {
          NotableMatch newNotableMatch = new NotableMatch();

          newNotableMatch.setCategory(notableMatchCategories.get(notableMatchesOfCategory.getKey() - 1));
          newNotableMatch.setTeam(team);
          newNotableMatch.setMatch(match);

          newNotableMatches.add(newNotableMatch);
        }
      }

      notableMatchRepository.save(newNotableMatches);
    }
  }

}
