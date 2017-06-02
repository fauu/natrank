import { sum } from "lodash";
import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { GlobalStore } from "app/GlobalStore";
import { getNumDaysBetween } from "common/DateUtils";
import { ITeamJson, ITeamRecord, Team, TeamFormData } from "team/Team";

export class TeamStore {

  @observable
  public isLoading: boolean;

  @observable
  public team: Team;

  constructor(private apiClient: ApiClient, private globalStore: GlobalStore) {}

  @action
  public async loadTeam(name: string) {
    this.isLoading = true;

    const calls: [Promise<ITeamJson>, Promise<TeamFormData>] = [
      this.apiClient.getTeamJson(name),
      this.apiClient.getTeamForm(name),
    ];

    const [teamJson, teamForm] = await Promise.all(calls);

    this.handleTeamLoad(teamJson, teamForm);
  }

  @action
  private handleTeamLoad(json: ITeamJson, form: TeamFormData) {
    this.team = Team.fromJson(json);
    this.team.setForm(form);

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
