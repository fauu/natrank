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

import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.model.entity.NotableMatchCategory;
import com.github.fauu.natrank.service.MatchService;
import com.github.fauu.natrank.web.json.BaseView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/matches")
public class MatchController {

  public static final int RECORDS_PER_PAGE = 50;

  @Autowired
  private MatchService matchService;

  @RequestMapping(method = RequestMethod.GET)
  @JsonView(Match.Views.Default.class)
  public Page<Match> findAll(Pageable pageable) {
    return matchService.findAll(createPageRequest(pageable, Sort.Direction.DESC));
  }

  @RequestMapping(value = "/year/{year}", method = RequestMethod.GET)
  @JsonView(Match.Views.Default.class)
  public Page<Match> findByYear(Pageable pageable, @PathVariable("year") int year) {
    return matchService.findByYear(year, createPageRequest(pageable, Sort.Direction.ASC));
  }

  @RequestMapping(value = "/team/{teamName}", method = RequestMethod.GET)
  @JsonView(Match.Views.Default.class)
  public Page<Match> findByCurrentTeamName(Pageable pageable,
                                           @PathVariable("teamName") String teamName) {
    return matchService.findByCurrentTeamName(teamName,
                                              createPageRequest(pageable, Sort.Direction.DESC));
  }

  @RequestMapping(value = "/notable/team/{teamName}", method = RequestMethod.GET)
  @JsonView(Match.Views.Default.class)
  public Map<NotableMatchCategory, List<Match>> findNotableMatchesByTeamName(@PathVariable("teamName") String teamName) {
    return matchService.findNotableMatchesByTeamName(teamName);
  }

  @RequestMapping(value = "/notable/categories", method = RequestMethod.GET)
  @JsonView(BaseView.class)
  public List<NotableMatchCategory> findNotableMatchCategories() {
    return matchService.findNotableMatchCategories();
  }

  @RequestMapping(value = "/form/team/{teamName}", method = RequestMethod.GET)
  public List<Integer> getTeamFormByName(@PathVariable("teamName") String teamName) {
    return matchService.getTeamFormByName(teamName);
  }

  private PageRequest createPageRequest(Pageable pageable, Sort.Direction direction) {
    return new PageRequest(pageable.getPageNumber(), RECORDS_PER_PAGE, direction, "id");
  }

}
