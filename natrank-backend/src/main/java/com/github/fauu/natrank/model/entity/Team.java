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

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "Team")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id")
public class Team extends BaseEntity {

  @Column(name = "home_advantage_coefficient")
  @JsonIgnore
  private double homeAdvantageCoefficient;

  @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private List<Country> countries;

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

  @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonBackReference
  private List<TeamRating> ratings;

  @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<TeamRank> ranks;

  @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<RankingEntry> rankingEntries;

  @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<NotableMatch> notableMatches;

  @OneToOne
  @JoinColumn(name = "highest_rank_id")
  @JsonManagedReference
  private TeamExtreme highestRank;

  @OneToOne
  @JoinColumn(name = "lowest_rank_id")
  @JsonManagedReference
  private TeamExtreme lowestRank;

  @OneToOne
  @JoinColumn(name = "highest_rating_id")
  @JsonManagedReference
  private TeamExtreme highestRating;

  @OneToOne
  @JoinColumn(name = "lowest_rating_id")
  @JsonManagedReference
  private TeamExtreme lowestRating;

  @JsonBackReference
  public String getCurrentName() {
    Country currentCountry = getCurrentCountry();

    if (currentCountry != null) {
      return currentCountry.getName();
    } else {
      return null;
    }
  }

  @JsonManagedReference
  public Country getCurrentCountry() {
    if (countries != null) {
      for (Country country : countries) {
        if (country.getToDate() == null && !country.isTournamentLimited()) {
          return country;
        }
      }
    }

    return null;
  }

  @JsonBackReference
  public boolean isRepresentedByTournamentLimitedCountry() {
    if (countries != null) {
      for (Country country : countries) {
        if (country.isTournamentLimited()) {
          return true;
        }
      }
    }

    return false;
  }

  @JsonBackReference
  public TeamRating getCurrentRating() {
    if (!ratings.isEmpty()) {
      return ratings.get(ratings.size() - 1); // not safe, assumes that ratings are added in order
    }

    return null;
  }

  public Country getCountryByDate(LocalDate date) {
    return getCountryByDateNotTournamentLimited(date);
  }

  public Country getCountryByDate(LocalDate date, MatchType matchType) {
    if (isRepresentedByTournamentLimitedCountry()) {
      for (Country country : countries) {
          if (country.isTournamentLimited() && country.getMatchTypesLimited().contains(matchType)
              && !country.getFromDate().isAfter(date) &&
              ((country.getToDate() == null) || country.getToDate().isAfter(date))) {
            return country;
          }
      }
    }

    return getCountryByDateNotTournamentLimited(date);
  }

  private Country getCountryByDateNotTournamentLimited(LocalDate date) {
    for (Country country : countries) {
      if (!country.getFromDate().isAfter(date) &&
          ((country.getToDate() == null) || country.getToDate().isAfter(date))) {
        return country;
      }
    }

    return null;
  }

  public boolean isCityHomeForDate(City city, LocalDate date) {
    if (countries != null) {
      for (Country country : countries) {
        if (!country.getFromDate().isAfter(date) &&
            ((country.getToDate() == null) || country.getToDate().isAfter(date))) {
          Country countryByDate = city.getCountryByDate(date);
          if (countryByDate != null) {
            return countryByDate.equals(country);
          }
        }
      }
    }

    return false;
  }

  @JsonManagedReference
  public RankingEntry getLatestRankingEntry() {
    // FIXME: The last one is not necessarily the latest
    if (!rankingEntries.isEmpty()) {
      return rankingEntries.get(rankingEntries.size() - 1);
    }

    return null;
  }

}
