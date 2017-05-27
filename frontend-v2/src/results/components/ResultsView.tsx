import { observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { Result } from "results/components/Result";
import { ResultListNavigation } from "results/components/ResultListNavigation";
import { ResultsStore } from "results/ResultsStore";
import { ResultsViewStore } from "results/ResultsViewStore";

interface IResultsViewProps {
  readonly resultsStore: ResultsStore;
  readonly viewStore: ResultsViewStore;
}

function ResultsView({ resultsStore, viewStore }: IResultsViewProps): JSX.Element {
  const isLoading = resultsStore.isLoading;
  const matchPage = resultsStore.matchPage;

  const results = !isLoading &&
    matchPage.content.map((match) => (
      <Result match={match} key={match.id} />
    ));

  const bottomNavigation = (!isLoading && results.length > 10) && (
    <ResultListNavigation viewStore={viewStore} position="bottom" showPageNavigationLink={results.length > 10} />
  );

  let resultListContent;
  if (viewStore.totalResultsPages > 0) {
    resultListContent = (
      <div>
        {results}
        {bottomNavigation}
      </div>
    );
  } else {
    resultListContent = <span>The result list for specified parameters is empty.</span>;
  }

  const resultList = resultsStore.completedInitialLoad && (
    <div className="result-list">
      <ResultListNavigation viewStore={viewStore} position="top" showPageNavigationLink={results.length > 10} />
      {resultListContent}
    </div>
  );

  return (
    <div className="view view--results">
      {resultList}
    </div>
  );
}

const resultsView = observer(ResultsView);
export { resultsView as ResultsView };
