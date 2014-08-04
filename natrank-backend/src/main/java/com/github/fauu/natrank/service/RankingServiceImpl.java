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
import com.github.fauu.natrank.model.entity.*;
import com.github.fauu.natrank.repository.*;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RankingServiceImpl implements RankingService {

  @Autowired
  MatchRepository matchRepository;

  @Autowired
  RankingEntryRepository rankingEntryRepository;

  @Autowired
  RankingRepository rankingRepository;

  @Autowired
  TeamRatingRepository teamRatingRepository;

  @Autowired
  TeamRepository teamRepository;

  @Override
  public void calculateRanking() throws DataAccessException {
    teamRatingRepository.deleteAll();

    List<Match> matches = matchRepository.findAll();
    List<TeamRating> ratings = new LinkedList<>();
    Map<Integer, RatedTeam> ratedTeams = new HashMap<>();

    for (Match match : matches) {
      List<Team> matchTeams = new ArrayList<>();
      matchTeams.add(match.getTeam1());
      matchTeams.add(match.getTeam2());

      for (Team team : matchTeams) {
        if (!ratedTeams.containsKey(team.getId())) {
          team.setHomeAdvantageCoefficient(250);
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

    // TODO: Factor this out
    rankingEntryRepository.deleteAll(); // doesn't the line below take care of that?
    rankingRepository.deleteAll();

    Ranking ranking = new Ranking();
    ranking.setDate(new LocalDate(1930, 7, 7));
    Map<Integer, RankingEntry> entryMap = new HashMap<>();

    for (Match match : matches) {
      List<Team> matchTeams = new ArrayList<>();
      matchTeams.add(match.getTeam1());
      matchTeams.add(match.getTeam2());

      for (Team team : matchTeams) {
        if (!entryMap.containsKey(team.getId())) {
          RankingEntry newEntry = new RankingEntry();
          newEntry.setRanking(ranking);
          newEntry.setTeam(team);

          entryMap.put(team.getId(), newEntry);
        }
      }

      List<RankingEntry> matchTeamEntries = new ArrayList<>();
      matchTeamEntries.add(entryMap.get(matchTeams.get(0).getId()));
      matchTeamEntries.add(entryMap.get(matchTeams.get(1).getId()));

      matchTeamEntries.get(0).incrementMatchesTotal();
      matchTeamEntries.get(1).incrementMatchesTotal();

      if (match.getHomeTeam() == null) {
        matchTeamEntries.get(0).incrementMatchesOnNeutralGround();
        matchTeamEntries.get(1).incrementMatchesOnNeutralGround();
      } else if (match.getHomeTeam() == matchTeams.get(0)) {
        matchTeamEntries.get(0).incrementMatchesHome();
        matchTeamEntries.get(1).incrementMatchesAway();
      } else if (match.getHomeTeam() == matchTeams.get(1)) {
        matchTeamEntries.get(0).incrementMatchesAway();
        matchTeamEntries.get(1).incrementMatchesHome();
      }

      if (match.getWinnerTeam() == null) {
        matchTeamEntries.get(0).incrementDraws();
        matchTeamEntries.get(1).incrementDraws();
      } else if (match.getWinnerTeam() == matchTeams.get(0)) {
        matchTeamEntries.get(0).incrementWins();
        matchTeamEntries.get(1).incrementLosses();
      } else if (match.getWinnerTeam() == matchTeams.get(1)) {
        matchTeamEntries.get(0).incrementLosses();
        matchTeamEntries.get(1).incrementWins();
      }

      matchTeamEntries.get(0).addGoalsFor(match.getTeam1Goals());
      matchTeamEntries.get(0).addGoalsAgainst(match.getTeam2Goals());
      matchTeamEntries.get(1).addGoalsFor(match.getTeam2Goals());
      matchTeamEntries.get(1).addGoalsAgainst(match.getTeam1Goals());
    }

    // TODO: replace with latestTeamRatingsForEachTeamForDate
    List<TeamRating> latestTeamRatings = teamRatingRepository.findLatestForEachTeam();

    for (TeamRating rating : latestTeamRatings) {
      RankingEntry entry = entryMap.get(rating.getTeam().getId());
      entry.setRating(rating.getRating());
    }

    List<RankingEntry> entries = new LinkedList<>(entryMap.values());
    Collections.sort(entries);

    int currentRank = 1;
    for (RankingEntry entry : entries) {
      entry.setRank(currentRank);

      currentRank++;
    }

    ranking.setEntries(entries);

    rankingRepository.save(ranking);
  }

}
