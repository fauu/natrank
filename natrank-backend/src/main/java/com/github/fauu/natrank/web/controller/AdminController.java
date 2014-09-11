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

import com.github.fauu.natrank.model.CityWithNewCountry;
import com.github.fauu.natrank.model.CountryTeamMerge;
import com.github.fauu.natrank.model.CountryWithFlagEntryYears;
import com.github.fauu.natrank.model.ProcessedMatchData;
import com.github.fauu.natrank.model.entity.City;
import com.github.fauu.natrank.model.entity.Country;
import com.github.fauu.natrank.model.entity.Match;
import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.model.form.CityReassignmentForm;
import com.github.fauu.natrank.model.form.CountryRenameForm;
import com.github.fauu.natrank.model.form.FlagManagementForm;
import com.github.fauu.natrank.model.form.RawMatchDataForm;
import com.github.fauu.natrank.service.*;
import com.github.fauu.natrank.util.PeriodUtils;
import com.github.fauu.natrank.web.converter.CountryPropertyEditor;
import com.github.fauu.natrank.web.converter.TeamPropertyEditor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@SessionAttributes({"matchData", "newMatches", "flagManagementForm", "cityReassignmentForm"})
public class AdminController {

  @Autowired
  private CountryService countryService;

  @Autowired
  private MatchDataImportService matchDataImportService;

  @Autowired
  private MatchService matchService;

  @Autowired
  private RankingService rankingService;

  @Autowired
  private TeamService teamService;

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

  @ModelAttribute("flagManagementForm")
  public FlagManagementForm getFlagManagementForm() {
    return new FlagManagementForm();
  }

  @ModelAttribute("cityReassignmentForm")
  public CityReassignmentForm getCityReassignmentForm() {
    return new CityReassignmentForm();
  }

  @InitBinder
  public void initBinder(WebDataBinder binder) {
    binder.registerCustomEditor(Team.class, new TeamPropertyEditor(teamService));
    binder.registerCustomEditor(Country.class, new CountryPropertyEditor(countryService));
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
    if (matchData.getMatches().size() == 0) {
      return "redirect:/admin/import-data";
    }

    List<Team> teams = matchDataImportService.findAllTeams();

    model.addAttribute("step", 2);
    model.addAttribute("matchData", matchData);
    model.addAttribute("teams", teams);

    return "dataImport";
  }

  // TODO: Country code validation
  @RequestMapping(value = "/import-data/steps/2", method = RequestMethod.POST)
  public String saveCountries(@ModelAttribute("matchData") ProcessedMatchData matchData) {
    matchDataImportService.addCountries(matchData.getCountries());

    return "redirect:/admin/import-data/steps/3";
  }

