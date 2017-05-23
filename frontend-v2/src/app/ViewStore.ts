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

export type View = "Ranking" | "Results";

export class ViewStore {

  @observable public view: View = "Ranking";

  @observable public selectedRankingDate: Date;
  @observable public selectedResultsPage: number;

  public constructor(private appStore: AppStore) {
    reaction(
      () => this.selectedRankingDate,
      (date) => this.handleSelectedDateChange(date),
    );
    reaction(
      () => this.selectedResultsPage,
      (page) => this.handleSelectedResultsPageChange(page),
    );
  }

  @computed
  public get isLoading(): boolean {
    switch (this.view) {
      case "Ranking":
        return this.appStore.rankingStore.isLoading;
      case "Results":
        return this.appStore.resultsStore.isLoading;
    }
  }

  @computed
  public get currentUrl(): string {
    const newestRankingDate = this.appStore.rankingStore.newestRankingDate;
    switch (this.view) {
      case "Ranking":
        return (this.selectedRankingDate && !areDatesEqual(this.selectedRankingDate, newestRankingDate))
          ? `/ranking/${stringifyDate(this.selectedRankingDate)}`
          : `/ranking`;
      case "Results":
        return "/results";
      default:
        return "/404";
    }
  }

  @action.bound
  public handleSelectedResultsPageChange(page: number) {
    if (!page) {
      this.selectedResultsPage = 0;
      return;
    }

    this.showResultsPage(page);
  }

  @action.bound
  public showResultsPage(pageNo?: number) {
    this.view = "Results";

    this.appStore.resultsStore.loadMatchPage(pageNo);
  }

  @action.bound
  public handleSelectedDateChange(date: Date) {
    const oldestDate = this.appStore.rankingStore.oldestRankingDate;
    const newestDate = this.appStore.rankingStore.newestRankingDate;

    if (!date) {
      this.selectedRankingDate = newestDate;
      return;
    }

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
  public showRanking(dateStr?: string) {
    this.view = "Ranking";

    const date = parseDate(dateStr);

    if (date) {
      this.selectedRankingDate = date;
    } else {
      const newestDate = this.appStore.rankingStore.newestRankingDate;
      // FIXME: A hack to force url cleanup
      this.selectedRankingDate = new Date(newestDate.getTime() + 1);
    }
  }

}
