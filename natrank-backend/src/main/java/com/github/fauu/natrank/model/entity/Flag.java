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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"code"}, callSuper = true)
@Table(name = "Flag")
public class Flag extends BaseEntity {

  @Column(name = "code", nullable = false)
  @JsonView(BaseView.class)
  private String code;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "period_id", nullable = false)
  @JsonIgnore
  private Period period;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonIgnore
  private Country country;

  @Override
  public String toString() {
    return code;
  }

}