  @RequestMapping(value = "/import-data/steps/3", method = RequestMethod.GET)
  public String editCities(@ModelAttribute("matchData") ProcessedMatchData matchData, Model model) {
    if (matchData.getMatches().size() == 0) {
      return "redirect:/admin/import-data";
    }

    List<Country> allCountries = matchDataImportService.findAllCountriesSortedByName();

    model.addAttribute("step", 3);
    model.addAttribute("matchData", matchData);
    model.addAttribute("allCountries", allCountries);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/3", method = RequestMethod.POST)
  public String saveCities(@ModelAttribute("matchData") ProcessedMatchData matchData, Model model) {
    model.addAttribute("step", 3);
    model.addAttribute("matchData", matchData);

    matchDataImportService.addCities(matchData.getCities());

    return "redirect:/admin/import-data/steps/4";
  }

  @RequestMapping(value = "/import-data/steps/4", method = RequestMethod.GET)
  public String editMatchTypes(@ModelAttribute("matchData") ProcessedMatchData matchData,
                               Model model) {
    if (matchData.getMatches().size() == 0) {
      return "redirect:/admin/import-data";
    }

    model.addAttribute("step", 4);
    model.addAttribute("matchData", matchData);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/4", method = RequestMethod.POST)
  public String saveMatchTypes(@ModelAttribute("matchData") ProcessedMatchData matchData, Model model) {
    model.addAttribute("step", 4);
    model.addAttribute("matchData", matchData);

    matchDataImportService.addMatchTypes(matchData.getTypes());

    return "redirect:/admin/import-data/steps/5";
  }

  @RequestMapping(value = "/import-data/steps/5", method = RequestMethod.GET)
  public String reviewMatches(@ModelAttribute("matchData") ProcessedMatchData matchData,
                              Model model) {
    if (matchData.getMatches().size() == 0) {
      return "redirect:/admin/import-data";
    }

    List<Match> newMatches = matchDataImportService.createMatches(matchData);

    model.addAttribute("step", 5);
    model.addAttribute("newMatches", newMatches);

    return "dataImport";
  }

  @RequestMapping(value = "/import-data/steps/6", method = RequestMethod.GET)
  public String saveMatchesAndGetWikiFlagMarkup(@ModelAttribute("newMatches") List<Match> newMatches,
                                                @ModelAttribute("matchData") ProcessedMatchData matchData,
                                                SessionStatus sessionStatus, Model model) {
    if (newMatches.size() == 0) {
      return "redirect:/admin/import-data";
    }

    sessionStatus.setComplete();
    matchDataImportService.addMatches(newMatches);

    model.addAttribute("step", 6);

    return "dataImport";
  }

  @RequestMapping(value = "/calculate-rankings", method = RequestMethod.GET)
  public String createRankings() {
    rankingService.createRankings();
    matchService.generateNotableMatches();

    return "rankingsCalculation";
  }

  @RequestMapping(value = "/manage-countries", method = RequestMethod.GET)
  public String manageCountries(Model model) {
    List<Country> countries = countryService.findAll();

    model.addAttribute("countries", countries);
    model.addAttribute("merge", new CountryTeamMerge());
    model.addAttribute("countryRenameForm", new CountryRenameForm());

    return "countryManagement";
  }

  @RequestMapping(value = "/manage-countries/merge", method = RequestMethod.POST)
  public String mergeCountries(@ModelAttribute("merge") CountryTeamMerge merge,
                              RedirectAttributes redirectAttributes) {
    countryService.mergeTeams(merge);

    redirectAttributes.addFlashAttribute("message", "Team merge has been completed");

    return "redirect:/admin/manage-countries";
  }

  @RequestMapping(value = "/manage-countries/rename", method = RequestMethod.POST)
  public String renameCountry(@ModelAttribute("countryRenameForm") CountryRenameForm countryRenameForm,
                              RedirectAttributes redirectAttributes) {
    countryService.rename(countryRenameForm.getCountry(),
                          countryRenameForm.getNewName(),
                          countryRenameForm.getNewCode(),
                          PeriodUtils.createFromString(countryRenameForm.getPeriodStr()));

    redirectAttributes.addFlashAttribute("message", "Country has been renamed");

    return "redirect:/admin/manage-countries";
  }

  @RequestMapping(value = "/manage-flags", method = RequestMethod.GET)
  public String manageFlags(Model model) {
    List<Country> countries = countryService.findAll();
    List<CountryWithFlagEntryYears> countriesWithFlagEntryYears = new LinkedList<>();

    for (Country country : countries) {
      countriesWithFlagEntryYears.add(new CountryWithFlagEntryYears(country, ""));
    }

    model.addAttribute(new FlagManagementForm(countriesWithFlagEntryYears));

    return "flagManagement";
  }

  @RequestMapping(value = "/manage-flags", method = RequestMethod.POST)
  public String addFlags(@ModelAttribute("flagManagementForm") FlagManagementForm flagManagementForm,
                         RedirectAttributes redirectAttributes) {

    countryService.addFlags(flagManagementForm.getCountriesWithFlagEntryYears());

    redirectAttributes.addFlashAttribute("message", "Flag entries have been saved");

    return "redirect:/admin/manage-flags";
  }

  @RequestMapping(value = "/manage-cities", method = RequestMethod.GET)
  public String manageCities(Model model) {
    List<Country> countries = countryService.findAll();

    model.addAttribute("countries", countries);

    return "cityManagement";
  }

  @RequestMapping(value = "/manage-cities/country/{countryId}", method = RequestMethod.GET)
  public String reassignCities(@PathVariable("countryId") int countryId, Model model) {
    Country subjectCountry = countryService.findById(countryId);

    List<CityWithNewCountry> citiesWithNewCountries = new LinkedList<>();
    for (City city : subjectCountry.getCurrentCities()) {
      citiesWithNewCountries.add(new CityWithNewCountry(city));
    }

    model.addAttribute("subPage", "cityReassignment");
    model.addAttribute("subjectCountry", subjectCountry);
    model.addAttribute("countries", countryService.findAll());
    model.addAttribute(new CityReassignmentForm(citiesWithNewCountries));

    return "cityManagement";
  }

  @RequestMapping(value = "/manage-cities/country/{countryId}", method = RequestMethod.POST)
  public String doReassignCities(
      @ModelAttribute("cityReassignmentForm") CityReassignmentForm cityReassignmentForm,
      RedirectAttributes redirectAttributes) {
    countryService.reassignCities(cityReassignmentForm.getCitiesWithNewCountries());

    redirectAttributes.addFlashAttribute("message", "Cities have been reassigned");

    return "redirect:/admin/manage-cities";
  }

}
