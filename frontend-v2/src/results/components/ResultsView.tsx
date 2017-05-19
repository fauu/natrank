import { paths } from "app/Config";
// import { RouterStore } from "app/RouterStore";
import { FadeTransition } from "common/components/FadeTransition.tsx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ResultListNavigation } from "results/components/ResultListNavigation";
import { ResultsSection } from "results/components/ResultsSection";
import { ResultsStore } from "results/ResultsStore";

interface IResultsViewProps {
  // routerStore: RouterStore;
  resultsStore: ResultsStore;
  params: { pageNo };
}

@inject("routerStore", "resultsStore")
@observer
export class ResultsView extends React.Component<IResultsViewProps, {}> {

  // private routerStore: RouterStore;
  private resultsStore: ResultsStore;

  public componentWillMount() {
    // this.routerStore = this.props.routerStore;
    this.resultsStore = this.props.resultsStore;

    const pathPageNo = this.props.params.pageNo;

    if (pathPageNo && isNaN(pathPageNo)) {
      // this.routerStore.push(paths.results);
    } else {
      this.resultsStore.loadMatchPage(pathPageNo - 1);
    }
  }

  public componentWillUpdate() {
    const pathPageNo = this.props.params.pageNo;

    if (pathPageNo && isNaN(pathPageNo)) {
      this.selectFirstPage();
      return;
    }

    const matchPage = this.resultsStore.matchPage;

    if (matchPage) {
      const totalPages = matchPage.totalPages;

      if (pathPageNo < 1 || pathPageNo > totalPages) {
        this.selectFirstPage();
      }
    }
  }

  public componentWillUnmount() {
    this.resultsStore.clear();
  }

  public selectFirstPage() {
    // this.routerStore.push(paths.results);
    this.resultsStore.loadMatchPage(0);
  }

  public render() {
    const topNavigation =
      <ResultListNavigation position="top" onPageChange={this.handlePageChange} />;

    const resultList = (
      <div className="result-list" key="result-list">
        {this.resultsStore.completedInitialLoad && topNavigation}
        <ResultsSection onPageChange={this.handlePageChange} />
      </div>
    );

    const content = (
      <FadeTransition>
        {this.resultsStore.completedInitialLoad && resultList}
      </FadeTransition>
    );

    return (
      <div className="page page--results">
        {this.resultsStore.completedInitialLoad && content}
      </div>
    );
  }

  public handlePageChange = (e: { selected: number }) => {
    this.resultsStore.loadMatchPage(e.selected);
    // this.routerStore.push(`${paths.results}/page/${e.selected + 1}`);
  }

}
