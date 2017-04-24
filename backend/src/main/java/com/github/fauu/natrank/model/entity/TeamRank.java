package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;
import java.time.LocalDate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class TeamRank extends BaseEntity<TeamRank> {

  public static class Views {
    public static class Default extends BaseView { }
  }

  @Column(name = "date", nullable = false)
  @JsonView(BaseView.class)
  private LocalDate date;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "team_id", nullable = false)
  @JsonIgnore
  private Team team;

  @Column(name = "rank", nullable = false)
  @JsonView(BaseView.class)
  private int value;

  @Column(name = "change")
  @JsonView(Views.Default.class)
  private Integer change;

}
