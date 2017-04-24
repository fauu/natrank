package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;
import java.time.LocalDate;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"date"}, callSuper = true)
@ToString
public class Ranking extends BaseEntity<Ranking> {

  public static class Views {
    public static class Full extends BaseView { }
  }

  @Column(name = "date", nullable = false)
  @JsonView(BaseView.class)
  private LocalDate date;

  @OneToMany(mappedBy = "ranking", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonView(BaseView.class)
  private List<RankingEntry> entries = new LinkedList<>();

}
