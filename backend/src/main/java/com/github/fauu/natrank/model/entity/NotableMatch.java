package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class NotableMatch extends BaseEntity<NotableMatch> {

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  @JsonView(BaseView.class)
  private NotableMatchCategory category;

  @ManyToOne
  @JoinColumn(name = "team_id", nullable = false)
  @JsonIgnore
  private Team team;

  @ManyToOne
  @JoinColumn(name = "match_id", nullable = false)
  @JsonView(BaseView.class)
  private Match match;

}
