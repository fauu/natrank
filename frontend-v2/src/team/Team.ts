// tslint:disable:object-literal-sort-keys
import { round, sum } from "lodash";

import { TimePeriod } from "common/TimePeriod";
import { TeamResult } from "results/Match";

export type TeamRecordType = "HighestRank" | "LowestRank" | "HighestRating" | "LowestRating";

export interface ITeamRecord {
  value: number;
  periods: TimePeriod[];
  numDaysHeld: number;
}

export type TeamRecords = {
    [recordType in TeamRecordType]: ITeamRecord;
};

export interface ITeamStats {
  matchesTotal: number;
  matchesHomePercentage: number;
  wins: number;
  winPercentage: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  form: TeamResult[] | undefined;
  records: TeamRecords;
}

export class Team {

  public static fromJson(json): Team {
    const team = new Team();

    team.id = json.id;
    team.name = json.currentCountry.name;
    team.code = json.currentCountry.code;

    // TODO: DRY
    const records: TeamRecords = {
      HighestRank: {
        value: json.highestRank.value,
        periods: json.highestRank.periods.map((p) => TimePeriod.fromJson(p)),
        numDaysHeld: -1,
      },
      LowestRank: {
        value: json.lowestRank.value,
        periods: json.lowestRank.periods.map((p) => TimePeriod.fromJson(p)),
        numDaysHeld: -1,
      },
      HighestRating: {
        value: json.highestRating.value,
        periods: json.highestRating.periods.map((p) => TimePeriod.fromJson(p)),
        numDaysHeld: -1,
      },
      LowestRating: {
        value: json.lowestRating.value,
        periods: json.lowestRating.periods.map((p) => TimePeriod.fromJson(p)),
        numDaysHeld: -1,
      },
    };
    const totalLengthInDays = (periods: TimePeriod[]) => sum(periods.map((p) => p.lengthInDays));
    records.HighestRank.numDaysHeld = totalLengthInDays(records.HighestRank.periods);
    records.LowestRank.numDaysHeld = totalLengthInDays(records.LowestRank.periods);
    records.HighestRating.numDaysHeld = totalLengthInDays(records.HighestRating.periods);
    records.LowestRating.numDaysHeld = totalLengthInDays(records.LowestRating.periods);


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
      form: undefined,
      records,
    };

    return team;
  }

  public id: number;
  public name: string;
  public code: string;
  public stats: ITeamStats;

  public setForm(rawForm: number[]) {
    this.stats.form = rawForm.map((e) => this.parseFormEntry(e));
  }

  private parseFormEntry(e: number): TeamResult {
    switch (e) {
      case 1:
        return "Win";
      case 0:
        return "Draw";
      case -1:
        return "Loss";
    }
  }

}
