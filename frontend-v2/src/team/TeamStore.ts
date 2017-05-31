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

    const json = await this.apiClient.getTeamJson(name);
    this.handleTeamLoad(json);
  }

  @action
  private handleTeamLoad(json: {}) {
    this.team = Team.fromJson(json);

    this.isLoading = false;
  }

}
