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

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;

import javax.persistence.*;

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
  @JsonManagedReference
  private Team team1;

  @ManyToOne
  @JoinColumn(name = "team2_id")
  @JsonManagedReference
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

  @JsonManagedReference
  public Country getCountry() {
    return city.getCountryByDate(date);
  }

  @JsonManagedReference
  public Country getTeam1Country() {
    return team1.getCountryByDate(date);
  }

  @JsonManagedReference
  public Country getTeam2Country() {
    return team2.getCountryByDate(date);
  }

  @JsonManagedReference
  public Flag getCountryFlag() {
    return getCountry().getFlagByDate(date);
  }

  @JsonManagedReference
  public Flag getTeam1CountryFlag() {
    return getTeam1Country().getFlagByDate(date);
  }

  @JsonManagedReference
  public Flag getTeam2CountryFlag() {
    return getTeam2Country().getFlagByDate(date);
  }

}
