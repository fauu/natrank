import { sum } from "lodash";
import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { GlobalStore } from "app/GlobalStore";
import { getNumDaysBetween } from "common/DateUtils";
import { ITeamJson, ITeamRecord, Team, TeamFormData, TeamRankHistoryData, TeamRatingHistoryData } from "team/Team";

type TeamData = [
  ITeamJson,
  TeamFormData,
  TeamRankHistoryData,
  TeamRatingHistoryData
];

// TODO: Do this better
type PromisedTeamData = [
  Promise<ITeamJson>,
  Promise<TeamFormData>,
  Promise<TeamRankHistoryData>,
  Promise<TeamRatingHistoryData>
];

export class TeamStore {

  @observable
  public isLoading: boolean;

  @observable
  public team: Team;

  constructor(private apiClient: ApiClient, private globalStore: GlobalStore) {}

  @action
  public async loadTeam(name: string) {
    this.isLoading = true;

    const dataFetchCalls: PromisedTeamData = [
      this.apiClient.getTeamJson(name),
      this.apiClient.getTeamFormData(name),
      this.apiClient.getTeamRankHistoryData(name),
      this.apiClient.getTeamRatingHistoryData(name),
    ];

    const data = await Promise.all(dataFetchCalls);

    this.handleTeamLoad(data);
  }

  @action
  private handleTeamLoad([json, formData, rankHistoryData, ratingHistoryData]: TeamData) {
    this.team = Team.fromJson(json);
    this.team.setForm(formData);
    this.team.setRankHistory(rankHistoryData);
    this.team.setRatingHistory(ratingHistoryData);

    console.log(this.team.rankHistory);
    console.log(this.team.ratingHistory);

    if (this.team.stats.records.size > 0) {
      for (const type of Team.recordTypes) {
        const record: ITeamRecord = this.team.stats.records.get(type.name);
        record.numDaysHeld = sum(record.periods.map((p) =>
          getNumDaysBetween(p.start, p.end || this.globalStore.newestRankingDate),
        ));
      }
    }

    this.isLoading = false;
  }

}
