import { action, computed, observable } from "mobx";
import { AppStore } from "../app/AppStore";
import { Ranking } from "../ranking/Ranking";

export class ViewStore {

  @observable
  public view = "ranking";

  @observable
  public selectedRankingDate: Date;

  private appStore: AppStore;

  @computed
  public get isLoading() {
    return this.appStore.isLoading;
  }

  @computed
  public get selectedRanking(): Ranking {
    if (!this.isLoading) {
      return this.appStore.rankingStore.ranking;
    } else {
      return undefined;
    }
  }

  @computed
  public get newestRankingDate(): Date {
    return this.appStore.rankingStore.newestRankingDate;
  }

  @computed
  public get latestRankingDate(): Date {
    return this.appStore.rankingStore.latestRankingDate;
  }

  @computed
  public get currentUrl() {
    switch (this.view) {
      case "ranking":
        return "/ranking";
      case "ranking-historical":
        return "/ranking/datehere";
      default:
        return "/404";
    }
  }

  public constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  @action.bound
  public showRankingView() {
    this.view = "ranking";
    this.selectedRankingDate = undefined;
  }

  @action.bound
  public showHistoricalRankingView(date: Date) {
    this.view = "ranking-historical";
    this.selectedRankingDate = date;
    this.appStore.rankingStore.getHistoricalRanking(date);
  }

}
