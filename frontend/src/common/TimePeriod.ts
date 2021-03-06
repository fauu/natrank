import { ITimePeriodJson } from "api/schema/ITimePeriodJson";
import { getNumDaysBetween } from "utils/DateUtils";

export class TimePeriod {

  public static fromJson(json: ITimePeriodJson): TimePeriod {
    const timePeriod = new TimePeriod();

    timePeriod.id = json.id;
    timePeriod.start = new Date(json.fromDate);
    timePeriod.end = json.toDate && new Date(json.toDate);

    return timePeriod;
  }

  public id: number;
  public start: Date | undefined;
  public end: Date | undefined;

}
