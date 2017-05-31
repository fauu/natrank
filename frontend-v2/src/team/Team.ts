// tslint:disable:object-literal-sort-keys
import { round } from "lodash";

export interface ITeamStats {
  matchesTotal: number;
  matchesHomePercentage: number;
  wins: number;
  winPercentage: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export class Team {

  public static fromJson(json): Team {
    const team = new Team();

    team.id = json.id;
    team.name = json.currentCountry.name;
    team.code = json.currentCountry.code;

    const latestRankingEntry = json.latestRankingEntry;
    team.stats = {
      matchesTotal: latestRankingEntry.matchesTotal,
      matchesHomePercentage: round((latestRankingEntry.matchesHome / latestRankingEntry.matchesTotal) * 100, 0),
      wins: latestRankingEntry.wins,
      winPercentage: round((latestRankingEntry.wins / latestRankingEntry.matchesTotal) * 100, 0),
      draws: latestRankingEntry.draws,
      losses: latestRankingEntry.losses,
      goalsFor: latestRankingEntry.goalsFor,
      goalsAgainst: latestRankingEntry.goalsAgainst,
    };

    return team;
  }

  public id: number;
  public name: string;
  public code: string;
  public stats: ITeamStats;

}
