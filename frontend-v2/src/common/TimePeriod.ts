import { getNumDaysBetween, parseDate } from "common/DateUtils";

export class TimePeriod {

  public static fromJson(json): TimePeriod {
    const timePeriod = new TimePeriod();

    timePeriod.id = json.id;
    timePeriod.start = parseDate(json.fromDate);
    timePeriod.end = parseDate(json.toDate);

    return timePeriod;
  }

  public id: number;
  public start: Date | undefined;
  public end: Date | undefined;

}
