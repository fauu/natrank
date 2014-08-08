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

package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.github.fauu.natrank.model.TeamInfo;
import lombok.*;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "Match")
public class Match extends BaseEntity {

  @Column(name = "date")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  private LocalDate date;

  @ManyToOne
  @JoinColumn(name = "type_id")
  @JsonManagedReference
  private MatchType type;

  @ManyToOne
  @JoinColumn(name = "city_id")
  @JsonManagedReference
  private City city;

  @ManyToOne
  @JoinColumn(name = "team1_id")
  @JsonIgnore
  private Team team1;

  @ManyToOne
  @JoinColumn(name = "team2_id")
  @JsonIgnore
  private Team team2;

  @Column(name = "team1_goals")
  private int team1Goals;

  @Column(name = "team2_goals")
  private int team2Goals;

  @Column(name = "result_extra")
  private String resultExtra;

  @ManyToOne
  @JoinColumn(name = "home_team_id")
  @JsonManagedReference
  private Team homeTeam;

  @ManyToOne
  @JoinColumn(name = "winner_team_id")
  @JsonManagedReference
  private Team winnerTeam;

  @Column(name = "penalty_shootout")
  private boolean penaltyShootout;

  @OneToMany(mappedBy = "match", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<TeamRating> teamRatings;

  @Getter(AccessLevel.NONE)
  @Transient
  private TeamInfo team1Info;

  @Getter(AccessLevel.NONE)
  @Transient
  private TeamInfo team2Info;

  public TeamInfo getTeam1Info() {
    if (team1Info == null) {
      this.team1Info = createTeamInfo(team1);
    }

    return team1Info;
  }

  public TeamInfo getTeam2Info() {
    if (team2Info == null) {
      this.team2Info = createTeamInfo(team2);
    }

    return team2Info;
  }

  private TeamInfo createTeamInfo(Team team) {
    Country teamCountry = team.getCountryByDate(date, type);

    TeamInfo teamInfo = new TeamInfo();
    teamInfo.setTeam(team);
    teamInfo.setName(teamCountry.getName());
    teamInfo.setFlag(teamCountry.getFlagByDate(date));

    return teamInfo;
  }

  @JsonManagedReference
  public Country getCountry() {
    return city.getCountryByDate(date);
  }

  @JsonManagedReference
  public Flag getCountryFlag() {
    return getCountry().getFlagByDate(date);
  }

  @JsonManagedReference
  public TeamRating getTeam1Rating() {
    return fixTeamRatingsOrder(teamRatings).get(0);
  }

  @JsonManagedReference
  public TeamRating getTeam2Rating() {
    return fixTeamRatingsOrder(teamRatings).get(1);
  }

  // Ugly hack, but overriding setter doesn't seem to work
  private List<TeamRating> fixTeamRatingsOrder(List<TeamRating> teamRatings) {
    if (teamRatings.get(0).getTeam() != team1) {
      Collections.reverse(teamRatings);
    }

    return teamRatings;
  }

}
