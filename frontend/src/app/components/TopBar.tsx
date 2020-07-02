import { inject, observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { Navigation } from "app/components/Navigation";

interface ITopBarProps {
  appStore: AppStore;
}

function TopBar({ appStore }: ITopBarProps): JSX.Element {
  const isLoading = this.props.appStore.isLoading;

  return (
    <nav className="top-bar">
      <a className="site-logo" href="/">
        natrank
      </a>

      <Navigation appStore={appStore} />

      {isLoading && <LoadingIndicator />}
    </nav>
  );
}

const LoadingIndicator = () => (
  <div className="loading-indicator sk-three-bounce">
    <div className="sk-child sk-bounce1" />
    <div className="sk-child sk-bounce2" />
    <div className="sk-child sk-bounce3" />
  </div>
);

const topBar = observer(TopBar);
export { topBar as TopBar };
