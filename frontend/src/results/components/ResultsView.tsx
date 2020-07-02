import { observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { Result } from "results/components/Result";
import { ResultList } from "results/components/ResultList";
import { ResultListNavigation, ResultListNavigationPosition } from "results/components/ResultListNavigation";
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
    const povTeamId = resultsStore.povTeam.id;
    const totalPages = resultsStore.matchPage.totalPages;
    const isListShort = results.length <= 10;

    const navigation = (position: ResultListNavigationPosition) => (
      <ResultListNavigation viewStore={viewStore} position={position} goToLinkVisible={!isListShort} />
    );

    const resultListOrEmptyMessage = totalPages > 0
      ? <ResultList results={results} povTeamId={povTeamId} />
      : <span>The result list for specified criteria is empty.</span>;

    content = (
      <div className="result-list-panel">
        {navigation("top")}
        {resultListOrEmptyMessage}
        {(totalPages > 0 && !isListShort) && navigation("bottom")}
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
