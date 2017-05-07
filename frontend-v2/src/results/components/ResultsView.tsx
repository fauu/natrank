import { paths } from "app/Config";
import { RouterStore } from "app/RouterStore";
import { debounce } from "lodash";
import { inject, observer } from "mobx-react";
import * as React from "react";
import * as Spinner from "react-spinner";
import { Result } from "results/components/Result";
import { ResultsPagePicker } from "results/components/ResultsPagePicker";
import { ResultsStore } from "results/ResultsStore";

interface IResultsViewProps {
  routerStore: RouterStore;
  resultsStore: ResultsStore;
  params: { pageNo };
}

@inject("routerStore", "resultsStore")
@observer
export class ResultsView extends React.Component<IResultsViewProps, {}> {

  public componentWillMount() {
    const pathPageNo = this.props.params.pageNo;

    if (pathPageNo && isNaN(pathPageNo)) {
      this.props.routerStore.push(paths.results);
    } else {
      this.props.resultsStore.loadMatchPage(pathPageNo - 1);
    }
  }

  public componentWillUpdate() {
    const pathPageNo = this.props.params.pageNo;

    if (pathPageNo && isNaN(pathPageNo)) {
      this.selectFirstPage();
      return;
    }

    const matchPage = this.props.resultsStore.matchPage;

    if (matchPage) {
      const totalPages = matchPage.totalPages;

      if (pathPageNo < 1 || pathPageNo > totalPages) {
        this.selectFirstPage();
      }
    }
  }

  public selectFirstPage() {
    this.props.routerStore.push(paths.results);
    this.props.resultsStore.loadMatchPage(0);
  }

  public render() {
    const matchPage = this.props.resultsStore.matchPage;
    const isLoading = this.props.resultsStore.isMatchPageLoading;

    const results = matchPage &&
      matchPage.content.map((match) => (
        <Result match={match} key={match.id} />
      ));

    const topPagePicker = matchPage && (
      <ResultsPagePicker
        onChange={debounce(this.handlePageChange, 500)}
        className="results-page-picker results-page-picker--top"
        pageNo={matchPage.no}
        totalPages={matchPage.totalPages}
      />
    );

    const bottomPagePicker = matchPage && (
      <ResultsPagePicker
        onChange={debounce(this.handlePageChange, 500)}
        className="results-page-picker results-page-picker--bottom"
        pageNo={matchPage.no}
        totalPages={matchPage.totalPages}
      />
    );

    const resultList = (
      <div className="result-list">
        {topPagePicker}
        {isLoading ? <Spinner /> : results}
        {!isLoading && bottomPagePicker}
      </div>
    );

    return (
      <div className="page page--results">
        {matchPage ? resultList : <Spinner />}
      </div>
    );
  }

  public handlePageChange = (e: { selected: number }) => {
    this.props.resultsStore.loadMatchPage(e.selected);
    this.props.routerStore.push(`${paths.results}/page/${e.selected + 1}`);
  }

}
