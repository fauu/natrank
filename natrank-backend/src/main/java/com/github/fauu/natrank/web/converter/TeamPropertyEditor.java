package com.github.fauu.natrank.web.converter;

import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.service.TeamService;

import java.beans.PropertyEditorSupport;

public class TeamPropertyEditor extends PropertyEditorSupport {

  private TeamService teamService;

  public TeamPropertyEditor(TeamService teamService) {
    this.teamService = teamService;
  }

  @Override
  public void setAsText(String text) {
    Team team;

    if (!text.equals("0")) {
      team = teamService.findById(Integer.parseInt(text));
    } else {
      team = new Team();
    }

    setValue(team);
  }

}
