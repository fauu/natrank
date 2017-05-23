import { observer } from "mobx-react";
import * as React from "react";
import Headroom from "react-headroom";

import { AppStore } from "app/AppStore";
import { TopBar } from "app/components/TopBar";
import { View } from "app/ViewStore";
import { RankingView } from "ranking/components/RankingView";
import { ResultsView } from "results/components/ResultsView";

interface IAppProps {
  readonly appStore: AppStore;
}

@observer
export class App extends React.Component<IAppProps, void> {

  public render() {
    const content =
      false
      ? <h1>Loading...</h1>
      : this.renderPage(this.props.appStore.viewStore.view, this.props.appStore);

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
        return <RankingView appStore={appStore} />;
      case "Results":
        return <ResultsView appStore={appStore} />;
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
