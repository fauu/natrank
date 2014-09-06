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

package com.github.fauu.natrank.model;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.github.fauu.natrank.model.entity.Flag;
import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamInfo {

  @JsonUnwrapped
  @JsonView(BaseView.class)
  private Team team;

  @JsonView(BaseView.class)
  private String name;

  @JsonSerialize(using = ToStringSerializer.class)
  @JsonView(BaseView.class)
  private Flag flag;

}
