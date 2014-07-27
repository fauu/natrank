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

import java.util.*;

public class ProcessedMatchData {

  private List<ParsedMatch> matches = new LinkedList<>();
  private Set<String> types = new HashSet<>();
  private Set<String> cities = new HashSet<>();
  private List<Country> countries = new ArrayList<>();
  private Set<String> newTypes = new HashSet<>();
  private Set<String> newCities = new HashSet<>();
  private List<MatchDataError> errors = new ArrayList<>();

  public List<ParsedMatch> getMatches() {
    return matches;
  }

  public void setMatches(List<ParsedMatch> matches) {
    this.matches = matches;
  }

  public Set<String> getTypes() {
    return types;
  }

  public void setTypes(Set<String> types) {
    this.types = types;
  }

  public Set<String> getCities() {
    return cities;
  }

  public void setCities(Set<String> cities) {
    this.cities = cities;
  }

  public List<MatchDataError> getErrors() {
    return errors;
  }

  public void setErrors(List<MatchDataError> errors) {
    this.errors = errors;
  }

  public Set<String> getNewTypes() {
    return newTypes;
  }

  public void setNewTypes(Set<String> newTypes) {
    this.newTypes = newTypes;
  }

  public Set<String> getNewCities() {
    return newCities;
  }

  public void setNewCities(Set<String> newCities) {
    this.newCities = newCities;
  }

  public List<Country> getCountries() {
    return countries;
  }

  public void setCountries(List<Country> countries) {
    this.countries = countries;
  }

}
