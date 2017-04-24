package com.github.fauu.natrank.model;

import com.github.fauu.natrank.model.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RankedTeam {

  private Team team;
  private int rank;
  private int rating;

}
