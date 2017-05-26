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

  let content;
  if (viewStore.totalResultsPages > 0) {
    content = (
      <div className="result-list">
        <ResultListNavigation viewStore={viewStore} position="top" />
        {results}
        {!isLoading && <ResultListNavigation viewStore={viewStore} position="bottom" />}
      </div>
    );
  } else {
    content = <div className="result-list">The result list for specified parameters is empty.</div>;
  }

  return (
    <div className="view view--results">
      {resultsStore.completedInitialLoad && content}
    </div>
  );
}

const resultsView = observer(ResultsView);
export { resultsView as ResultsView };
