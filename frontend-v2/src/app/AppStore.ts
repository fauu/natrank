import { ApiClient } from "app/ApiClient";
import { ViewStore } from "app/ViewStore";
import { computed } from "mobx";
import { RankingStore } from "ranking/RankingStore";
import { ResultsStore } from "results/ResultsStore";

export class AppStore {

  public apiClient: ApiClient;

  public viewStore: ViewStore;
  public rankingStore: RankingStore;
  public resultsStore: ResultsStore;

  public get isLoading(): boolean {
    return this.rankingStore.isLoading || this.resultsStore.isLoading;
  }

  public constructor() {
    this.apiClient = new ApiClient();

    this.resultsStore = new ResultsStore(this);
    this.rankingStore = new RankingStore(this);
    this.viewStore = new ViewStore(this);
  }

}
