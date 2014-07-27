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

import javax.persistence.*;

@Entity
@Table(name = "MatchType")
public class MatchType extends NamedEntity {

  /*
  @OneToMany(mappedBy = "type", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private Set<Match> matches;

  public Set<Match> getMatches() {
    return matches;
  }

  public void setMatches(Set<Match> matches) {
    this.matches = matches;
  }
  */

}
