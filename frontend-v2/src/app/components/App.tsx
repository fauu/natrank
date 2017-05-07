import { TopBar } from "app/components/TopBar";
import * as React from "react";
import Headroom from "react-headroom";

export class App extends React.Component<any, any> {

  public render() {
    return (
      <div className="main-container">
        <Headroom>
          <TopBar />
        </Headroom>

        {this.props.children}

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
