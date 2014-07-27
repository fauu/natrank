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

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "City")
public class City extends NamedEntity {

  @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonManagedReference
  private Set<CityCountryAssoc> cityCountryAssocs = new HashSet<>();

  public Set<CityCountryAssoc> getCityCountryAssocs() {
    return cityCountryAssocs;
  }

  public void setCityCountryAssocs(Set<CityCountryAssoc> cityCountryAssocs) {
    this.cityCountryAssocs = cityCountryAssocs;
  }

  /*
  @OneToMany(mappedBy = "city", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  private Set<Match> matches;

  public Set<Match> getMatches() {
    return matches;
  }

  public void setMatches(Set<Match> matches) {
    this.matches = matches;
  }
  */

}
