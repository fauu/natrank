import { action, computed, observable, reaction } from "mobx";

import { IViewStore } from "app/IViewStore";
import {
  areDatesEqual,
  DatePlacement,
  getDatePlacement,
  parseDate,
  stringifyDate,
} from "common/DateUtils";
import { RankingStore } from "ranking/RankingStore";

interface IRankingViewParams {
  dateStr?: string;
}

export class RankingViewStore implements IViewStore {

  @observable
  public selectedDate: Date;

  public constructor(private rankingStore: RankingStore) {
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
    const newestRankingDate = this.rankingStore.newestRankingDate;

    return (this.selectedDate && !areDatesEqual(this.selectedDate, newestRankingDate))
      ? `/ranking/${stringifyDate(this.selectedDate)}`
      : "/ranking";
  }

  public showView({ dateStr }: IRankingViewParams) {
    this.selectedDate = parseDate(dateStr) || this.rankingStore.newestRankingDate;
  }

  public handleSelectedDateChange(date: Date) {
    const oldestDate = this.rankingStore.oldestRankingDate;
    const newestDate = this.rankingStore.newestRankingDate;

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
          this.rankingStore.loadRanking();
        } else {
          this.rankingStore.loadRanking(date);
        }
        break;

      case DatePlacement.After:
        this.selectedDate = newestDate;
        break;
    }
  }

}
