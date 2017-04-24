package com.github.fauu.natrank.model;

import com.github.fauu.natrank.model.entity.Country;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryTeamMerge {

  private Country subject;
  private Country target;

}
