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

import com.github.fauu.natrank.model.Match;
import com.github.fauu.natrank.model.Team;
import com.github.fauu.natrank.model.report.MatchReport;
import com.github.fauu.natrank.service.MatchDataImportService;
import com.github.fauu.natrank.service.MatchService;
import com.github.fauu.natrank.web.jsonview.BaseView;
import com.github.fauu.natrank.web.jsonview.MatchListView;
import com.github.fauu.natrank.web.jsonview.ResponseView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/matches")
public class MatchController {

  @Autowired
  private MatchService matchService;

  @Autowired
  private MatchDataImportService matchDataImportService;

  @RequestMapping(method = RequestMethod.GET)
//  @ResponseView(MatchListView.class)
  public List<Match> findAll() {
    return matchService.findAll();
  }

}
