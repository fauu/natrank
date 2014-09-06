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

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.github.fauu.natrank.model.TeamInfo;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Match")
public class Match extends BaseEntity {

  public static class Views {
    public static class Default extends BaseView { }
  }

  @Column(name = "date")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  @JsonView(Views.Default.class)
  private LocalDate date;

  @ManyToOne
  @JoinColumn(name = "type_id")
  @JsonSerialize(using = ToStringSerializer.class)
  @JsonView(Views.Default.class)
  private MatchType type;

  @ManyToOne
  @JoinColumn(name = "city_id")
  @JsonSerialize(using = ToStringSerializer.class)
  @JsonView(Views.Default.class)
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
  @JsonView(Views.Default.class)
  private int team1Goals;

  @Column(name = "team2_goals")
  @JsonView(Views.Default.class)
  private int team2Goals;

  @Column(name = "result_extra")
  @JsonView(Views.Default.class)
  private String resultExtra;

  @ManyToOne
  @JoinColumn(name = "home_team_id")
  @JsonIgnore
  private Team homeTeam;

  @ManyToOne
  @JoinColumn(name = "winner_team_id")
  @JsonUnwrapped(suffix = "Winner")
  @JsonView(Views.Default.class)
  private Team winnerTeam;

  @Column(name = "penalty_shootout")
  @JsonView(Views.Default.class)
  private boolean penaltyShootout;

  @Column(name = "team1_rating")
  @JsonView(Views.Default.class)
  private Integer team1Rating;

  @Column(name = "team2_rating")
  @JsonView(Views.Default.class)
  private Integer team2Rating;

  @Column(name = "team1_rating_change")
  @JsonView(Views.Default.class)
  private Integer team1RatingChange;

  @Column(name = "team2_rating_change")
  @JsonView(Views.Default.class)
  private Integer team2RatingChange;

  @Column(name = "team1_rank")
  @JsonView(Views.Default.class)
  private Integer team1Rank;

  @Column(name = "team2_rank")
  @JsonView(Views.Default.class)
  private Integer team2Rank;

  @Column(name = "team1_rank_change")
  @JsonView(Views.Default.class)
  private Integer team1RankChange;

  @Column(name = "team2_rank_change")
  @JsonView(Views.Default.class)
  private Integer team2RankChange;

  @Getter(AccessLevel.NONE)
  @Transient
  private TeamInfo team1Info;

  @Getter(AccessLevel.NONE)
  @Transient
  private TeamInfo team2Info;

  @OneToMany(mappedBy = "match", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  @JsonIgnore
  private List<NotableMatch> notableMatchEntries;

  @JsonProperty("team1")
  @JsonView(Views.Default.class)
  public TeamInfo getTeam1Info() {
    if (team1Info == null) {
      this.team1Info = createTeamInfo(team1);
    }

    return team1Info;
  }

  @JsonProperty("team2")
  @JsonView(Views.Default.class)
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

  @JsonSerialize(using = ToStringSerializer.class)
  @JsonView(Views.Default.class)
  public Country getCountry() {
    return city.getCountryByDate(date);
  }

  @JsonSerialize(using = ToStringSerializer.class)
  @JsonView(Views.Default.class)
  public Flag getCountryFlag() {
    return getCountry().getFlagByDate(date);
  }

}
