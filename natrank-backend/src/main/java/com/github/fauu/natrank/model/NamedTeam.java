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

public class NamedTeam {

  private String currentName;
  private Team team;

  public NamedTeam(String currentName, Team team) {
    this.currentName = currentName;
    this.team = team;
  }

  public String getCurrentName() {
    return currentName;
  }

  public void setCurrentName(String currentName) {
    this.currentName = currentName;
  }

  public Team getTeam() {
    return team;
  }

  public void setTeam(Team team) {
    this.team = team;
  }

  public Integer getId() {
    return this.team.getId();
  }

  public void setId(Integer id) {
    this.team.setId(id);
  }

}
