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
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
  private DateTime fromDate;

  @Column(name = "date_to")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
  private DateTime toDate;

  public CityCountryAssoc() {}

  public CityCountryAssoc(City city, Country country, DateTime fromDate, DateTime toDate) {
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

}
