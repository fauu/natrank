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

import com.github.fauu.natrank.model.DynamicRanking;
import com.github.fauu.natrank.model.DynamicRankingEntry;
import com.github.fauu.natrank.model.RankedTeam;
import com.github.fauu.natrank.model.entity.*;
import com.github.fauu.natrank.repository.*;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RankingServiceImpl implements RankingService {

  public static final SortedMap<Integer, Integer> DEFAULT_RATINGS_UPTO_YEAR = new TreeMap<>();
  static {
    DEFAULT_RATINGS_UPTO_YEAR.put(1900, 2000);
    DEFAULT_RATINGS_UPTO_YEAR.put(1910, 1850);
    DEFAULT_RATINGS_UPTO_YEAR.put(1920, 1700);
    DEFAULT_RATINGS_UPTO_YEAR.put(1935, 1500);
  }

  public static final int INITIAL_HOME_ADVANTAGE_COEFFICIENT = 250;

  public static final int NUM_TRIAL_MATCHES = 15;

  public static final int TRIAL_RATING_MODIFIER = 8;

  @Autowired
  private MatchRepository matchRepository;

  @Autowired
  private RankingRepository rankingRepository;

  @Autowired
  private TeamRepository teamRepository;

  @Autowired
  private TeamRankRepository teamRankRepository;

  @Autowired
  private TeamRatingRepository teamRatingRepository;

  private void calculateTeamRatingsAndRankChanges(List<Match> matches) throws DataAccessException {
    teamRatingRepository.deleteAll();
    teamRankRepository.deleteAll();

    List<TeamRating> ratings = new LinkedList<>();
    List<TeamRank> ranks = new LinkedList<>();
    Map<Integer, RankedTeam> rankedTeamsByTeamId = new HashMap();
    List<Team> teams = teamRepository.findAll();
    SortedMap<Integer, Integer> initialRatings = new TreeMap<>();

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
              for (int year : DEFAULT_RATINGS_UPTO_YEAR.keySet()) {
                if (match.getDate().getYear() < year) {
                  initialRatings.put(team.getId(), DEFAULT_RATINGS_UPTO_YEAR.get(year));
                }
              }
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
          Team currentTeam = matchTeams.get(i);

          int ratingChangeModifier = 1;
          if (passNo == 0 && currentTeam.getRatings().size() - 1 < NUM_TRIAL_MATCHES) {
            ratingChangeModifier = TRIAL_RATING_MODIFIER;
          }

          int currentTeamOldRating = matchTeamRatings.get(i);
          matchTeamRatings.set(i, currentTeamOldRating + ratingChangeModifier * matchTeamRatingChanges.get(i));

          TeamRating newRating = new TeamRating();
          newRating.setDate(match.getDate());
          newRating.setTeam(matchTeams.get(i));
          newRating.setMatch(match);
          newRating.setValue(matchTeamRatings.get(i));
          newRating.setChange(matchTeamRatingChanges.get(i));

          matchTeams.get(i).setHomeAdvantageCoefficient(
              matchTeams.get(i).getHomeAdvantageCoefficient() + 0.075 * matchTeamRatingChanges.get(i));

          if (i == 0) {
            match.setTeam1Rating(newRating.getValue());
            match.setTeam1RatingChange(newRating.getChange());
          } else if (i == 1) {
            match.setTeam2Rating(newRating.getValue());
            match.setTeam2RatingChange(newRating.getChange());
          }

          ratings.add(newRating);

          currentTeam.getRatings().add(newRating);

          if (passNo == 1 && (currentTeam.getRatings().size() - 1) >= NUM_TRIAL_MATCHES) {
            List<RankedTeam> rankedTeamsToProcess = new LinkedList<>();

            boolean isFirstEntryOfCurrentTeam = false;
            if (!rankedTeamsByTeamId.containsKey(currentTeam.getId())) {
              RankedTeam newRankedTeam = new RankedTeam();

              newRankedTeam.setTeam(currentTeam);
              newRankedTeam.setRating(currentTeam.getCurrentRating().getValue());
              newRankedTeam.setRank(rankedTeamsByTeamId.size() + 1);

              rankedTeamsByTeamId.put(currentTeam.getId(), newRankedTeam);

              currentTeamOldRating = 0;

              isFirstEntryOfCurrentTeam = true;
            }

            int currentTeamCurrentRating = currentTeam.getCurrentRating().getValue();

            int currentTeamRatingChange = currentTeamCurrentRating - currentTeamOldRating;

            if (currentTeamRatingChange != 0) {
              int currentTeamHighRating
                  = currentTeamRatingChange >= 0 ? currentTeamCurrentRating : currentTeamOldRating;
              int currentTeamLowRating
                  = currentTeamRatingChange < 0 ? currentTeamCurrentRating : currentTeamOldRating;

              int currentTeamRank = rankedTeamsByTeamId.get(currentTeam.getId()).getRank();
              for (Map.Entry<Integer, RankedTeam> rankedTeamEntry : rankedTeamsByTeamId.entrySet()) {
                if (rankedTeamEntry.getKey().equals(currentTeam.getId())) {
                  rankedTeamEntry.getValue().setRating(currentTeamCurrentRating);
                }

                int entryTeamRating = rankedTeamEntry.getValue().getRating();

                int entryTeamRank = rankedTeamEntry.getValue().getRank();
                if ((currentTeamHighRating >= entryTeamRating) && (currentTeamLowRating <= entryTeamRating) &&
                    !((currentTeamRatingChange > 0) && (entryTeamRating == currentTeamLowRating) && (entryTeamRank > currentTeamRank)) &&
                    !((currentTeamRatingChange < 0) && (entryTeamRating == currentTeamHighRating) && (entryTeamRank < currentTeamRank))) {
                   rankedTeamsToProcess.add(rankedTeamEntry.getValue());
                }
              }

              if (isFirstEntryOfCurrentTeam || rankedTeamsToProcess.size() > 1) {
                int otherTeamsRankChange = currentTeamRatingChange > 0 ? 1 : -1;
                int currentTeamRankChange = -1 * otherTeamsRankChange * (rankedTeamsToProcess.size() - 1);
                for (RankedTeam rankedTeam : rankedTeamsToProcess) {
                  int rankChange = rankedTeam.getTeam() == currentTeam ? currentTeamRankChange : otherTeamsRankChange;

                  rankedTeam.setRank(rankedTeam.getRank() + rankChange);

                  TeamRank newTeamRankEntry = new TeamRank();
                  newTeamRankEntry.setDate(match.getDate());
                  newTeamRankEntry.setTeam(rankedTeam.getTeam());
                  newTeamRankEntry.setValue(rankedTeam.getRank());
                  if (!(rankedTeam.getTeam() == currentTeam) || !isFirstEntryOfCurrentTeam) {
                    newTeamRankEntry.setChange(-1 * rankChange);
                  }

                  if (rankedTeam.getTeam() == match.getTeam1()) {
                    match.setTeam1Rank(newTeamRankEntry.getValue());
                    match.setTeam1RankChange(newTeamRankEntry.getChange());
                  } else if (rankedTeam.getTeam() == match.getTeam2()) {
                    match.setTeam2Rank(newTeamRankEntry.getValue());
                    match.setTeam2RankChange(newTeamRankEntry.getChange());
                  }

                  ranks.add(newTeamRankEntry);
                }
              } else {
                if (i == 0) {
                  match.setTeam1Rank(rankedTeamsByTeamId.get(currentTeam.getId()).getRank());
                  match.setTeam1RankChange(0);
                } else if (i == 1) {
                  match.setTeam2Rank(rankedTeamsByTeamId.get(currentTeam.getId()).getRank());
                  match.setTeam2RankChange(0);
                }
              }
            }
          }

          if (passNo == 0 && (matchTeams.get(i).getRatings().size() - 1 < NUM_TRIAL_MATCHES)) {
            initialRatings.put(matchTeams.get(i).getId(), newRating.getValue());
          }
        }
      }
    }

    matchRepository.save(matches);
    teamRatingRepository.save(ratings);
    teamRankRepository.save(ranks);
  }

  private Ranking createRankingForDate(LocalDate date, Map<Integer, RankingEntry> entryMap) {
    Ranking ranking = new Ranking();
    ranking.setDate(date);

    // FIXME: This should take LocalDate instead of String
    List<TeamRating> latestTeamRatingsForTeamByDate
        = teamRatingRepository.findLatestForTeamsByDate(ranking.getDate().toString("yyyy-MM-dd"));
    Map<Integer, TeamRating> latestTeamRatingsMap = new HashMap<>();
    for (TeamRating rating : latestTeamRatingsForTeamByDate) {
      latestTeamRatingsMap.put(rating.getTeam().getId(), rating);
    }

    Map<Integer, RankingEntry> newEntryMap = new HashMap<>();
    for (Map.Entry<Integer, RankingEntry> entry : entryMap.entrySet()) {
      RankingEntry newEntry = new RankingEntry(entry.getValue());

      if(newEntry.getMatchesTotal() >= NUM_TRIAL_MATCHES) {
        newEntry.setRating(latestTeamRatingsMap.get(newEntry.getTeam().getId()).getValue());
      }

      newEntryMap.put(newEntry.getTeam().getId(), newEntry);
    }

    List<RankingEntry> newEntries = new LinkedList<>(newEntryMap.values());

    Collections.sort(newEntries);

    int currentRank = 1;
    for (RankingEntry entry : newEntries) {
      entry.setRanking(ranking);

      if (entry.getRating() != 0) {
        entry.setRank(currentRank);

        currentRank++;
      }
    }

    ranking.getEntries().addAll(newEntries);

    return ranking;
  }

  @Override
  public void createRankings() throws DataAccessException {
    List<Match> matches = (List<Match>)matchRepository.findAll();

    calculateTeamRatingsAndRankChanges(matches);

    List<Ranking> rankings = new LinkedList<>();
    Map<Integer, RankingEntry> entryMap = new HashMap<>();

    rankingRepository.deleteAll();

    // FIXME: Don't hardcode the dates
    Queue<LocalDate> rankingDateQueue = new LinkedList<>();
    for (int year = 1900; year <= 1930; year++) {
      if (year % 5 == 0) {
        if (year != 1930) {
          rankingDateQueue.add(new LocalDate(year, 8, 1));
        } else {
          rankingDateQueue.add(new LocalDate(year, 7, 7));
        }
      }
    }

    for (Match match : matches) {
      LocalDate nextRankingDate = rankingDateQueue.peek();
      if (nextRankingDate == null) {
        break;
      }

      if (match.getDate().isAfter(nextRankingDate)) {
        rankings.add(createRankingForDate(rankingDateQueue.poll(), entryMap));
      }

      List<Team> matchTeams = new ArrayList<>();
      matchTeams.add(match.getTeam1());
      matchTeams.add(match.getTeam2());

      for (Team team : matchTeams) {
        if (!entryMap.containsKey(team.getId())) {
          RankingEntry newEntry = new RankingEntry();
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

    LocalDate nextRankingDate;
    while ((nextRankingDate = rankingDateQueue.poll()) != null) {
      rankings.add(createRankingForDate(nextRankingDate, entryMap));
    }

    rankingRepository.save(rankings);
  }

  @Override
  public Ranking findLatest() throws DataAccessException {
    return rankingRepository.findLatest();
  }

  @Override
  public Ranking findByDate(LocalDate date) throws DataAccessException {
    return rankingRepository.findByDate(date);
  }

  @Override
  public DynamicRanking createDynamicForDate(LocalDate date) {
    // FIXME: These should take LocalDate instead of String
    String dateStr = date.toString("yyyy-MM-dd");
    List<TeamRating> latestTeamRatingsForTeamByDate
        = teamRatingRepository.findLatestForTeamsByDate(dateStr);
    List<TeamRank> latestTeamRanksForTeamByDate
        = teamRankRepository.findLatestForTeamsByDate(dateStr);

    DynamicRanking ranking = new DynamicRanking();
    ranking.setFullVariantAvailable(rankingRepository.existsByDate(date));

    Map<Integer, DynamicRankingEntry> rankingEntryMap = new HashMap<>();

    for (TeamRank teamRank : latestTeamRanksForTeamByDate) {
      DynamicRankingEntry rankingEntry = new DynamicRankingEntry();
      rankingEntry.setTeam(teamRank.getTeam());
      rankingEntry.setRanking(ranking);
      rankingEntry.setRank(teamRank.getValue());

      rankingEntryMap.put(teamRank.getTeam().getId(), rankingEntry);
    }

    for (TeamRating teamRating : latestTeamRatingsForTeamByDate) {
      DynamicRankingEntry rankingEntry;

      if (!rankingEntryMap.containsKey(teamRating.getTeam().getId())) {
        rankingEntry = new DynamicRankingEntry();
        rankingEntry.setTeam(teamRating.getTeam());
        rankingEntry.setRanking(ranking);
        rankingEntry.setRating(0);
        rankingEntry.setRank(0);

        rankingEntryMap.put(teamRating.getTeam().getId(), rankingEntry);
      } else {
        rankingEntry = rankingEntryMap.get(teamRating.getTeam().getId());
        rankingEntry.setRating(teamRating.getValue());
      }
    }

    List<DynamicRankingEntry> rankingEntries = new LinkedList<>(rankingEntryMap.values());

    Collections.sort(rankingEntries);

    ranking.setDate(date);
    ranking.setEntries(rankingEntries);

    return ranking;
  }

}
