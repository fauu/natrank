import { scrollToTop } from "common/WindowUtils";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { Result } from "results/components/Result";
import { ResultListNavigation } from "results/components/ResultListNavigation";
import { ResultsStore } from "results/ResultsStore";

interface IResultsSectionProps {
  resultsStore?: ResultsStore;
  onPageChange;
}

@inject("resultsStore")
@observer
export class ResultsSection extends React.Component<IResultsSectionProps, {}> {

  private resultsStore: ResultsStore;

  public componentWillMount() {
    this.resultsStore = this.props.resultsStore;
  }

  public render() {
    const matchPage = this.resultsStore.matchPage;
    const isLoading = this.resultsStore.isMatchPageLoading;

    const results =
      matchPage.content.map((match) => (
        <Result match={match} key={match.id} />
      ));

    const bottomNavigation =
      <ResultListNavigation position="bottom" onPageChange={this.handlePageChange} />;

    const content = (
      <div key="results-section">
        {results}
        {bottomNavigation}
      </div>
    );

    return (
        !isLoading && content
    );
  }

  public handlePageChange = (e) => {
    scrollToTop();
    this.props.onPageChange(e);
  }

}
