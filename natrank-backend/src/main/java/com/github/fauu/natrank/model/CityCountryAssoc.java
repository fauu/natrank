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
import org.joda.time.LocalDate;

import javax.persistence.*;

@Entity
@Table(name = "CityCountry")
public class CityCountryAssoc extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "city_id")
  @JsonBackReference
  private City city;

  @ManyToOne
  @JoinColumn(name = "country_id")
  @JsonManagedReference
  private Country country;

  @Column(name = "date_from")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  private LocalDate fromDate;

  @Column(name = "date_to")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  private LocalDate toDate;

  public CityCountryAssoc() {}

  public CityCountryAssoc(City city, Country country, LocalDate fromDate, LocalDate toDate) {
    this.setCity(city);
    this.setCountry(country);
    this.setFromDate(fromDate);
    this.setToDate(toDate);
  }

  public City getCity() {
    return city;
  }

  public void setCity(City city) {
    this.city = city;
  }

  public Country getCountry() {
    return country;
  }

  public void setCountry(Country country) {
    this.country = country;
  }

  public LocalDate getFromDate() {
    return fromDate;
  }

  public void setFromDate(LocalDate fromDate) {
    this.fromDate = fromDate;
  }

  public LocalDate getToDate() {
    return toDate;
  }

  public void setToDate(LocalDate toDate) {
    this.toDate = toDate;
  }

}
