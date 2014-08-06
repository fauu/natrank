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

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "City")
public class City extends NamedEntity {

  @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private List<CityCountryAssoc> cityCountryAssocs = new ArrayList<>();

  @OneToMany(mappedBy = "city", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonBackReference
  private List<Match> matches;

  public Country getCountryByDate(LocalDate date) {
    for (CityCountryAssoc ccAssoc : cityCountryAssocs) {
      if (!ccAssoc.getFromDate().isAfter(date) &&
          ((ccAssoc.getToDate() == null) || ccAssoc.getToDate().isAfter(date))) {
        return  ccAssoc.getCountry();
      }
    }

    return null;
  }

}