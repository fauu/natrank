package com.github.fauu.natrank.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.model.entity.Country;
import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DynamicRankingEntry implements Comparable<DynamicRankingEntry> {

  @JsonIgnore
  private DynamicRanking ranking;

  @JsonIgnore
  private Team team;

  @Getter(AccessLevel.NONE)
  private TeamInfo teamInfo;

  @JsonView(BaseView.class)
  private int rank;

  @JsonView(BaseView.class)
  private Integer rankOneYearChange;

  @JsonView(BaseView.class)
  private int rating;

  @JsonProperty("team")
  @JsonView(BaseView.class)
  public TeamInfo getTeamInfo() {
    if (teamInfo == null) {
      Country teamCountry = team.getCountryByDate(ranking.getDate());

      TeamInfo teamInfo = new TeamInfo();
      teamInfo.setTeam(team);
      teamInfo.setName(teamCountry.getName());
      teamInfo.setFlag(teamCountry.getFlagByDate(ranking.getDate()));

      this.teamInfo = teamInfo;
    }

    return teamInfo;
  }

  @Override
  public int compareTo(DynamicRankingEntry other) {
    if (this.getRank() == 0 && other.getRank() == 0) {
      return 0;
    } else if (this.getRank() == 0 || other.getRank() == 0) {
      return -1 * Integer.compare(this.getRank(), other.getRank());
    } else {
      return Integer.compare(this.getRank(), other.getRank());
    }
  }

}
