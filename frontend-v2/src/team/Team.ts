import { round } from "lodash";

import { ITeamJson } from "api/schema/ITeamJson";
import { TeamFormJson } from "api/schema/TeamFormJson";
import { TeamRankHistoryJson, TeamRatingHistoryJson, TeamRankingHistoryJson } from "api/schema/TeamRankingHistoryJson";
import { TimePeriod } from "common/TimePeriod";
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
}

export type TeamRankingHistoryEntry = [number, number];

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

  public static fromJson(json: ITeamJson): Team {
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
      form: undefined,
    };

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
    team.records = records;

    return team;
  }

  public id: number;
  public name: string;
  public code: string;
  public stats: ITeamStats;
  public records: Map<TeamRecordTypeName, ITeamRecord>;
  public rankHistory: TeamRankingHistoryEntry[];
  public ratingHistory: TeamRankingHistoryEntry[];

  public setForm(data: TeamFormJson) {
    this.stats.form = data.map((e) => this.parseFormEntry(e));
  }

  public setRankHistory(data: TeamRankHistoryJson) {
    this.rankHistory = this.rankingHistoryFromData(data);
  }

  public setRatingHistory(data: TeamRatingHistoryJson) {
    this.ratingHistory = this.rankingHistoryFromData(data);
  }

  private rankingHistoryFromData(data: TeamRankingHistoryJson): TeamRankingHistoryEntry[] {
    return data.map((e) => [Date.parse(e.date), e.value] as TeamRankingHistoryEntry);
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
