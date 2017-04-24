package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class Period extends BaseEntity<Period> {

  public enum Type {
    INFINITE, LEFT_BOUNDED, RIGHT_BOUNDED, LEFT_AND_RIGHT_BOUNDED
  }

  @Column(name = "date_from", nullable = false)
  @JsonView(BaseView.class)
  private LocalDate fromDate;

  @Column(name = "date_to")
  @JsonView(BaseView.class)
  private LocalDate toDate;

  public boolean includesDate(LocalDate date) {
    return (!date.isBefore(fromDate) && (toDate == null || !date.isAfter(toDate)));
  }

  @JsonIgnore
  public Type getType() {
    if (fromDate == null && toDate == null) {
      return Type.INFINITE;
    } else if (fromDate != null && toDate == null) {
      return Type.LEFT_BOUNDED;
    } else if (fromDate == null && toDate != null) {
      return Type.RIGHT_BOUNDED;
    } else {
      return Type.LEFT_AND_RIGHT_BOUNDED;
    }
  }

}
