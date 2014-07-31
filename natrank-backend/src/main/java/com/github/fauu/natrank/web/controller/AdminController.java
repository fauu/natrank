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

import com.github.fauu.natrank.web.converter.CountryPropertyEditor;
import com.github.fauu.natrank.model.*;
import com.github.fauu.natrank.model.form.RawMatchDataForm;
import com.github.fauu.natrank.service.MatchDataImportService;
import com.github.fauu.natrank.web.converter.TeamPropertyEditor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@SessionAttributes({"matchData", "newMatches"})
public class AdminController {

  @Autowired
  private MatchDataImportService matchDataImportService;

  @ModelAttribute("rawMatchDataForm")
  public RawMatchDataForm getRawMatchDataFrom() {
    return new RawMatchDataForm();
  }

  @ModelAttribute("matchData")
  public ProcessedMatchData getMatchData() {
    return new ProcessedMatchData();
  }

  @ModelAttribute("newMatches")
  public List<Match> getNewMatches() {
    return new LinkedList<>();
  }

  @InitBinder
  public void initBinder(WebDataBinder binder) {
    binder.registerCustomEditor(Team.class, new TeamPropertyEditor(matchDataImportService));
    binder.registerCustomEditor(Country.class, new CountryPropertyEditor(matchDataImportService));
  }

  @RequestMapping(value = {"", "/"}, method = RequestMethod.GET)
  public String main() {
    return "redirect:/admin/import-data";
  }

  @RequestMapping(value = "/import-data", method = RequestMethod.GET)
  public String importRawMatchDataMain() {
    return "redirect:/admin/import-data/steps/1";
  }

  @RequestMapping(value = "/import-data/steps/1", method = RequestMethod.GET)
  public String importRawMatchData(Model model) {
    RawMatchDataForm rawMatchDataForm = new RawMatchDataForm();

    model.addAttribute(rawMatchDataForm);
    model.addAttribute("step", 1);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/1", method = RequestMethod.POST)
  public String processRawMatchData(
      @ModelAttribute("rawMatchDataForm") RawMatchDataForm rawMatchDataForm, Model model) {
    ProcessedMatchData matchData =
        matchDataImportService.processMatchData(rawMatchDataForm.getRawData());

    model.addAttribute("matchData", matchData);

    if ((matchData.getErrors().size() == 0) && (matchData.getMatches().size() > 0)) {
      return "redirect:/admin/import-data/steps/2";
    } else {
      model.addAttribute("step", 1);
      model.addAttribute("noMatches", true);

      return "dataImport";
    }
  }

  @RequestMapping(value = "/import-data/steps/2", method = RequestMethod.GET)
  public String editCountries(@ModelAttribute("matchData") ProcessedMatchData matchData, Model model) {
    List<Team> teams = matchDataImportService.findAllTeams();

    model.addAttribute("step", 2);
    model.addAttribute("matchData", matchData);
    model.addAttribute("teams", teams);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/2", method = RequestMethod.POST)
  public String saveCountries(@ModelAttribute("matchData") ProcessedMatchData matchData,
                              BindingResult result, Model model) {
    matchDataImportService.addCountries(matchData.getCountries());

    return "redirect:/admin/import-data/steps/3";
  }

  @RequestMapping(value = "/import-data/steps/3", method = RequestMethod.GET)
  public String editCities(@ModelAttribute("matchData") ProcessedMatchData matchData,
                                    Model model) {
    List<Country> allCountries = matchDataImportService.findAllCountriesSorted();

    model.addAttribute("step", 3);
    model.addAttribute("matchData", matchData);
    model.addAttribute("allCountries", allCountries);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/3", method = RequestMethod.POST)
  public String saveCities(@ModelAttribute("matchData") ProcessedMatchData matchData,
                           BindingResult result, Model model) {
    model.addAttribute("step", 3);
    model.addAttribute("matchData", matchData);

    matchDataImportService.addCities(matchData.getCities());

    return "redirect:/admin/import-data/steps/4";
  }

  @RequestMapping(value = "/import-data/steps/4", method = RequestMethod.GET)
  public String editMatchTypes(@ModelAttribute("matchData") ProcessedMatchData matchData,
                               Model model) {
    model.addAttribute("step", 4);
    model.addAttribute("matchData", matchData);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/4", method = RequestMethod.POST)
  public String saveMatchTypes(@ModelAttribute("matchData") ProcessedMatchData matchData,
                               BindingResult result, Model model) {
    model.addAttribute("step", 4);
    model.addAttribute("matchData", matchData);

    matchDataImportService.addMatchTypes(matchData.getTypes());

    return "redirect:/admin/import-data/steps/5";
  }

  @RequestMapping(value = "/import-data/steps/5", method = RequestMethod.GET)
  public String reviewMatches(@ModelAttribute("matchData") ProcessedMatchData matchData,
                              Model model) {
    List<Match> newMatches = matchDataImportService.createMatches(matchData);

    model.addAttribute("step", 5);
    model.addAttribute("newMatches", newMatches);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/6", method = RequestMethod.GET)
  public String saveMatchesAndGetWikiFlagMarkup(@ModelAttribute("newMatches") List<Match> newMatches,
                                                Model model) {
    matchDataImportService.addMatches(newMatches);

    model.addAttribute("step", 6);

    return "dataImport";
  }

}
