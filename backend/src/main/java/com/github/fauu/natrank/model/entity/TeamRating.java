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
@EqualsAndHashCode(exclude = {"match"}, callSuper = true)
@ToString
public class TeamRating extends BaseEntity<TeamRating> {

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

  @ManyToOne
  @JoinColumn(name = "match_id")
  @JsonIgnore
  private Match match;

  @Column(name = "rating", nullable = false)
  @JsonView(BaseView.class)
  private int value;

  @Column(name = "change", nullable = false)
  @JsonView(Views.Default.class)
  private int change;

  @Column(name = "provisional", nullable = false)
  @JsonIgnore
  private boolean provisional = false;

}
