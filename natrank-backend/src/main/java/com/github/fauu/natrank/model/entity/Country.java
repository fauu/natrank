/*
 * Copyright (C) 2014-2016 natrank Developers (http://github.com/fauu/natrank)
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
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

import javax.persistence.*;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"period"}, callSuper = true)
public class Country extends NamedEntity {

  @Column(name = "code", nullable = false)
  @JsonView(BaseView.class)
  private String code;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "period_id", nullable = false)
  @JsonIgnore
  private Period period;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "team_id")
  @JsonIgnore
  private Team team;

  @OneToMany(mappedBy = "country", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<CityCountryAssoc> cityCountryAssocs = new LinkedList<>();

  @OneToMany(mappedBy = "country", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Flag> flags = new LinkedList<>();

  @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinTable(name = "match_type_country", joinColumns = {
      @JoinColumn(name = "country_id", nullable = false)},
      inverseJoinColumns = { @JoinColumn(name = "match_type_id", nullable = false)})
  @JsonIgnore
  private List<MatchType> matchTypesLimited = new LinkedList<>();

  @Transient
  @JsonIgnore
  private String predecessorName;

  @JsonIgnore
  public boolean isTournamentLimited() {
    return matchTypesLimited.size() > 0;
  }

  @JsonIgnore
  public List<City> getCurrentCities() {
    List<City> cities = new LinkedList<>();

    for (CityCountryAssoc cityCountryAssoc : cityCountryAssocs) {
      if (cityCountryAssoc.getPeriod().getToDate() == null) {
        cities.add(cityCountryAssoc.getCity());
      }
    }

    return cities;
  }

  @JsonIgnore
  public Flag getCurrentFlag() {
    for (Flag flag : flags) {
      if (flag.getPeriod().getToDate() == null) {
        return flag;
      }
    }

    return null;
  }

  @JsonIgnore
  public Flag getLastFlag() {
    List<Flag> flags = new LinkedList<>(getFlags());

    Collections.sort(flags, new Comparator<Flag>() {
      @Override
      public int compare(Flag flag1, Flag flag2) {
        return flag1.getPeriod().getFromDate().compareTo(flag2.getPeriod().getFromDate());
      }
    });

    return flags.size() > 0 ? flags.get(flags.size() - 1) : null;
  }

  @JsonIgnore
  public Flag getFlagByDate(LocalDate date) {
    for (Flag flag : flags) {
      if (flag.getPeriod().includesDate(date)) {
        return flag;
      }
    }

    return null;
  }

  @Override
  public String toString() {
    return super.toString();
  }

}
