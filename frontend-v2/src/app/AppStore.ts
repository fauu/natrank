// tslint:disable:object-literal-key-quotes
import { action, computed, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { IViewStore } from "common/IViewStore";
import { RankingStore } from "ranking/RankingStore";
import { RankingViewStore } from "ranking/RankingViewStore";
import { ResultsStore } from "results/ResultsStore";
import { ResultsViewStore } from "results/ResultsViewStore";

export type View = "Ranking" | "Results" | "NotFound";

export type ViewStoreContainer = {
  [view in View]: IViewStore | undefined;
};

export class AppStore {

  public apiClient: ApiClient;

  public rankingStore: RankingStore;
  public resultsStore: ResultsStore;
  public viewStores: ViewStoreContainer;

  @observable
  public activeView: View = "Ranking";

  public constructor() {
    this.apiClient = new ApiClient();

    this.rankingStore = new RankingStore(this.apiClient);
    this.resultsStore = new ResultsStore(this.apiClient);

    this.viewStores = {
      "NotFound": undefined,
      "Ranking": new RankingViewStore(this.rankingStore),
      "Results": new ResultsViewStore(this.resultsStore),
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
