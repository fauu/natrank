import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { Team } from "team/Team";

export class TeamStore {

  @observable
  public isLoading: boolean;

  @observable
  public team: Team;

  constructor(private apiClient: ApiClient) {}

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

    this.isLoading = false;
  }

}
