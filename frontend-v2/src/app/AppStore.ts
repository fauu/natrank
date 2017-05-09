import { paths } from "app/Config";
import { RouterStore } from "app/RouterStore";
import { computed } from "mobx";
import { RankingStore } from "ranking/RankingStore";
import { ResultsStore } from "results/ResultsStore";

export class AppStore {

  private rankingStore: RankingStore;
  private resultsStore: ResultsStore;
  private routerStore: RouterStore;

  @computed
  public get isAnythingLoading(): boolean {
    const baseRoutePath = "/" + this.routerStore.location.pathname.split("/")[1];

    switch (baseRoutePath) {
      case paths.ranking:
        return this.rankingStore.ranking === undefined;
      case paths.results:
        return this.resultsStore.isMatchPageLoading;
      default:
        return false;
    }
  }

  public constructor(routerStore: RouterStore, rankingStore: RankingStore, resultsStore: ResultsStore) {
    this.routerStore = routerStore;
    this.rankingStore = rankingStore;
    this.resultsStore = resultsStore;
  }

}
