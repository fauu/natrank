import { TopBar } from "app/components/TopBar";
import { transitionsEnabled } from "app/Config";
import { ViewStore } from "app/ViewStore";
import { inject, observer } from "mobx-react";
import RankingView from "ranking/components/RankingView";
import * as React from "react";
import Headroom from "react-headroom";
import { RouteTransition } from "react-router-transition";

@inject("appStore")
@observer
export class App extends React.Component<{ appStore? }, void> {

  public render() {
    const content =
      false
      ? <h1>Loading...</h1>
      : this.renderPage(this.props.appStore.viewStore);

    return (
      <div className="main-container">
        <Headroom>
          <TopBar />
        </Headroom>

        {content}

        {this.renderDevTools()}
      </div>
    );
  }

  private renderPage(viewStore: ViewStore) {
    switch (viewStore.view) {
      case "ranking":
        return <RankingView initialDate={viewStore.newestRankingDate} ranking={viewStore.selectedRanking} />;
      case "ranking-historical":
        return <RankingView initialDate={viewStore.latestRankingDate} ranking={viewStore.selectedRanking} />;
      default:
        return "404";
    }
  }

  private renderDevTools() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default;

      return <DevTools position={{ bottom: 0, right: 10 }} />;
    }
  }

}
