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

package com.github.fauu.natrank.model.report;

import org.joda.time.DateTime;

public class MatchReport {

  private DateTime date;
  private String type;
  private String city;
  private String country;
  private String countryFlagCode;
  private MatchTeam team1;
  private MatchTeam team2;
  private String fullResult;
  private boolean penaltyShootout;
  private String homeTeamName;
  private String winnerTeamName;

  public MatchReport(DateTime date, String type, String city, String country, String countryFlagCode,
                     String team1Name, int team1GoalsScored, String team1FlagCode,
                     String team2Name, int team2GoalsScored, String team2FlagCode, String fullResult,
                     boolean penaltyShootout, String homeTeamName, String winnerTeamName) {
    // Temporary fix
    this.date = date.plusDays(1);
    this.type = type;
    this.city = city;
    this.country = country;
    this.countryFlagCode = countryFlagCode;
    this.team1 = new MatchTeam(team1Name, team1GoalsScored, team1FlagCode);
    this.team2 = new MatchTeam(team2Name, team2GoalsScored, team2FlagCode);
    this.fullResult = fullResult;
    this.penaltyShootout = penaltyShootout;
    this.homeTeamName = homeTeamName;
    this.winnerTeamName = winnerTeamName;
  }

  public DateTime getDate() {
    return date;
  }

  public void setDate(DateTime date) {
    this.date = date;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getCountryFlagCode() {
    return countryFlagCode;
  }

  public void setCountryFlagCode(String countryFlagCode) {
    this.countryFlagCode = countryFlagCode;
  }

  public MatchTeam getTeam1() {
    return team1;
  }

  public void setTeam1(MatchTeam team1) {
    this.team1 = team1;
  }

  public MatchTeam getTeam2() {
    return team2;
  }

  public void setTeam2(MatchTeam team2) {
    this.team2 = team2;
  }

  public String getFullResult() {
    return fullResult;
  }

  public void setFullResult(String fullResult) {
    this.fullResult = fullResult;
  }

  public boolean isPenaltyShootout() {
    return penaltyShootout;
  }

  public void setPenaltyShootout(boolean penaltyShootout) {
    this.penaltyShootout = penaltyShootout;
  }

  public String getHomeTeamName() {
    return homeTeamName;
  }

  public void setHomeTeamName(String homeTeamName) {
    this.homeTeamName = homeTeamName;
  }

  public String getWinnerTeamName() {
    return winnerTeamName;
  }

  public void setWinnerTeamName(String winnerTeamName) {
    this.winnerTeamName = winnerTeamName;
  }

  public class MatchTeam {
    private String name;
    private int goalsScored;
    private String flagCode;

    public MatchTeam(String name, int goalsScored, String flagCode) {
      this.name = name;
      this.goalsScored = goalsScored;
      this.flagCode = flagCode;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public int getGoalsScored() {
      return goalsScored;
    }

    public void setGoalsScored(int goalsScored) {
      this.goalsScored = goalsScored;
    }

    public String getFlagCode() {
      return flagCode;
    }

    public void setFlagCode(String flagCode) {
      this.flagCode = flagCode;
    }
  }

}
