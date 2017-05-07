import { inject } from "mobx-react";
import * as React from "react";
import { paths } from "./Config";
import { INavigationEntryProps, NavigationEntry } from "./NavigationEntry";
import { RouterStore } from "./RouterStore";

interface INavigationProps {
  routerStore?: RouterStore;
}

@inject("routerStore")
export class Navigation extends React.Component<INavigationProps, {}> {

  private navigationEntryData: INavigationEntryProps[] = [
    { key: 1, link: `${paths.ranking}`, icon: "trophy-variant", text: "Ranking" },
    { key: 2, link: `${paths.results}`, icon: "soccer", text: "Results" },
  ];

  public render() {
    const currentPathname = this.props.routerStore.location.pathname;

    return (
      <div className="main-navigation">
        {this.navigationEntryData.map((entry) => <NavigationEntry {...entry} />)}
      </div>
    );
  }

}
