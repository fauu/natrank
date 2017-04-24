package com.github.fauu.natrank.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.github.fauu.natrank.web.json.BaseView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DynamicRanking {

  @JsonView(BaseView.class)
  private LocalDate date;

  @JsonView(BaseView.class)
  private boolean fullVariantAvailable;

  @JsonView(BaseView.class)
  private List<DynamicRankingEntry> entries;

}
