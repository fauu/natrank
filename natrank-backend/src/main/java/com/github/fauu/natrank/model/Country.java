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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Country")
public class Country extends NamedEntity {

  @Column(name = "date_from")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
  private DateTime fromDate;

  @Column(name = "date_to")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
  private DateTime toDate;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "team_id")
  @JsonManagedReference
  private Team team;

  @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private Set<CityCountryAssoc> cityCountryAssocs = new HashSet<>();

  @OneToMany(mappedBy = "country", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonManagedReference
  private Set<Flag> flags;

  public DateTime getFromDate() {
    return fromDate;
  }

  public void setFromDate(DateTime fromDate) {
    this.fromDate = fromDate;
  }

  public DateTime getToDate() {
    return toDate;
  }

  public void setToDate(DateTime toDate) {
    this.toDate = toDate;
  }

  public Team getTeam() {
    return team;
  }

  public void setTeam(Team team) {
    this.team = team;
  }

  public Set<CityCountryAssoc> getCityCountryAssocs() {
    return cityCountryAssocs;
  }

  public void setCityCountryAssocs(Set<CityCountryAssoc> cityCountryAssocs) {
    this.cityCountryAssocs = cityCountryAssocs;
  }

  public Set<Flag> getFlags() {
    return flags;
  }

  public void setFlags(Set<Flag> flags) {
    this.flags = flags;
  }

}
