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

import com.github.fauu.natrank.model.RatedTeam;
import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamRating;
import com.github.fauu.natrank.repository.MatchRepository;
import com.github.fauu.natrank.repository.TeamRatingRepository;
import com.github.fauu.natrank.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RankingServiceImpl implements RankingService {

  @Autowired
  MatchRepository matchRepository;

  @Autowired
  TeamRatingRepository teamRatingRepository;

  @Autowired
  TeamRepository teamRepository;

  @Override
  public void calculateRanking() throws DataAccessException {
    teamRatingRepository.deleteAll();
    // TODO: Set team home advantage coefficients to default

    List<Match> matches = matchRepository.findAll();
    List<TeamRating> ratings = new LinkedList<>();
    Map<Integer, RatedTeam> ratedTeams = new HashMap<>();

    for (Match match : matches) {
      List<Team> matchTeams = new ArrayList<>();
      matchTeams.add(match.getTeam1());
      matchTeams.add(match.getTeam2());

      for (Team team : matchTeams) {
        if (!ratedTeams.containsKey(team.getId())) {
          TeamRating rating = new TeamRating();
          rating.setDate(match.getDate());
          rating.setTeam(team);
          rating.setRating(1000);
          rating.setChange(0);

          ratedTeams.put(team.getId(), new RatedTeam(team, rating.getRating()));
        }
      }

      List<Integer> matchTeamRatings = new ArrayList<>();
      List<Integer> matchTeamRatingsAdjusted = new ArrayList<>();

      Team winnerTeam = match.getWinnerTeam();
      double marginOfVictoryCoefficient;
      double matchResultCoefficient = 0;
      matchTeamRatings.add(ratedTeams.get(matchTeams.get(0).getId()).getRating());
      matchTeamRatings.add(ratedTeams.get(matchTeams.get(1).getId()).getRating());
      matchTeamRatingsAdjusted.add(ratedTeams.get(matchTeams.get(0).getId()).getRating());
      matchTeamRatingsAdjusted.add(ratedTeams.get(matchTeams.get(1).getId()).getRating());

      if (winnerTeam != null) {
        marginOfVictoryCoefficient
            = Math.sqrt(Math.abs(match.getTeam1Goals() - match.getTeam2Goals()));

        if (winnerTeam == matchTeams.get(0)) {
          matchResultCoefficient = 1;
          matchTeamRatingsAdjusted.set(0,
              matchTeamRatingsAdjusted.get(0)
                  + (int) Math.round(matchTeams.get(0).getHomeAdvantageCoefficient()));
        } else if (winnerTeam == matchTeams.get(1)) {
          matchResultCoefficient = 0;
          matchTeamRatingsAdjusted.set(1,
              matchTeamRatingsAdjusted.get(1)
                  + (int) Math.round(matchTeams.get(1).getHomeAdvantageCoefficient()));
        }
      } else {
        marginOfVictoryCoefficient = 1;
        matchResultCoefficient = 0.5;
      }

      double exponent = (-1 * (matchTeamRatingsAdjusted.get(0) - matchTeamRatingsAdjusted.get(1)))
          / 400;
      double expectedMatchResultCoefficient = 1 / (Math.pow(10, exponent) + 1);

      double team1RatingChange = match.getType().getWeight() * marginOfVictoryCoefficient *
          (matchResultCoefficient - expectedMatchResultCoefficient);
      long team1RatingChangeRounded = Math.round(team1RatingChange);

      List<Integer> matchTeamRatingChanges = new ArrayList<>();
      matchTeamRatingChanges.add((int) team1RatingChangeRounded);
      matchTeamRatingChanges.add(-1 * (int) team1RatingChangeRounded);

      for (int i = 0; i < 2; i++) {
        matchTeamRatings.set(i, matchTeamRatings.get(i) + matchTeamRatingChanges.get(i));

        TeamRating newRating = new TeamRating();
        newRating.setDate(match.getDate().plusDays(1));
        newRating.setTeam(matchTeams.get(i));
        newRating.setMatch(match);
        newRating.setRating(matchTeamRatings.get(i));
        newRating.setChange(matchTeamRatingChanges.get(i));

        matchTeams.get(i).setHomeAdvantageCoefficient(
            matchTeams.get(i).getHomeAdvantageCoefficient() + 0.075 * matchTeamRatingChanges.get(i));

        ratings.add(newRating);
        ratedTeams.get(matchTeams.get(i).getId()).setRating(matchTeamRatings.get(i));
      }
    }

    teamRatingRepository.save(ratings);
    matchRepository.save(matches);
  }

}
