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

import com.github.fauu.natrank.model.NamedTeam;
import com.github.fauu.natrank.model.ProcessedMatchData;
import com.github.fauu.natrank.model.form.MatchDataForm;
import com.github.fauu.natrank.service.MatchDataImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

  @Autowired
  MatchDataImportService matchDataImportService;

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
    MatchDataForm matchDataForm = new MatchDataForm();
    model.addAttribute(matchDataForm);

    model.addAttribute("step", 1);
    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/2", method = RequestMethod.POST)
  public String processRawMatchData(@ModelAttribute("matchDataForm") MatchDataForm matchDataForm,
                                    Model model) {
    ProcessedMatchData matchData =
        matchDataImportService.processMatchData(matchDataForm.getRawData());

    model.addAttribute("step", 2);

    model.addAttribute("matchData", matchData);

    if (matchData.getErrors().size() == 0) {
      List<NamedTeam> namedTeams = matchDataImportService.findAllNamedTeams();

      model.addAttribute("namedTeams", namedTeams);
    } else {
      model.addAttribute("step", 1);
    }

    return "dataImport";
  }

}
