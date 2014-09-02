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

package com.github.fauu.natrank.web.controller;

import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/matches")
public class MatchController {

  @Autowired
  private MatchService matchService;

  @RequestMapping(method = RequestMethod.GET)
  public Page<Match> findAll(@PageableDefault(size = 50, direction = Sort.Direction.DESC)
                               Pageable pageable) {
    return matchService.findAll(pageable);
  }

  @RequestMapping(value = "/year/{year}", method = RequestMethod.GET)
  public Page<Match> findByYear(@PageableDefault(size = 50, direction = Sort.Direction.DESC)
                                    Pageable pageable,
                                @PathVariable("year") int year) {
    return matchService.findByYear(year, pageable);
  }

  @RequestMapping(value = "/team/{teamName}", method = RequestMethod.GET)
  public Page<Match> findByCurrentTeamName(@PageableDefault(size = 50, direction = Sort.Direction.DESC)
                                               Pageable pageable,
                                           @PathVariable("teamName") String teamName) {
    return matchService.findByCurrentTeamName(teamName, pageable);
  }

}
