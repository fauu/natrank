package com.github.fauu.natrank.model.form;

import com.github.fauu.natrank.model.entity.Country;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryRenameForm {

  private Country country;
  private String newName;
  private String newCode;
  private String periodStr;

}
