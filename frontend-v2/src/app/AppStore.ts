import { ApiClient } from "app/ApiClient";
import { paths } from "app/Config";
import { ViewStore } from "app/ViewStore";
import { computed } from "mobx";
import { RankingStore } from "ranking/RankingStore";
import { ResultsStore } from "results/ResultsStore";

export class AppStore {

  public apiClient: ApiClient;
  public rankingStore: RankingStore;
  public viewStore: ViewStore;

  public get isLoading(): boolean {
    return this.rankingStore.isLoading;
  }

  public constructor() {
    this.apiClient = new ApiClient();
    this.rankingStore = new RankingStore(this);
    this.viewStore = new ViewStore(this);
  }

}
