import { inject, observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { Navigation } from "app/components/Navigation";

interface ITopBarProps {
  appStore: AppStore;
}

@observer
export class TopBar extends React.Component<ITopBarProps, {}> {

  public render() {
    const isLoading = this.props.appStore.viewStore.isLoading;

    return (
      <nav className="top-bar">
        <span className="site-logo">
          natrank
        </span>

        <Navigation viewStore={this.props.appStore.viewStore} />

        {isLoading && <LoadingIndicator />}
      </nav>
    );
  }

}

const LoadingIndicator = () => (
  <div className="loading-indicator sk-three-bounce">
    <div className="sk-child sk-bounce1" />
    <div className="sk-child sk-bounce2" />
    <div className="sk-child sk-bounce3" />
  </div>
);
