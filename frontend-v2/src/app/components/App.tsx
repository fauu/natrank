import { AppStore } from "app/AppStore";
import { TopBar } from "app/components/TopBar";
import { transitionsEnabled } from "app/Config";
import { observer } from "mobx-react";
import { RankingView } from "ranking/components/RankingView";
import * as React from "react";
import Headroom from "react-headroom";
import { RouteTransition } from "react-router-transition";

interface IAppProps {
  readonly appStore: AppStore;
}

@observer
export class App extends React.Component<IAppProps, void> {

  public render() {
    const content =
      false
      ? <h1>Loading...</h1>
      : this.renderPage(this.props.appStore);

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

  private renderPage(appStore: AppStore) {
    switch (appStore.viewStore.view) {
      case "ranking":
          return <RankingView appStore={appStore} />;
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
