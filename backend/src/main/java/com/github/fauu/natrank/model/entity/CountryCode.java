package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
@Table(name = "util_country_code")
public class CountryCode extends BaseEntity<CountryCode> {

  @Column(name = "country_name", nullable = false)
  @JsonView(BaseView.class)
  private String countryName;

  @Column(name = "code", nullable = false)
  @JsonView(BaseView.class)
  private String code;

}
