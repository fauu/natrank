import { AppStore } from "app/AppStore";
import { Navigation } from "app/components/Navigation";
import { inject, observer } from "mobx-react";
import * as React from "react";

interface ITopBarProps {
  appStore?: AppStore;
}

@inject("appStore")
@observer
export class TopBar extends React.Component<ITopBarProps, {}> {

  public render() {
    return (
      <nav className="top-bar">
        <span className="site-logo">
          natrank
        </span>

        {/*<Navigation />*/}

        {this.props.appStore.isLoading && <LoadingIndicator />}
      </nav>
    );
  }

}

const LoadingIndicator = () => (
  <div className="sk-three-bounce">
    <div className="sk-child sk-bounce1" />
    <div className="sk-child sk-bounce2" />
    <div className="sk-child sk-bounce3" />
  </div>
);
