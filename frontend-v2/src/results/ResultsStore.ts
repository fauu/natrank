import { action, observable } from "mobx";

import { AppStore } from "app/AppStore";
import { Page } from "common/Page";
import { Match } from "results/Match";

export class ResultsStore {

  @observable
  public isLoading: boolean = true;
  @observable
  public completedInitialLoad: boolean = false;

  @observable
  public matchPage: Page<Match>;

  constructor(private appStore: AppStore) {}

  @action
  public loadMatchPage(pageNo: number, team?: string, year?: number) {
    this.isLoading = true;

    const matchPageJson = this.appStore.apiClient.getMatchPageJson(pageNo, team, year);
    matchPageJson.then((json) => {
      this.handleMatchPagesLoad(json);
    });
  }

  @action
  public handleMatchPagesLoad(json: any) {
    const matchesJson = json.content;
    this.matchPage = Page.fromJson<Match>(json, Match.fromJson);
    if (!this.completedInitialLoad) {
      this.completedInitialLoad = true;
    }

    this.isLoading = false;
  }

}
