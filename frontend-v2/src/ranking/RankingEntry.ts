import { v4 as uuid } from "uuid";

export class RankingEntry {

  public static fromJson(json: IRankingEntryJson) {
    const rankingEntry = new RankingEntry();

    rankingEntry.teamId = json.team.id;
    rankingEntry.teamName = json.team.name;
    rankingEntry.teamFlag = json.team.flag;
    rankingEntry.rank = json.rank;
    rankingEntry.rankOneYearChange = json.rankOneYearChange;
    rankingEntry.rating = json.rating;
    rankingEntry.matchesTotal = json.matchesTotal;
    rankingEntry.wins = json.wins;
    rankingEntry.draws = json.draws;
    rankingEntry.losses = json.losses;
    rankingEntry.goalsFor = json.goalsFor;
    rankingEntry.goalsAgainst = json.goalsAgainst;
    rankingEntry.goalDifference = json.goalDifference;

    return rankingEntry;
  }

  public id: string = uuid();
  public teamId: number;
  public teamName: string;
  public teamFlag: string;
  public rank: number;
  public rankOneYearChange: number;
  public rating: number;
  public matchesTotal?: number;
  public wins?: number;
  public draws?: number;
  public losses?: number;
  public goalsFor?: number;
  public goalsAgainst?: number;
  public goalDifference?: number;

}

export interface IRankingEntryTeamJson {
  id: number;
  name: string;
  flag: string;
}

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
