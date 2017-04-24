package com.github.fauu.natrank.model.form;

import com.github.fauu.natrank.model.CountryWithFlagEntryYears;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlagManagementForm {

  private List<CountryWithFlagEntryYears> countriesWithFlagEntryYears;

}
