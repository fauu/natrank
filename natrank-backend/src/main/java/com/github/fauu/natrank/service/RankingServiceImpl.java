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

import com.github.fauu.natrank.model.entity.*;
import com.github.fauu.natrank.repository.*;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RankingServiceImpl implements RankingService {

  public static final int AVERAGE_RATING = 1500;

  public static final int INITIAL_HOME_ADVANTAGE_COEFFICIENT = 250;

  public static final int NUM_TRIAL_MATCHES = 30;

  public static final int TRIAL_RATING_MODIFIER = 10;

  @Autowired
  private MatchRepository matchRepository;

  @Autowired
  private RankingEntryRepository rankingEntryRepository;

  @Autowired
  private RankingRepository rankingRepository;

  @Autowired
  private TeamRepository teamRepository;

  @Autowired
  private TeamRatingRepository teamRatingRepository;

  @Override
  public void calculateRanking() throws DataAccessException {
    teamRatingRepository.deleteAll();

    List<Match> matches = matchRepository.findAll();
    List<TeamRating> ratings = new LinkedList<>();
    List<Team> teams = teamRepository.findAll();
    Map<Integer, Integer> initialRatings = new HashMap<>();
    int numPointsToInject = 0;

    for (int passNo = 0; passNo < 2; passNo++) {
      if (passNo == 1) {
        ratings.clear();
        for (Team team : teams) {
          team.getRatings().clear();
        }
      }

      for (Match match : matches) {
        List<Team> matchTeams = new ArrayList<>();
        matchTeams.add(match.getTeam1());
        matchTeams.add(match.getTeam2());

        for (Team team : matchTeams) {
          if (team.getRatings().size() == 0) {
            team.setHomeAdvantageCoefficient(INITIAL_HOME_ADVANTAGE_COEFFICIENT);
            TeamRating rating = new TeamRating();
            rating.setDate(match.getDate());
            rating.setTeam(team);
            rating.setChange(0);

            if (!initialRatings.containsKey(team.getId())) {
              initialRatings.put(team.getId(), AVERAGE_RATING);
            }

            rating.setValue(initialRatings.get(team.getId()));

            team.getRatings().add(rating);
          }
        }

        List<Integer> matchTeamRatings = new ArrayList<>();
        matchTeamRatings.add(matchTeams.get(0).getCurrentRating().getValue());
        matchTeamRatings.add(matchTeams.get(1).getCurrentRating().getValue());
        List<Integer> matchTeamRatingsAdjusted = new ArrayList<>(matchTeamRatings);

        Team winnerTeam = match.getWinnerTeam();
        double marginOfVictoryCoefficient;
        double matchResultCoefficient = 0;

        if (winnerTeam != null) {
          marginOfVictoryCoefficient
              = Math.sqrt(Math.abs(match.getTeam1Goals() - match.getTeam2Goals()));

          if (winnerTeam == matchTeams.get(0)) {
            matchResultCoefficient = 1;
            matchTeamRatingsAdjusted.set(0,
                matchTeamRatingsAdjusted.get(0)
                    + (int) Math.round(matchTeams.get(0).getHomeAdvantageCoefficient())
            );
          } else if (winnerTeam == matchTeams.get(1)) {
            matchResultCoefficient = 0;
            matchTeamRatingsAdjusted.set(1,
                matchTeamRatingsAdjusted.get(1)
                    + (int) Math.round(matchTeams.get(1).getHomeAdvantageCoefficient())
            );
          }
        } else {
          marginOfVictoryCoefficient = 1;
          matchResultCoefficient = 0.5;
        }

        double exponent = (-1 * (matchTeamRatingsAdjusted.get(0) - matchTeamRatingsAdjusted.get(1)))
            / 444.0;
        double expectedMatchResultCoefficient = 1 / (Math.pow(10, exponent) + 1);

        double team1RatingChange = match.getType().getWeight() * marginOfVictoryCoefficient *
            (matchResultCoefficient - expectedMatchResultCoefficient);
        long team1RatingChangeRounded = Math.round(team1RatingChange);

        List<Integer> matchTeamRatingChanges = new ArrayList<>();
        matchTeamRatingChanges.add((int) team1RatingChangeRounded);
        matchTeamRatingChanges.add(-1 * (int) team1RatingChangeRounded);

        for (int i = 0; i < 2; i++) {
          int ratingChangeModifier = 1;
          if (passNo == 0 && matchTeams.get(i).getRatings().size() - 1 < NUM_TRIAL_MATCHES) {
            ratingChangeModifier = TRIAL_RATING_MODIFIER;
            numPointsToInject -= (TRIAL_RATING_MODIFIER - 1) * matchTeamRatingChanges.get(i);
          }
          matchTeamRatings.set(i, matchTeamRatings.get(i) + ratingChangeModifier * matchTeamRatingChanges.get(i));

          TeamRating newRating = new TeamRating();
          newRating.setDate(match.getDate().plusDays(1));
          newRating.setTeam(matchTeams.get(i));
          newRating.setMatch(match);
          newRating.setValue(matchTeamRatings.get(i));
          newRating.setChange(matchTeamRatingChanges.get(i));

          matchTeams.get(i).setHomeAdvantageCoefficient(
              matchTeams.get(i).getHomeAdvantageCoefficient() + 0.075 * matchTeamRatingChanges.get(i));

          ratings.add(newRating);

          matchTeams.get(i).getRatings().add(newRating);

          if (passNo == 0) {
            initialRatings.put(matchTeams.get(i).getId(), newRating.getValue());
          }
        }
      }

      if (passNo == 0) {
        // TODO: Optimize this
        while (Math.abs(numPointsToInject) > 0) {
          for (Map.Entry<Integer, Integer> initialRating : initialRatings.entrySet()) {
            if (numPointsToInject > 0) {
              initialRating.setValue(initialRating.getValue() + 1);

              numPointsToInject--;
            } else {
              initialRating.setValue(initialRating.getValue() - 1);

              numPointsToInject++;
            }
          }
        }
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
      if (rating.getTeam().getRatings().size() - 1 >= NUM_TRIAL_MATCHES) {
        RankingEntry entry = entryMap.get(rating.getTeam().getId());
        entry.setRating(rating.getValue());
      }
    }

    List<RankingEntry> entries = new LinkedList<>(entryMap.values());
    Collections.sort(entries);

    int currentRank = 1;
    for (RankingEntry entry : entries) {
      if (entry.getRating() != 0) {
        entry.setRank(currentRank);

        currentRank++;
      }
    }

    ranking.setEntries(entries);

    rankingRepository.save(ranking);
  }

  @Override
  public Ranking find() throws DataAccessException {
    return rankingRepository.findOne(21);
  }
}
