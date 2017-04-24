package com.github.fauu.natrank.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchDataError {

  private int lineNo;
  private String line;
  private Type type;

  public enum Type {
    ERROR_INCORRECT_LINE_FORMAT, ERROR_MISSING_FIELD, ERROR_INCORRECT_DATE_FORMAT;
  }

}
