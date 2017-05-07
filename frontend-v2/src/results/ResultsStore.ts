import { ApiClient } from "app/ApiClient";
import { Page } from "common/Page";
import { action, observable } from "mobx";
import { Match } from "results/Match";

export class ResultsStore {

  @observable public matchPage: Page<Match>;
  @observable public isMatchPageLoading: boolean;

  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  @action
  public loadMatchPage(pageNo: number) {
    this.isMatchPageLoading = true;

    const matchesJson = this.apiClient.getMatchesJson(pageNo);
    matchesJson.then((json) => {
      this.handleMatchesLoad(json);
    });
  }

  @action
  public handleMatchesLoad(json: any, date?: Date) {
    const matchesJson = json.content;
    this.matchPage = Page.fromJson<Match>(json, Match.fromJson);

    this.isMatchPageLoading = false;
  }

  @action
  public clear() {
    this.matchPage = undefined;
    this.isMatchPageLoading = false;
  }

}
