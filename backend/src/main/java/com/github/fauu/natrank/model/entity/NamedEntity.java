package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"name"}, callSuper = true)
public abstract class NamedEntity extends BaseEntity<NamedEntity> {

  @Column(name = "name", nullable = false)
  @JsonView(BaseView.class)
  private String name;

  @Override
  public String toString() {
    return this.getName();
  }

}
