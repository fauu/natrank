import { action, computed, observable } from "mobx";

import { ApiClient } from "api/ApiClient";
import { GlobalStore } from "app/GlobalStore";
import { IViewStore } from "common/IViewStore";
import { RankingStore } from "ranking/RankingStore";
import { RankingViewStore } from "ranking/RankingViewStore";
import { ResultsStore } from "results/ResultsStore";
import { ResultsViewStore } from "results/ResultsViewStore";
import { TeamStore } from "team/TeamStore";
import { TeamViewStore } from "team/TeamViewStore";

export type View = "Ranking" | "Results" | "Team" | "NotFound";

export type ViewStoreContainer = {
  [view in View]: IViewStore | undefined;
};

export class AppStore {

  public apiClient: ApiClient;

  public globalStore: GlobalStore;
  public rankingStore: RankingStore;
  public resultsStore: ResultsStore;
  public teamStore: TeamStore;
  public viewStores: ViewStoreContainer;

  @observable
  public activeView: View = "Ranking";

  public constructor() {
    this.apiClient = new ApiClient();

    this.globalStore = new GlobalStore();
    this.rankingStore = new RankingStore(this.apiClient);
    this.resultsStore = new ResultsStore(this.apiClient);
    this.teamStore = new TeamStore(this.apiClient, this.globalStore);

    this.viewStores = {
      NotFound: undefined,
      Ranking: new RankingViewStore(this.globalStore, this.rankingStore),
      Results: new ResultsViewStore(this.resultsStore),
      Team: new TeamViewStore(this.teamStore),
    };
  }

  @computed
  public get currentUrl(): string {
    const viewStore = this.viewStores[this.activeView];
    if (viewStore) {
      return viewStore.currentUrl;
    }

    return "";
  }

  @computed
  public get isLoading(): boolean {
    const viewStore = this.viewStores[this.activeView];
    if (viewStore) {
      return viewStore.isLoading;
    }

    return false;
  }

  @action
  public showView(view: View, params: any = {}) {
    this.activeView = view;

    const viewStore = this.viewStores[view];
    if (viewStore) {
      viewStore.showView(params);
    }
  }

}
