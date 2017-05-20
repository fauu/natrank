import { AppStore } from "app/AppStore";
import { parseDate, stringifyDate } from "common/DateUtils";
import { action, computed, observable } from "mobx";
import { Ranking } from "ranking/Ranking";

export class ViewStore {

  @observable
  public view = "ranking";

  @observable
  public selectedRankingDate: Date;

  private appStore: AppStore;

  public constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  @computed
  public get isLoading() {
    return this.appStore.isLoading;
  }

  @computed
  public get currentUrl() {
    switch (this.view) {
      case "ranking":
        return (
          this.selectedRankingDate
          ? `/ranking/${stringifyDate(this.selectedRankingDate)}`
          : `/ranking`
        );

      default:
        return "/404";
    }
  }

  @action.bound
  public showRanking(date?: Date | string) {
    this.view = "ranking";

    const dateObj = date && ((typeof date === "string") ? parseDate(date) : new Date(date));
    this.selectedRankingDate = dateObj;
    this.appStore.rankingStore.loadRanking(dateObj);
  }

}
