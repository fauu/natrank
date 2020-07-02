import { ITimePeriodJson } from "api/schema/ITimePeriodJson";

export interface ITeamRecordJson {
  id: number;
  type: string;
  value: number;
  periods: ITimePeriodJson[];
}
