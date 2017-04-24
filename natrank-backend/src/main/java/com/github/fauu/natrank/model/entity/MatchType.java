package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"fifaName"}, callSuper = true)
public class MatchType extends NamedEntity {

  @Column(name = "fifa_name")
  @JsonIgnore
  private String fifaName;

  @Column(name = "weight")
  @JsonIgnore
  private Integer weight;

  @OneToMany(mappedBy = "type", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Match> matches;

  @Override
  public String toString() {
    return super.toString();
  }

}
