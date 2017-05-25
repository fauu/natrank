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

export type View = "Ranking" | "Results" | "NotFound";

interface IResultsParams {
  page: number;
  team: string | undefined;
  year: number | undefined;
}

interface IRawResultsParams {
  pageStr?: string;
  teamStr?: string;
  yearStr?: string;
}

export class ViewStore {

  @observable
  public view: View = "Ranking";

  @observable
  public selectedRankingDate: Date;

  @observable
  public resultsParams: IResultsParams = {
    page: -1,
    team: undefined,
    year: undefined,
  };

  @computed
  public get totalResultsPages(): number | undefined {
    const matchPage = this.appStore.resultsStore.matchPage;
    return matchPage && matchPage.totalPages;
  }

  public constructor(private appStore: AppStore) {
    reaction(
      () => this.selectedRankingDate,
      (date) => this.handleSelectedDateChange(date),
    );
    // TODO: Do this better if possible
    reaction(
      () => ({ page: this.resultsParams.page, team: this.resultsParams.team, year: this.resultsParams.year }),
      (params) => this.handleResultsParamsChange(params),
    );
    reaction(
      () => this.totalResultsPages,
      (totalPages) => this.handleTotalResultsPagesChange(totalPages),
    );
  }

  @computed
  public get isLoading(): boolean {
    switch (this.view) {
      case "Ranking":
        return this.appStore.rankingStore.isLoading;
      case "Results":
        return this.appStore.resultsStore.isLoading;
      default:
        return false;
    }
  }

  @computed
  public get currentUrl(): string {
    const newestRankingDate = this.appStore.rankingStore.newestRankingDate;
    switch (this.view) {
      case "Ranking":
        return (this.selectedRankingDate && !areDatesEqual(this.selectedRankingDate, newestRankingDate))
          ? `/ranking/${stringifyDate(this.selectedRankingDate)}`
          : "/ranking";

      case "Results":
        const { page, team, year } = this.resultsParams;
        let teamOrYearModifier = "";
        if (team) {
          teamOrYearModifier = `/${team}`;
        } else if (year) {
          teamOrYearModifier = `/year/${year}`;
        }
        const pageModifier = page !== 1 ? `/page/${page}` : "";
        return `/results${teamOrYearModifier}${pageModifier}`;
    }
  }

  @action.bound
  public handleResultsParamsChange({ page, team, year }: IResultsParams) {
    if (page < 1 || page > this.totalResultsPages) {
      this.resultsParams.page = 1;
      return;
    }

    this.appStore.resultsStore.loadMatchPage(page - 1, team, year);
  }

  @action.bound
  public handleTotalResultsPagesChange(totalPages: number | undefined) {
    if (this.resultsParams.page > totalPages) {
      this.resultsParams.page = 1;
    }
  }

  @action.bound
  public showResultsPage({ pageStr, teamStr, yearStr }: IRawResultsParams) {
    this.view = "Results";

    const page = Number(pageStr);
    this.resultsParams.page = (!isNaN(page) && page > 0) ? page : 1;

    this.resultsParams.team = teamStr;

    const year = Number(yearStr);
    this.resultsParams.year = !isNaN(year) ? year : undefined;
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

  @action.bound
  public showNotFoundView() {
    this.view = "NotFound";
  }

}
