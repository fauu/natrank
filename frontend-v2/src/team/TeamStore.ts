import { sum } from "lodash";
import { action, observable } from "mobx";

import { ApiClient } from "api/ApiClient";
import { IRankingJson } from "api/schema/IRankingJson";
import { ITeamJson } from "api/schema/ITeamJson";
import { TeamFormJson } from "api/schema/TeamFormJson";
import { TeamRankHistoryJson } from "api/schema/TeamRankingHistoryJson";
import { GlobalStore } from "app/GlobalStore";
import { Ranking } from "ranking/Ranking";
import { ITeamRecord, Team } from "team/Team";
import { getNumDaysBetween } from "utils/DateUtils";

type TeamData = [
  ITeamJson,
  TeamFormJson,
  TeamRankHistoryJson,
  IRankingJson
];

// TODO: Do this better
type PromisedTeamData = [
  Promise<ITeamJson>,
  Promise<TeamFormJson>,
  Promise<TeamRankHistoryJson>,
  Promise<IRankingJson>
];

export class TeamStore {

  @observable
  public isLoading: boolean;

  @observable
  public team: Team;

  @observable
  public rankingExcerpt?: Ranking;

  constructor(private apiClient: ApiClient, private globalStore: GlobalStore) {}

  @action
  public async fetchData(teamName: string) {
    this.isLoading = true;

    const dataFetchCalls: PromisedTeamData = [
      this.apiClient.fetchTeamJson(teamName),
      this.apiClient.fetchTeamFormJson(teamName),
      this.apiClient.fetchTeamRankHistoryJson(teamName),
      this.apiClient.fetchRankingJson({ teamName }),
    ];

    const data = await Promise.all(dataFetchCalls);

    this.handleFetchedData(data);
  }

  @action
  private handleFetchedData([teamJson, formJson, rankHistoryJson, rankingExcerptJson]: TeamData) {
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

    this.isLoading = false;
  }

}
