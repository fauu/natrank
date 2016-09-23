/*
 * Copyright (C) 2014-2016 natrank Developers (http://github.com/fauu/natrank)
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

import com.github.fauu.natrank.model.entity.City;
import com.github.fauu.natrank.model.entity.Country;
import com.github.fauu.natrank.model.entity.MatchType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProcessedMatchData {

  private List<ParsedRawMatchDatum> matches = new LinkedList<>();
  private List<MatchType> types = new ArrayList<>();
  private List<City> cities = new ArrayList<>();
  private List<String> citiesInferredCountryNames = new ArrayList<>();
  private List<Country> countries = new ArrayList<>();
  private List<MatchDataError> errors = new ArrayList<>();

}
