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
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Country")
public class Country extends NamedEntity {

  @Column(name = "code", nullable = false)
  @JsonView(BaseView.class)
  private String code;

  @Column(name = "date_from", nullable = false)
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  @JsonIgnore
  private LocalDate fromDate;

  @Column(name = "date_to")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  @JsonIgnore
  private LocalDate toDate;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "team_id")
  @JsonIgnore
  private Team team;

  @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<CityCountryAssoc> cityCountryAssocs = new LinkedList<>();

  @OneToMany(mappedBy = "country", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Flag> flags = new LinkedList<>();

  @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinTable(name = "MatchTypeCountry", joinColumns = {
      @JoinColumn(name = "country_id", nullable = false)},
      inverseJoinColumns = { @JoinColumn(name = "match_type_id", nullable = false)})
  @JsonIgnore
  private List<MatchType> matchTypesLimited = new LinkedList<>();

  @JsonIgnore
  public boolean isTournamentLimited() {
    return matchTypesLimited.size() > 0;
  }

  @JsonIgnore
  public Flag getCurrentFlag() {
    for (Flag flag : flags) {
      if (flag.getToDate() == null) {
        return flag;
      }
    }

    return null;
  }

  @JsonIgnore
  public Flag getFlagByDate(LocalDate date) {
    for (Flag flag : flags) {
      if (!flag.getFromDate().isAfter(date) &&
          ((flag.getToDate() == null) || flag.getToDate().isAfter(date))) {
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
