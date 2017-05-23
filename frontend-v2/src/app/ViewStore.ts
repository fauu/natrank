import { action, computed, observable, reaction } from "mobx";

import { AppStore } from "app/AppStore";
import {
  areDatesEqual,
  DatePlacement,
  getDatePlacement,
  isDateBetween,
  parseDate,
  stringifyDate,
} from "common/DateUtils";
import { Ranking } from "ranking/Ranking";

export class ViewStore {

  @observable
  public view = "ranking";

  @observable.ref
  public selectedRankingDate: Date = undefined;

  public constructor(private appStore: AppStore) {
    reaction(
      () => this.selectedRankingDate,
      (date) => this.handleSelectedDateChange(date),
    );
  }

  @computed
  public get isLoading(): boolean {
    return this.appStore.isLoading;
  }

  @computed
  public get currentUrl(): string {
    const newestRankingDate = this.appStore.rankingStore.newestRankingDate;
    switch (this.view) {
      case "ranking":
        return (this.selectedRankingDate && !areDatesEqual(this.selectedRankingDate, newestRankingDate))
          ? `/ranking/${stringifyDate(this.selectedRankingDate)}`
          : `/ranking`;
      default:
        return "/404";
    }
  }

  @action.bound
  public handleSelectedDateChange(date: Date) {
    const oldestDate = this.appStore.rankingStore.oldestRankingDate;
    const newestDate = this.appStore.rankingStore.newestRankingDate;

    const datePlacement = getDatePlacement(date, oldestDate, newestDate);

    switch (datePlacement) {
      case DatePlacement.Before:
        this.selectedRankingDate = oldestDate;
        break;
      case DatePlacement.Between:
        if (areDatesEqual(date, newestDate)) {
          this.appStore.rankingStore.loadRanking();
        } else {
          this.appStore.rankingStore.loadRanking(date);
        }
        break;
      case DatePlacement.After:
        this.selectedRankingDate = newestDate;
        break;
    }
  }

  @action.bound
  public showRanking(date?: string) {
    const dateObj = parseDate(date);

    if (dateObj) {
      this.selectedRankingDate = dateObj;
    } else {
      const newestDate = this.appStore.rankingStore.newestRankingDate;
      // FIXME: A hack to force url cleanup
      this.selectedRankingDate = new Date(newestDate.getTime() + 1);
    }
  }

}
