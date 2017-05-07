import { Navigation } from "app/components/Navigation";
import * as React from "react";

export class TopBar extends React.Component<any, any> {

  public render() {
    return (
      <nav className="top-bar">
        <span className="site-logo">
          natrank
        </span>

        <Navigation />
      </nav>
    );
  }

}
