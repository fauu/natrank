import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { Page } from "common/Page";
import { Match } from "results/Match";

export class ResultsStore {

  @observable
  public isLoading: boolean = true;
  @observable
  public completedInitialLoad: boolean = false;

  @observable
  public matchPage: Page<Match>;

  constructor(private apiClient: ApiClient) {}

  @action
  public async loadMatchPage(pageNo: number, team?: string, year?: number) {
    this.isLoading = true;

    const matchPageJson = await this.apiClient.getMatchPageJson(pageNo, team, year);
    this.handleMatchPageLoad(matchPageJson);
  }

  @action
  private handleMatchPageLoad(json: {}) {
    this.matchPage = Page.fromJson<Match>(json, Match.fromJson);
    this.completedInitialLoad = true;

    this.isLoading = false;
  }

}
