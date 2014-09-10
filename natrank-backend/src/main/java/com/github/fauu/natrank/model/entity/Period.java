/*
 * Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
 *
 * This software is licensed under the GNU General Public License
 * (version 3 or later). See the COPYING file in this distribution.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this software. If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Piotr Grabowski <fau999(at)gmail.com>
 */

package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
@Table(name = "Period")
public class Period extends BaseEntity {

  @Column(name = "date_from", nullable = false)
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  @JsonView(BaseView.class)
  private LocalDate fromDate;

  @Column(name = "date_to")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  @JsonView(BaseView.class)
  private LocalDate toDate;

  public boolean includesDate(LocalDate date) {
    return (!date.isBefore(fromDate) && (toDate == null || date.isAfter(toDate)));
  }

}
