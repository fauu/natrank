package com.github.fauu.natrank.model;

import com.github.fauu.natrank.model.entity.City;
import com.github.fauu.natrank.model.entity.Country;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CityWithNewCountry {

  private City city;

  private Country newCountry;

  public CityWithNewCountry(City city) {
    this.city = city;
  }

}
