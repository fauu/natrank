import { paths } from "app/Config";
import { RouterStore } from "app/RouterStore";
import { Icon } from "common/components/Icon";
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

    const topNavigation = matchPage && (
      <div className="result-list-navigation result-list-navigation--top">
        <ResultsPagePicker
          onChange={debounce(this.handlePageChange, 500)}
          className="results-page-picker results-page-picker--top"
          pageNo={matchPage.no}
          totalPages={matchPage.totalPages}
        />
        <a className="page-navigation-link" onClick={this.handleGoToBottomClick}>
          Go to bottom
          <Icon name="chevron-down" className="page-navigation-link__icon" />
        </a>
      </div>
    );

    const bottomNavigation = matchPage && (
      <div className="result-list-navigation result-list-navigation--bottom">
        <ResultsPagePicker
          onChange={debounce(this.handlePageChange, 500)}
          className="results-page-picker results-page-picker--bottom"
          pageNo={matchPage.no}
          totalPages={matchPage.totalPages}
        />
        <a className="page-navigation-link" onClick={this.handleGoToTopClick}>
          Go to top
          <Icon name="chevron-up" className="page-navigation-link__icon" />
        </a>
      </div>
    );

    const resultList = (
      <div className="result-list">
        {topNavigation}
        {isLoading ? <Spinner /> : results}
        {!isLoading && bottomNavigation}
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

  private handleGoToBottomClick = () => {
    window.scroll(0, document.body.scrollHeight);
  }

  private handleGoToTopClick = () => {
    window.scroll(0, 0);
  }

}
