import { IMatchTeamJson } from "api/schema/IMatchTeamJson";

export interface IMatchJson {
  id: number;
  date: string;
  type: string;
  city: string;
  team1Goals: number;
  team2Goals: number;
  resultExtra: string;
  idWinner: number;
  penaltyShootout: boolean;
  team1Rating: number;
  team2Rating: number;
  team1RatingChange: number;
  team2RatingChange: number;
  team1Rank?: number;
  team2Rank?: number;
  team1RankChange?: number;
  team2RankChange?: number;
  countryFlag: string;
  country: string;
  team1: IMatchTeamJson;
  team2: IMatchTeamJson;
}
