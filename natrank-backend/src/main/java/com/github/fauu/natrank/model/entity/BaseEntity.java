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
import com.github.fauu.natrank.web.json.view.BaseView;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@ToString
public abstract class BaseEntity<T extends BaseEntity<T>> implements Comparable<T> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonView(BaseView.class)
  @JsonIgnore
  protected Integer id;

  @JsonIgnore
  public boolean isNew() {
    return (this.id == null);
  }

  @Override
  public int compareTo(T other) {
    return Integer.compare(this.getId(), other.getId());
  }

}
