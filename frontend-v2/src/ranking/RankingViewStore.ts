import { action, computed, observable, reaction } from "mobx";

import { GlobalStore } from "app/GlobalStore";
import {
  areDatesEqual,
  DatePlacement,
  getDatePlacement,
  parseMaybeDate,
  stringifyDate,
} from "common/DateUtils";
import { IViewStore } from "common/IViewStore";
import { RankingStore } from "ranking/RankingStore";

interface IRankingViewParams {
  dateStr?: string;
}

export class RankingViewStore implements IViewStore {

  @observable
  public selectedDate: Date;

  public constructor(private globalStore: GlobalStore, private rankingStore: RankingStore) {
    reaction(
      () => this.selectedDate,
      (date) => this.handleSelectedDateChange(date),
    );
  }

  @computed
  public get isLoading(): boolean {
    return this.rankingStore.isLoading;
  }

  @computed
  public get currentUrl(): string {
    const newestRankingDate = this.globalStore.newestRankingDate;

    return (this.selectedDate && !areDatesEqual(this.selectedDate, newestRankingDate))
      ? `/ranking/${stringifyDate(this.selectedDate)}`
      : "/ranking";
  }

  public showView({ dateStr }: IRankingViewParams) {
    this.selectedDate = parseMaybeDate(dateStr) || this.globalStore.newestRankingDate;
  }

  public handleSelectedDateChange(date: Date) {
    const oldestDate = this.globalStore.oldestRankingDate;
    const newestDate = this.globalStore.newestRankingDate;

    if (!date) {
      this.selectedDate = newestDate;
      return;
    }

    const datePlacement = getDatePlacement(date, oldestDate, newestDate);
    switch (datePlacement) {
      case DatePlacement.Before:
        this.selectedDate = oldestDate;
        break;

      case DatePlacement.Between:
        if (areDatesEqual(date, newestDate)) {
          this.rankingStore.fetchData();
        } else {
          this.rankingStore.fetchData(date);
        }
        break;

      case DatePlacement.After:
        this.selectedDate = newestDate;
        break;
    }
  }

}
