import { TopBar } from "app/components/TopBar";
import { RouterStore } from "app/RouterStore";
import { inject } from "mobx-react";
import * as React from "react";
import Headroom from "react-headroom";
import { RouteTransition } from "react-router-transition";

interface IAppProps {
  routerStore: RouterStore;
}

@inject("routerStore")
export class App extends React.Component<IAppProps, {}> {

  public render() {
    const baseRouteName =
      this.props.routerStore.location.pathname.split("/")[1];

    return (
      <div className="main-container">
        <Headroom>
          <TopBar />
        </Headroom>

        <RouteTransition
          pathname={baseRouteName}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          {this.props.children}
        </RouteTransition>

        {this.renderDevTool()}
      </div>
    );
  }

  private renderDevTool() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default;

      return <DevTools />;
    }
  }

}
