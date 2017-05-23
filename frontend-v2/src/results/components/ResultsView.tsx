import { inject, observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { ViewStore } from "app/ViewStore";
import { Result } from "results/components/Result";
import { ResultListNavigation } from "results/components/ResultListNavigation";
import { ResultsStore } from "results/ResultsStore";

interface IResultsViewProps {
  appStore: AppStore;
}

@observer
export class ResultsView extends React.Component<IResultsViewProps, {}> {

  private viewStore: ViewStore;
  private resultsStore: ResultsStore;

  public componentWillMount() {
    this.viewStore = this.props.appStore.viewStore;
    this.resultsStore = this.props.appStore.resultsStore;
  }

  public render() {
    const isLoading = this.resultsStore.isLoading;

    const matchPage = this.resultsStore.matchPage;

    const results = !isLoading &&
      matchPage.content.map((match) => (
        <Result match={match} key={match.id} />
      ));

    const topNavigation = (
      <ResultListNavigation
        appStore={this.props.appStore}
        position="top"
        onPageChange={() => {return}}
      />
    );

    const bottomNavigation = !isLoading && (
      <ResultListNavigation
        appStore={this.props.appStore}
        position="bottom"
        onPageChange={() => {return}}
      />
    );

    const resultList = this.resultsStore.completedInitialLoad && (
      <div className="result-list" key="result-list">
        {topNavigation}
        {results}
        {bottomNavigation}
      </div>
    );

    return (
      <div className="page page--results">
        {resultList}
      </div>
    );
  }

}
