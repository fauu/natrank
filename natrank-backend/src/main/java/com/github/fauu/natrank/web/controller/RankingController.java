/*
 * Copyright (C) 2014-2016 natrank Developers (http://github.com/fauu/natrank)
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

import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.model.DynamicRanking;
import com.github.fauu.natrank.model.entity.Ranking;
import com.github.fauu.natrank.service.RankingService;
import com.github.fauu.natrank.service.TeamService;
import com.github.fauu.natrank.util.StringUtils;
import com.github.fauu.natrank.web.json.BaseView;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rankings")
public class RankingController {

  @Autowired
  private RankingService rankingService;

  @Autowired
  private TeamService teamService;

  // TODO: Replace this with findByDate
  @RequestMapping(value = {"", "/latest"}, method = RequestMethod.GET)
  @JsonView(Ranking.Views.Full.class)
  public Ranking findLatest() {
    return rankingService.findLatest();
  }

  @RequestMapping(value = "/excerpt/{teamName}", method = RequestMethod.GET)
  @JsonView(BaseView.class)
  public DynamicRanking findExcerptFromLatestByTeam(
      @PathVariable(value = "teamName") String urlFriendlyTeamName) {
    return rankingService.findExcerptFromLatestByTeam(
        teamService.findByName(StringUtils.urlFriendlyToProper(urlFriendlyTeamName)));
  }

//  @RequestMapping(value = "/{date}/full", method = RequestMethod.GET)
//  public Ranking findByDate(
//      @PathVariable(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
//    return rankingService.findByDate(date);
//  }

  @RequestMapping(value = "/{date}", method = RequestMethod.GET)
  @JsonView(BaseView.class)
  public DynamicRanking findDynamicByDate(
      @PathVariable(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
    return rankingService.createDynamicForDate(date);
  }

}
