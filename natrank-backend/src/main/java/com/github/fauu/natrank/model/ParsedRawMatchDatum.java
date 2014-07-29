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

import org.joda.time.LocalDate;

public class ParsedRawMatchDatum {

  private LocalDate date;
  private String type;
  private String city;
  private String team1;
  private String team2;
  private String result;

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getTeam1() {
    return team1;
  }

  public void setTeam1(String team1) {
    this.team1 = team1;
  }

  public String getTeam2() {
    return team2;
  }

  public void setTeam2(String team2) {
    this.team2 = team2;
  }

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }

}
