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
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.*;

@Entity
@Table(name = "Flag")
public class Flag extends BaseEntity {

  @Column(name = "code")
  private String code;

  @Column(name = "date_from")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
  private DateTime fromDate;

  @Column(name = "date_to")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
  private DateTime toDate;

  @ManyToOne
  @JoinColumn(name = "country_id")
  @JsonBackReference
  private Country country;

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
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

  public Country getCountry() {
    return country;
  }

  public void setCountry(Country country) {
    this.country = country;
  }

}
