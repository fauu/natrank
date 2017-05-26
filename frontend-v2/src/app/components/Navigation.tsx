import { observer } from "mobx-react";
import * as React from "react";

import { AppStore, View } from "app/AppStore";
import { INavigationEntryProps, NavigationEntry } from "app/components/NavigationEntry";

interface INavigationProps {
  appStore: AppStore;
}

function Navigation({ appStore }: INavigationProps): JSX.Element {
  const activeView = appStore.activeView;

  return (
    <div className="main-navigation">
      <NavigationEntry
        icon="trophy-variant"
        text="Ranking"
        onClick={handleEntryClick("Ranking", appStore)}
        isActive={activeView === "Ranking"}
      />
      <NavigationEntry
        icon="soccer"
        text="Results"
        onClick={handleEntryClick("Results", appStore)}
        isActive={activeView === "Results"}
      />
    </div>
  );
}

const handleEntryClick = (view: View, appStore: AppStore) => () => {
  appStore.showView(view);
};

const navigation = observer(Navigation);
export { navigation as Navigation };
