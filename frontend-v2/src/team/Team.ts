// tslint:disable:object-literal-sort-keys
import { round } from "lodash";

import { TimePeriod } from "common/TimePeriod";
import { IRankingEntryJson } from "ranking/RankingEntry";
import { TeamResult } from "results/Match";

export type TeamRecordTypeName = "HighestRank" | "LowestRank" | "HighestRating" | "LowestRating";

export interface ITeamRecordType {
  name: "HighestRank" | "LowestRank" | "HighestRating" | "LowestRating";
  jsonName: string;
  friendlyName: string;
}

export interface ITeamRecord {
  type: ITeamRecordType;
  value: number;
  periods: TimePeriod[];
  numDaysHeld: number;
}

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
  records: Map<TeamRecordTypeName, ITeamRecord>;
}

export class Team {

  public static readonly recordTypes: ITeamRecordType[] = [
    {
        name: "HighestRank",
        jsonName: "highestRank",
        friendlyName: "Highest rank",
    },
    {
        name: "LowestRank",
        jsonName: "lowestRank",
        friendlyName: "Lowest rank",
    },
    {
        name: "HighestRating",
        jsonName: "highestRating",
        friendlyName: "Highest rating",
    },
    {
        name: "LowestRating",
        jsonName: "lowestRating",
        friendlyName: "Lowest rating",
    },
  ];

  public static fromJson(json): Team {
    const team = new Team();

    team.id = json.id;
    team.name = json.currentCountry.name;
    team.code = json.currentCountry.code;

    const records: Map<TeamRecordTypeName, ITeamRecord> = new Map();
    for (const type of Team.recordTypes) {
      const recordJson = json[type.jsonName];
      if (!recordJson) {
        continue;
      }

      const value = json[type.jsonName].value;
      const periods = json[type.jsonName].periods.map((p) => TimePeriod.fromJson(p));

      records.set(type.name, { type, value, periods, numDaysHeld: -1 });
    }

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

export interface ITeamRecordJson {
  id: number;
  type: string;
  value: number;
  periods: ITimePeriodJson[];
}

export interface ITimePeriodJson {
  id: number;
  fromDate: string;
  toDate: string;
}

export interface ITeamCurrentCountryJson {
  id: number;
  name: string;
  code: string;
}

export interface ITeamJson {
  id: number;
  highestRank: ITeamRecordJson;
  lowestRank: ITeamRecordJson;
  highestRating: ITeamRecordJson;
  lowestRating: ITeamRecordJson;
  latestRankingEntry: IRankingEntryJson;
  currentCountry: ITeamCurrentCountryJson;
}

export type TeamFormData = number[];
