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

package com.github.fauu.natrank.model;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.*;

@Entity
@Table(name = "Match")
public class Match extends BaseEntity {

  @Column(name = "date")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
  private DateTime date;

  @ManyToOne
  @JoinColumn(name = "type_id")
  private MatchType type;

  @ManyToOne
  @JoinColumn(name = "city_id")
  private City city;

  @ManyToOne
  @JoinColumn(name = "team1_id")
  private Team team1;

  @ManyToOne
  @JoinColumn(name = "team2_id")
  private Team team2;

  @Column(name = "team1_goals")
  private int team1Goals;

  @Column(name = "team2_goals")
  private int team2Goals;

  @Column(name = "full_result")
  private String fullResult;

  @ManyToOne
  @JoinColumn(name = "home_team_id")
  private Team homeTeam;

  @ManyToOne
  @JoinColumn(name = "winner_team_id")
  private Team winnerTeam;

  @Column(name = "hash")
  private String hash;

  @Column(name = "penalty_shootout")
  private boolean penaltyShootout;

  public DateTime getDate() {
    return date;
  }

  public void setDate(DateTime date) {
    this.date = date;
  }

  public MatchType getType() {
    return type;
  }

  public void setType(MatchType type) {
    this.type = type;
  }

  public City getCity() {
    return city;
  }

  public void setCity(City city) {
    this.city = city;
  }

  public Team getTeam1() {
    return team1;
  }

  public void setTeam1(Team team1) {
    this.team1 = team1;
  }

  public Team getTeam2() {
    return team2;
  }

  public void setTeam2(Team team2) {
    this.team2 = team2;
  }

  public int getTeam1Goals() {
    return team1Goals;
  }

  public void setTeam1Goals(int team1Goals) {
    this.team1Goals = team1Goals;
  }

  public int getTeam2Goals() {
    return team2Goals;
  }

  public void setTeam2Goals(int team2Goals) {
    this.team2Goals = team2Goals;
  }

  public String getFullResult() {
    return fullResult;
  }

  public void setFullResult(String fullResult) {
    this.fullResult = fullResult;
  }

  public Team getHomeTeam() {
    return homeTeam;
  }

  public void setHomeTeam(Team homeTeam) {
    this.homeTeam = homeTeam;
  }

  public Team getWinnerTeam() {
    return winnerTeam;
  }

  public void setWinnerTeam(Team winnerTeam) {
    this.winnerTeam = winnerTeam;
  }

  public String getHash() {
    return hash;
  }

  public void setHash(String hash) {
    this.hash = hash;
  }

  public boolean isPenaltyShootout() {
    return penaltyShootout;
  }

  public void setPenaltyShootout(boolean penaltyShootout) {
    this.penaltyShootout = penaltyShootout;
  }

}
