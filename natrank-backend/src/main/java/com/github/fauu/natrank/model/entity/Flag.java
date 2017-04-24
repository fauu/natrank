package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"code"}, callSuper = true)
public class Flag extends BaseEntity<Flag> {

  @Column(name = "code", nullable = false)
  @JsonView(BaseView.class)
  private String code;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "period_id", nullable = false)
  @JsonIgnore
  private Period period;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false)
  @JsonIgnore
  private Country country;

  @Override
  public String toString() {
    return code;
  }

}
