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

package com.github.fauu.natrank.web.converter;

import com.github.fauu.natrank.model.Team;
import com.github.fauu.natrank.service.MatchDataImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.beans.PropertyEditorSupport;

public class TeamPropertyEditor extends PropertyEditorSupport {

    private MatchDataImportService matchDataImportService;

    public TeamPropertyEditor(MatchDataImportService matchDataImportService) {
      this.matchDataImportService = matchDataImportService;
    }

    @Override
    public void setAsText(String text) {
      Team team;

      if (!text.equals("0")) {
        team = matchDataImportService.findTeamById(Integer.parseInt(text));
      } else {
        team = new Team();
      }

      setValue(team);
    }

}
