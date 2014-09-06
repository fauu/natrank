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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.joda.time.LocalDate;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "TeamRank")
public class TeamRank extends BaseEntity {

  public static class Views {
    public static class Default extends BaseView { }
  }

  @Column(name = "date")
  @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
  @JsonView(BaseView.class)
  private LocalDate date;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "team_id")
  @JsonIgnore
  private Team team;

  @Column(name = "rank")
  @JsonView(BaseView.class)
  private int value;

  @Column(name = "change")
  @JsonView(Views.Default.class)
  private Integer change;

}
