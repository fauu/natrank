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

package com.github.fauu.natrank.controller;

import com.github.fauu.natrank.model.*;
import com.github.fauu.natrank.model.form.RawMatchDataForm;
import com.github.fauu.natrank.service.MatchDataImportService;
import com.github.fauu.natrank.util.TeamEditor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@SessionAttributes("matchData")
public class AdminController {

  @Autowired
  private MatchDataImportService matchDataImportService;

  @Autowired
  private TeamEditor teamEditor;

  @ModelAttribute("matchData")
  public ProcessedMatchData getMatchData() {
    return new ProcessedMatchData();
  }

  @InitBinder
  public void initBinder(WebDataBinder binder) {
    binder.registerCustomEditor(Team.class, teamEditor);
  }

  @RequestMapping(value = {"", "/"}, method = RequestMethod.GET)
  public String main() {
    return "redirect:/admin/import-data";
  }

  @RequestMapping(value = "/import-data", method = RequestMethod.GET)
  public String importMatchDataMain() {
    return "redirect:/admin/import-data/steps/1";
  }

  @RequestMapping(value = "/import-data/steps/1", method = RequestMethod.GET)
  public String importMatchData(Model model) {
    RawMatchDataForm rawMatchDataForm = new RawMatchDataForm();
    model.addAttribute(rawMatchDataForm);

    model.addAttribute("step", 1);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/2", method = RequestMethod.POST)
  public String processRawMatchData(@ModelAttribute("matchDataForm") RawMatchDataForm rawMatchDataForm,
                                    Model model) {
    ProcessedMatchData matchData =
        matchDataImportService.processMatchData(rawMatchDataForm.getRawData());

    model.addAttribute("step", 2);

    model.addAttribute("matchData", matchData);

    if (matchData.getErrors().size() == 0) {
      List<Team> teams = matchDataImportService.findAllTeams();

      model.addAttribute("teams", teams);
    } else {
      model.addAttribute("step", 1);
    }

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/3", method = RequestMethod.POST)
  public String processNewCountries(@ModelAttribute("matchData") ProcessedMatchData matchData,
                                    BindingResult result, Model model) {

    model.addAttribute("step", 3);

    model.addAttribute("matchData", matchData);

    // TODO: Country assigned to an exisitng team -> set previous country's toDate

    matchDataImportService.addCountries(matchData.getCountries());

    return "dataImport";
  }

}
