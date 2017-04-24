package com.github.fauu.natrank.model.form;

import com.github.fauu.natrank.model.CityWithNewCountry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CityReassignmentForm {

  private List<CityWithNewCountry> citiesWithNewCountries;

}
