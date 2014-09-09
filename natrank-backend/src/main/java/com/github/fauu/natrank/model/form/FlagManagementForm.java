/*
 * Copyright (C) 2014 natrank Developers (http://github.com/fauu/natrank)
 *
 * This software is licensed under the GNU General Public License
 * (version 3 or later). See the COPYING file in this distribution.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this software. If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Piotr Grabowski <fau999(at)gmail.com>
 */

package com.github.fauu.natrank.model.form;

import com.github.fauu.natrank.model.CountryWithFlagEntryYears;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FlagManagementForm {

  private List<CountryWithFlagEntryYears> countriesWithFlagEntryYears;

}
