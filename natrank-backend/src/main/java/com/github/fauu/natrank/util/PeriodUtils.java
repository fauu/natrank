package com.github.fauu.natrank.util;

import com.github.fauu.natrank.model.entity.Period;
import java.time.LocalDate;

public final class PeriodUtils {

  private PeriodUtils() { }

  public static Period createFromString(String periodStr) {
    Period period = new Period();

    // TODO: Perhaps refactor this to use regex (and also some proper error checking)
    if (periodStr.length() == 11) {
      boolean rightBounded = false;

      if (periodStr.charAt(0) == '-') {
        periodStr = periodStr.substring(1, 11);

        rightBounded = true;
      } else if (periodStr.charAt(10) == '-') {
        periodStr = periodStr.substring(0, 10);
      } else {
        return null;
      }

      String[] periodStrParts = periodStr.split("-");

      LocalDate date = LocalDate.of(Integer.parseInt(periodStrParts[0]),
                                     Integer.parseInt(periodStrParts[1]),
                                     Integer.parseInt(periodStrParts[2]));

      if (rightBounded) {
        period.setToDate(date);
      } else {
        period.setFromDate(date);
      }
    } else if (periodStr.length() == 21) {
      // FIXME: DRY!
      String[] periodStrParts = periodStr.split("-");

      LocalDate fromDate = LocalDate.of(Integer.parseInt(periodStrParts[0]),
                                         Integer.parseInt(periodStrParts[1]),
                                         Integer.parseInt(periodStrParts[2]));

      LocalDate toDate = LocalDate.of(Integer.parseInt(periodStrParts[3]),
                                       Integer.parseInt(periodStrParts[4]),
                                       Integer.parseInt(periodStrParts[5]));

      period.setFromDate(fromDate);
      period.setToDate(toDate);
    } else {
      return null;
    }

    return period;
  }

}
