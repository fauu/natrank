import { observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { Result } from "results/components/Result";
import { ResultList } from "results/components/ResultList";
import { ResultListNavigation } from "results/components/ResultListNavigation";
import { ResultsStore } from "results/ResultsStore";
import { ResultsViewStore } from "results/ResultsViewStore";

interface IResultsViewProps {
  readonly resultsStore: ResultsStore;
  readonly viewStore: ResultsViewStore;
}

function ResultsView({ resultsStore, viewStore }: IResultsViewProps): JSX.Element {
  const { completedInitialLoad, isLoading } = resultsStore;

  let content;
  if (completedInitialLoad) {
    const matchPage = resultsStore.matchPage;
    const results = resultsStore.matchPage.content;
    const totalPages = resultsStore.matchPage.totalPages;
    const isListShort = results.length <= 10;

    const topNavigation =
      <ResultListNavigation viewStore={viewStore} position="top" goToLinkVisible={!isListShort} />;
    const bottomNavigation =
      <ResultListNavigation viewStore={viewStore} position="bottom" goToLinkVisible={!isListShort} />;

    let resultListOrEmptyMessage;
    if (totalPages > 0) {
      resultListOrEmptyMessage = <ResultList results={results} />;
    } else {
      resultListOrEmptyMessage = <span>The result list for specified criteria is empty.</span>;
    }

    content = (
      <div className="result-list-panel">
        {topNavigation}
        {resultListOrEmptyMessage}
        {(totalPages > 0 && !isListShort) && bottomNavigation}
      </div>
    );
  }

  return (
    <div className="view view--results">
      {content}
    </div>
  );
}

const resultsView = observer(ResultsView);
export { resultsView as ResultsView };
