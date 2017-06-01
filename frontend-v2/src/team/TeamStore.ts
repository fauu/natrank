import { sum } from "lodash";
import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { GlobalStore } from "app/GlobalStore";
import { getNumDaysBetween } from "common/DateUtils";
import { ITeamRecord, Team } from "team/Team";

export class TeamStore {

  @observable
  public isLoading: boolean;

  @observable
  public team: Team;

  constructor(private apiClient: ApiClient, private globalStore: GlobalStore) {}

  @action
  public async loadTeam(name: string) {
    this.isLoading = true;

    const calls: Array<Promise<{} | number[]>> = [
      this.apiClient.getTeamJson(name),
      this.apiClient.getTeamForm(name),
    ];

    const [teamJson, teamForm] = await Promise.all(calls);

    this.handleTeamLoad(teamJson, teamForm as number[]);
  }

  @action
  private handleTeamLoad(json: {}, form: number[]) {
    this.team = Team.fromJson(json);
    this.team.setForm(form);
    for (const type of Team.recordTypes) {
      const record: ITeamRecord = this.team.stats.records[type.name];
      record.numDaysHeld = sum(record.periods.map((p) =>
        getNumDaysBetween(p.start, p.end || this.globalStore.newestRankingDate),
      ));
    }

    this.isLoading = false;
  }

}
