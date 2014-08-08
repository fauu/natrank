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

package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.fauu.natrank.model.TeamInfo;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "RankingEntry")
public class RankingEntry extends BaseEntity implements Comparable<RankingEntry> {

  @ManyToOne
  @JoinColumn(name = "ranking_id")
  @JsonBackReference
  private Ranking ranking;

  @Column(name = "rank")
  private int rank;

  @Column(name = "rating")
  private int rating;

  @ManyToOne
  @JoinColumn(name = "team_id")
  @JsonIgnore
  private Team team;

  @Column(name = "matches_total")
  private int matchesTotal = 0;

  @Column(name = "matches_home")
  private int matchesHome = 0;

  @Column(name = "matches_away")
  private int matchesAway = 0;

  @Column(name = "matches_neutral")
  private int matchesOnNeutralGround = 0;

  @Column(name = "wins")
  private int wins = 0;

  @Column(name = "losses")
  private int losses = 0;

  @Column(name = "draws")
  private int draws = 0;

  @Column(name = "goals_for")
  private int goalsFor = 0;

  @Column(name = "goals_against")
  private int goalsAgainst = 0;

  @Getter(AccessLevel.NONE)
  @Transient
  private TeamInfo teamInfo;

  public int getGoalDifference() {
    return goalsFor - goalsAgainst;
  }

  public TeamInfo getTeamInfo() {
    if (teamInfo == null) {
      Country teamCountry = team.getCountryByDate(ranking.getDate());

      TeamInfo teamInfo = new TeamInfo();
      teamInfo.setTeam(team);
      teamInfo.setName(teamCountry.getName());
      teamInfo.setFlag(teamCountry.getFlagByDate(ranking.getDate()));

      this.teamInfo = teamInfo;
    }

    return teamInfo;
  }

  public RankingEntry(RankingEntry other) {
    this.ranking = other.ranking;
    this.rank = other.rank;
    this.rating = other.rating;
    this.team = other.team;
    this.matchesTotal = other.matchesTotal;
    this.matchesHome = other.matchesHome;
    this.matchesAway = other.matchesAway;
    this.matchesOnNeutralGround = other.matchesOnNeutralGround;
    this.wins = other.wins;
    this.losses = other.losses;
    this.draws = other.draws;
    this.goalsFor = other.goalsFor;
    this.goalsAgainst = other.goalsAgainst;
  }

  public void incrementMatchesTotal() {
    matchesTotal++;
  }

  public void incrementMatchesHome() {
    matchesHome++;
  }

  public void incrementMatchesAway() {
    matchesAway++;
  }

  public void incrementMatchesOnNeutralGround() {
    matchesOnNeutralGround++;
  }

  public void incrementWins() {
    wins++;
  }

  public void incrementLosses() {
    losses++;
  }

  public void incrementDraws() {
    draws++;
  }

  public void addGoalsFor(int count) {
    goalsFor += count;
  }

  public void addGoalsAgainst(int count) {
    goalsAgainst += count;
  }

  @Override
  public int compareTo(RankingEntry other) {
    int ratingComparison = -1 * Integer.compare(this.getRating(), other.getRating());

    if (ratingComparison == 0) {
      int matchTotalComparison
          = -1 * Integer.compare(this.getMatchesTotal(), other.getMatchesTotal());

      return matchTotalComparison;
    }

    return ratingComparison;
  }

}
