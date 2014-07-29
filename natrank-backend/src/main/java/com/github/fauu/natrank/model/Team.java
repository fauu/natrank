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
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Team")
public class Team extends BaseEntity {

  @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private Set<Country> countries;

  @OneToMany(mappedBy = "team1", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private Set<Match> matchesAsTeam1;

  @OneToMany(mappedBy = "team2", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private Set<Match> matchesAsTeam2;

  @OneToMany(mappedBy = "homeTeam", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private Set<Match> matchesHome;

  @OneToMany(mappedBy = "winnerTeam", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private Set<Match> matchesWon;

  public Set<Country> getCountries() {
    return countries;
  }

  public void setCountries(Set<Country> countries) {
    this.countries = countries;
  }

  public Set<Match> getMatchesAsTeam1() {
    return matchesAsTeam1;
  }

  public void setMatchesAsTeam1(Set<Match> matchesAsTeam1) {
    this.matchesAsTeam1 = matchesAsTeam1;
  }

  public Set<Match> getMatchesAsTeam2() {
    return matchesAsTeam2;
  }

  public void setMatchesAsTeam2(Set<Match> matchesAsTeam2) {
    this.matchesAsTeam2 = matchesAsTeam2;
  }

  public Set<Match> getMatchesHome() {
    return matchesHome;
  }

  public void setMatchesHome(Set<Match> matchesHome) {
    this.matchesHome = matchesHome;
  }

  public Set<Match> getMatchesWon() {
    return matchesWon;
  }

  public void setMatchesWon(Set<Match> matchesWon) {
    this.matchesWon = matchesWon;
  }

  public String getCurrentName() {
    Country currentCountry =  getCurrentCountry();

    if (currentCountry != null) {
      return currentCountry.getName();
    } else {
      return null;
    }
  }

  public Country getCurrentCountry() {
    if (countries != null) {
      for (Country country : countries) {
        if (country.getToDate() == null) {
          return country;
        }
      }
    }

    return null;
  }

  public boolean isCityHomeForDate(City city, LocalDate date) {
    if (countries != null) {
      for (Country country : countries) {
        if (!country.getFromDate().isAfter(date) &&
            ((country.getToDate() == null) || country.getToDate().isAfter(date))) {
          return city.getCountryByDate(date).equals(country);
        }
      }
    }

    return false;
  }

}
