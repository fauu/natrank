import { getNumDaysBetween } from "common/DateUtils";

export class TimePeriod {

  public static fromJson(json): TimePeriod {
    const timePeriod = new TimePeriod();

    timePeriod.id = json.id;
    timePeriod.start = new Date(json.fromDate);
    timePeriod.end = new Date(json.toDate);

    return timePeriod;
  }

  public id: number;
  public start: Date | undefined;
  public end: Date | undefined;

}
