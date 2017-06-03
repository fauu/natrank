import { action, computed, observable, reaction } from "mobx";

import { IViewStore } from "common/IViewStore";
import { TeamStore } from "team/TeamStore";
import { urlfriendlifyString } from "utils/StringUtils";

interface ITeamViewParams {
  teamStr?: string;
}

export class TeamViewStore implements IViewStore {

  constructor(private teamStore: TeamStore) {}

  @computed
  public get isLoading(): boolean {
    return this.teamStore.isLoading;
  }

  @computed
  public get currentUrl(): string {
    // const team = this.teamStore.team;

    // return team ? `/teams/${urlfriendlifyString(this.teamStore.team.name)}` : "/teams";
    return "";
  }

  @action
  public showView({ teamStr }: ITeamViewParams) {
    this.teamStore.fetchData(teamStr);
  }

}
