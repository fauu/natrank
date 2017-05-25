import { observer } from "mobx-react";
import * as React from "react";

import { INavigationEntryProps, NavigationEntry } from "app/components/NavigationEntry";
import { View, ViewStore } from "app/ViewStore";

interface INavigationProps {
  viewStore: ViewStore;
}

function Navigation({ viewStore }: INavigationProps) {
  const view = viewStore.view;

  return (
    <div className="main-navigation">
      <NavigationEntry
        icon="trophy-variant"
        text="Ranking"
        onClick={viewStore.showRanking}
        isActive={view === "Ranking"}
      />
      <NavigationEntry
        icon="soccer"
        text="Results"
        onClick={handleResultsClick(viewStore)}
        isActive={view === "Results"}
      />
    </div>
  );
}

const handleResultsClick = (viewStore: ViewStore) => () => {
  viewStore.showResultsPage({});
};

const navigation = observer(Navigation);
export { navigation as Navigation };
