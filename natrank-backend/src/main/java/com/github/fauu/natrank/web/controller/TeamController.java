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

package com.github.fauu.natrank.web.controller;

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.entity.TeamRating;
import com.github.fauu.natrank.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/teams")
public class TeamController {

  @Autowired
  TeamService teamService;

  @RequestMapping(value = "/{name}", method = RequestMethod.GET)
  public Team findByName(@PathVariable("name") String name) {
    return teamService.findByCurrentName(name);
  }

  @RequestMapping(value = "/{name}/ratings", method = RequestMethod.GET)
  public List<TeamRating> findRatingsByName(@PathVariable("name") String name) {
    return teamService.findRatingsByName(name);
  }

}
