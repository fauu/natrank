import { action, computed, observable, reaction } from "mobx";

import { IViewStore } from "app/IViewStore";
import { ResultsStore } from "results/ResultsStore";

interface IResultsViewState {
  page: number;
  team?: string;
  year?: number;
}

interface IResultsViewParams {
  pageStr?: string;
  teamStr?: string;
  yearStr?: string;
}

export class ResultsViewStore implements IViewStore {

  @observable
  public state: IResultsViewState = {
    page: -1,
    team: undefined,
    year: undefined,
  };

  public constructor(private resultsStore: ResultsStore) {
    // TODO: Simplify this if possible
    reaction(
      () => ({ page: this.state.page, team: this.state.team, year: this.state.year }),
      (state) => this.handleStateChange(state),
    );
    reaction(
      () => this.totalResultsPages,
      (totalPages) => this.handleTotalResultsPagesChange(totalPages),
    );
  }

  @computed
  public get isLoading(): boolean {
    return this.resultsStore.isLoading;
  }

  @computed
  public get currentUrl(): string {
      const { page, team, year } = this.state;

      const teamOrYearModifier = team ? `/${team}` : (year ? `/year/${year}` : "");
      const pageModifier = page !== 1 ? `/page/${page}` : "";
      return `/results${teamOrYearModifier}${pageModifier}`;
  }

  @computed
  public get totalResultsPages(): number | undefined {
    const matchPage = this.resultsStore.matchPage;
    return matchPage && matchPage.totalPages;
  }

  @action
  public showView({ pageStr, teamStr, yearStr }: IResultsViewParams) {
    const page = Number(pageStr);
    this.state.page = (!isNaN(page) && page > 0) ? page : 1;

    this.state.team = teamStr;

    const year = Number(yearStr);
    this.state.year = !isNaN(year) ? year : undefined;
  }

  @action
  public handleStateChange({ page, team, year }: IResultsViewState) {
    if (page < 1 || page > this.totalResultsPages) {
      this.state.page = 1;
      return;
    }

    this.resultsStore.loadMatchPage(page - 1, team, year);
  }

  @action
  public handleTotalResultsPagesChange(totalPages: number | undefined) {
    if (this.state.page > totalPages) {
      this.state.page = 1;
    }
  }

}
