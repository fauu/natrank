package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"cityCountryAssocs"}, callSuper = true)
public class City extends NamedEntity {

  @OneToMany(mappedBy = "city", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<CityCountryAssoc> cityCountryAssocs = new LinkedList<>();

  @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Match> matches;

  @JsonIgnore
  public List<Country> getCountries() {
    List<Country> countries = new LinkedList<>();

    for (CityCountryAssoc cityCountryAssoc : cityCountryAssocs) {
      countries.add(cityCountryAssoc.getCountry());
    }

    return countries;
  }

  @JsonIgnore
  public Country getCountryByDate(LocalDate date) {
    for (CityCountryAssoc ccAssoc : cityCountryAssocs) {
      if (ccAssoc.getPeriod().includesDate(date)) {
        return ccAssoc.getCountry();
      }
    }

    return null;
  }

  @JsonIgnore
  public CityCountryAssoc getLastCityCountryAssoc() {
    List<CityCountryAssoc> cityCountryAssocsSortedByFromDate = new LinkedList<>(cityCountryAssocs);
    // TODO: Verify that this is the correct order!
    Collections.sort(cityCountryAssocsSortedByFromDate, new Comparator<CityCountryAssoc>() {
      @Override
      public int compare(CityCountryAssoc cityCountryAssoc1, CityCountryAssoc cityCountryAssoc2) {
        return cityCountryAssoc1.getPeriod().getFromDate()
                   .compareTo(cityCountryAssoc2.getPeriod().getFromDate());
      }
    });

    return cityCountryAssocsSortedByFromDate.get(cityCountryAssocsSortedByFromDate.size() - 1);
  }

  @Override
  public String toString() {
    return super.toString();
  }

}
