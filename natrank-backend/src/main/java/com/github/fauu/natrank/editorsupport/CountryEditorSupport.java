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

package com.github.fauu.natrank.editorsupport;

import com.github.fauu.natrank.model.CityCountryAssoc;
import com.github.fauu.natrank.model.Country;
import com.github.fauu.natrank.service.MatchDataImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.beans.PropertyEditorSupport;

@Component
public class CountryEditorSupport extends PropertyEditorSupport {

    @Autowired
    private MatchDataImportService matchDataImportService;

    @Override
    public void setAsText(String text) {
      Country country = matchDataImportService.findCountryById(Integer.parseInt(text));

      setValue(country);
    }

}
