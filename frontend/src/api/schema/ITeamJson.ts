import { IRankingEntryJson } from "api/schema/IRankingEntryJson";
import { ITeamCurrentCountryJson } from "api/schema/ITeamCurrentCountryJson";
import { ITeamRecordJson } from "api/schema/ITeamRecordJson";

export interface ITeamJson {
  id: number;
  highestRank: ITeamRecordJson;
  lowestRank: ITeamRecordJson;
  highestRating: ITeamRecordJson;
  lowestRating: ITeamRecordJson;
  latestRankingEntry: IRankingEntryJson;
  currentCountry: ITeamCurrentCountryJson;
}
