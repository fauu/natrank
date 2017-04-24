package com.github.fauu.natrank.model;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.github.fauu.natrank.model.entity.Flag;
import com.github.fauu.natrank.model.entity.Team;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamInfo {

  @JsonUnwrapped
  @JsonView(BaseView.class)
  private Team team;

  @JsonView(BaseView.class)
  private String name;

  @JsonSerialize(using = ToStringSerializer.class)
  @JsonView(BaseView.class)
  private Flag flag;

}
