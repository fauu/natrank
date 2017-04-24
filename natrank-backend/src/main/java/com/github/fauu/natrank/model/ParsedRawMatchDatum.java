package com.github.fauu.natrank.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@ToString
public class ParsedRawMatchDatum {

  private LocalDate date;
  private String type;
  private String city;
  private String team1;
  private String team2;
  private String result;

}
