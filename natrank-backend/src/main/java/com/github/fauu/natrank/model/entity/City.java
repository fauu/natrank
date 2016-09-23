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
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"cityCountryAssocs"}, callSuper = true)
@Table(name = "City")
public class City extends NamedEntity {

  @OneToMany(mappedBy = "city", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<CityCountryAssoc> cityCountryAssocs = new LinkedList<>();

  @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Match> matches;

  @JsonIgnore
  public List<Country> getCountries() {
    List<Country> countries = new LinkedList<>();

    for (CityCountryAssoc cityCountryAssoc : cityCountryAssocs) {
      countries.add(cityCountryAssoc.getCountry());
    }

    return countries;
  }

  @JsonIgnore
  public Country getCountryByDate(LocalDate date) {
    for (CityCountryAssoc ccAssoc : cityCountryAssocs) {
      if (ccAssoc.getPeriod().includesDate(date)) {
        return ccAssoc.getCountry();
      }
    }

    return null;
  }

  @JsonIgnore
  public CityCountryAssoc getLastCityCountryAssoc() {
    List<CityCountryAssoc> cityCountryAssocsSortedByFromDate = new LinkedList<>(cityCountryAssocs);
    // TODO: Verify that this is the correct order!
    Collections.sort(cityCountryAssocsSortedByFromDate, new Comparator<CityCountryAssoc>() {
      @Override
      public int compare(CityCountryAssoc cityCountryAssoc1, CityCountryAssoc cityCountryAssoc2) {
        return cityCountryAssoc1.getPeriod().getFromDate()
                   .compareTo(cityCountryAssoc2.getPeriod().getFromDate());
      }
    });

    return cityCountryAssocsSortedByFromDate.get(cityCountryAssocsSortedByFromDate.size() - 1);
  }

  @Override
  public String toString() {
    return super.toString();
  }

}
