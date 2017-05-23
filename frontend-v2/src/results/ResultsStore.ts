import { action, observable } from "mobx";

import { AppStore } from "app/AppStore";
import { Page } from "common/Page";
import { Match } from "results/Match";

export class ResultsStore {

  @observable public isLoading: boolean = true;
  @observable public completedInitialLoad: boolean = false;

  @observable public matchPage: Page<Match>;

  constructor(private appStore: AppStore) {}

  @action
  public loadMatchPage(pageNo: number) {
    this.isLoading = true;

    const matchesJson = this.appStore.apiClient.getMatchesJson(pageNo);
    matchesJson.then((json) => {
      this.handleMatchesLoad(json);
    });
  }

  @action
  public handleMatchesLoad(json: any) {
    const matchesJson = json.content;
    this.matchPage = Page.fromJson<Match>(json, Match.fromJson);
    if (!this.completedInitialLoad) {
      this.completedInitialLoad = true;
    }

    this.isLoading = false;
  }

}
