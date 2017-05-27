import { action, computed, observable, reaction } from "mobx";

import { IViewStore } from "common/IViewStore";

export class TeamViewStore implements IViewStore {

  public constructor() {}

  @computed
  public get isLoading(): boolean {
    return false;
  }

  @computed
  public get currentUrl(): string {
    return "/teams/team-name";
  }

  @action
  public showView() {
    ;
  }

}
