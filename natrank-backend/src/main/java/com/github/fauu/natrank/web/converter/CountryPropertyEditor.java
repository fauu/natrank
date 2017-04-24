package com.github.fauu.natrank.web.converter;

import com.github.fauu.natrank.model.entity.Country;
import com.github.fauu.natrank.service.CountryService;

import java.beans.PropertyEditorSupport;

public class CountryPropertyEditor extends PropertyEditorSupport {

  private CountryService countryService;

  public CountryPropertyEditor(CountryService countryService) {
    this.countryService = countryService;
  }

  @Override
  public void setAsText(String text) {
    Country country;

    if (text.equals("")) {
      country = null;
    } else if (text.equals("0")) {
      country = new Country();
    } else {
      country = countryService.findById(Integer.parseInt(text));
    }

    setValue(country);
  }

}
