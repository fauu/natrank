import * as React from "react";

import { INavigationEntryProps, NavigationEntry } from "app/components/NavigationEntry";
import { ViewStore } from "app/ViewStore";

interface INavigationProps {
  viewStore: ViewStore;
}

export function Navigation({ viewStore }: INavigationProps) {
  return (
    <div className="main-navigation">
      <NavigationEntry
        text="Ranking"
        icon="trophy-variant"
        onClick={viewStore.showRanking}
      />
      <NavigationEntry
        text="Results"
        icon="soccer"
        onClick={viewStore.showResultsPage}
      />
    </div>
  );
}
