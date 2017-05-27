import { observer } from "mobx-react";
import * as React from "react";
import Headroom from "react-headroom";

import { AppStore, View } from "app/AppStore";
import { NotFoundView } from "app/components/NotFoundView";
import { TopBar } from "app/components/TopBar";
import { RankingView } from "ranking/components/RankingView";
import { RankingViewStore } from "ranking/RankingViewStore";
import { ResultsView } from "results/components/ResultsView";
import { ResultsViewStore } from "results/ResultsViewStore";
import { TeamView } from "team/components/TeamView";

interface IAppProps {
  readonly appStore: AppStore;
}

@observer
export class App extends React.Component<IAppProps, void> {

  public render() {
    const content =
      false
      ? <h1>Loading...</h1>
      : this.renderPage(this.props.appStore.activeView, this.props.appStore);

    return (
      <div className="main-container">
        <Headroom>
          <TopBar appStore={this.props.appStore} />
        </Headroom>

        {content}

        {this.renderDevTools()}
      </div>
    );
  }

  private renderPage(view: View, appStore: AppStore) {
    switch (view) {
      case "Ranking":
        return (
          <RankingView
            viewStore={appStore.viewStores[view] as RankingViewStore}
            rankingStore={appStore.rankingStore}
          />
        );
      case "Results":
        return (
          <ResultsView
            viewStore={appStore.viewStores[view] as ResultsViewStore}
            resultsStore={appStore.resultsStore}
          />
        );
      case "Team":
        return (
          <TeamView />
        );
      case "NotFound":
        return <NotFoundView />;
    }
  }

  private renderDevTools() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default;

      return <DevTools position={{ bottom: 0, right: 10 }} />;
    }
  }

}
