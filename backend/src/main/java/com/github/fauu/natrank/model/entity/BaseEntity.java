package com.github.fauu.natrank.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.*;

import javax.persistence.*;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
@ToString
public abstract class BaseEntity<T extends BaseEntity<T>> implements Comparable<T> {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonView(BaseView.class)
  protected Integer id;

  @JsonIgnore
  public boolean isNew() {
    return (this.id == null);
  }

  @Override
  public int compareTo(T other) {
    return Integer.compare(this.getId(), other.getId());
  }

}
