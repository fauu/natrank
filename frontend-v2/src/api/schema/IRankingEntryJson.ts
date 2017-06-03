import { IRankingEntryTeamJson } from "api/schema/IRankingEntryTeamJson";

export interface IRankingEntryJson {
  id?: number;
  rank: number;
  rankOneYearChange?: number;
  rating: number;
  matchesTotal?: number;
  matchesHome?: number;
  matchesAway?: number;
  matchesOnNeutralGround?: number;
  wins?: number;
  losses?: number;
  draws?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
  team?: IRankingEntryTeamJson;
}
