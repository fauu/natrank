import { map, sum } from "lodash";
import { action, observable } from "mobx";

import { ApiClient } from "api/ApiClient";
import { INotableMatchesJson } from "api/schema/INotableMatchesJson";
import { IRankingJson } from "api/schema/IRankingJson";
import { ITeamJson } from "api/schema/ITeamJson";
import { TeamFormJson } from "api/schema/TeamFormJson";
import { TeamRankHistoryJson } from "api/schema/TeamRankingHistoryJson";
import { GlobalStore } from "app/GlobalStore";
import { Match } from "results/Match";
import { Ranking } from "ranking/Ranking";
import { ITeamNotableMatchCategory } from "team/ITeamNotableMatchCategory";
import { ITeamNotableMatchGroup } from "team/ITeamNotableMatchGroup";
import { ITeamRecord, Team } from "team/Team";
import { getNumDaysBetween } from "utils/DateUtils";

type TeamData = [
  ITeamJson,
  TeamFormJson,
  TeamRankHistoryJson,
  IRankingJson,
  INotableMatchesJson
];

// TODO: Do this better
type PromisedTeamData = [
  Promise<ITeamJson>,
  Promise<TeamFormJson>,
  Promise<TeamRankHistoryJson>,
  Promise<IRankingJson>,
  Promise<INotableMatchesJson>
];

export class TeamStore {

  public static readonly notableMatchCategories: Map<number, ITeamNotableMatchCategory> = new Map([
    [1, { id: 1, name: "First international" }],
    [2, { id: 2, name: "Biggest victory" }],
    [3, { id: 3, name: "Biggest defeat" }],
    [4, { id: 4, name: "Biggest upset" }],
    [5, { id: 5, name: "Biggest blunder" }],
  ]);

  @observable
  public isLoading: boolean;

  @observable.ref
  public team: Team;

  @observable.ref
  public rankingExcerpt?: Ranking;

  @observable.ref
  public notableMatches: ITeamNotableMatchGroup[];

  constructor(private apiClient: ApiClient, private globalStore: GlobalStore) {}

  @action
  public async fetchData(teamName: string) {
    this.isLoading = true;

    const dataFetchCalls: PromisedTeamData = [
      this.apiClient.fetchTeamJson(teamName),
      this.apiClient.fetchTeamFormJson(teamName),
      this.apiClient.fetchTeamRankHistoryJson(teamName),
      this.apiClient.fetchRankingJson({ teamName }),
      this.apiClient.fetchTeamNotableMatches(teamName),
    ];

    const data = await Promise.all(dataFetchCalls);

    this.handleFetchedData(data);
  }

  @action
  private handleFetchedData([teamJson, formJson, rankHistoryJson, rankingExcerptJson, notableMatchesJson]: TeamData) {
    this.team = Team.fromJson(teamJson);
    this.team.setForm(formJson);
    this.team.setRankHistory(rankHistoryJson);
    if (this.team.records.size > 0) {
      for (const type of Team.recordTypes) {
        const record: ITeamRecord = this.team.records.get(type.name);
        record.numDaysHeld = sum(record.periods.map((p) =>
          getNumDaysBetween(p.start, p.end || this.globalStore.newestRankingDate),
        ));
      }
    }

    this.rankingExcerpt = rankingExcerptJson && Ranking.fromJson(rankingExcerptJson);

    this.notableMatches = map(notableMatchesJson, (matchesJson, categoryId) => {
      return {
        category: TeamStore.notableMatchCategories.get(Number(categoryId)),
        matches: matchesJson.map((json) => Match.fromJson(json)),
      };
    });

    this.isLoading = false;
  }

}
