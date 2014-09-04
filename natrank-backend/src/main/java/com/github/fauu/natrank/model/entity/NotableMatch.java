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
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "NotableMatch")
public class NotableMatch extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "category_id")
  @JsonManagedReference
  private NotableMatchCategory category;

  @ManyToOne
  @JoinColumn(name = "team_id")
  @JsonIgnore
  private Team team;

  @ManyToOne
  @JoinColumn(name = "match_id")
  @JsonManagedReference
  private Match match;

}
