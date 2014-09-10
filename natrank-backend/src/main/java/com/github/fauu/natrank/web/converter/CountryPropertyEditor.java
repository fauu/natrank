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
