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
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
  @JsonManagedReference
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

  public int getGoalDifference() {
    return goalsFor - goalsAgainst;
  }

  @JsonManagedReference
  public Country getTeamCountry() {
    return team.getCountryByDateNotTournamentLimited(ranking.getDate());
  }

  @JsonManagedReference
  public Flag getTeamCountryFlag() {
    return getTeamCountry().getFlagByDate(ranking.getDate());
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
