import { Icon } from "common/components/Icon";
import * as React from "react";
import { Link } from "react-router";

export interface INavigationEntryProps {
  onClick: () => void;
  icon: string;
  text: string;
}

export class NavigationEntry extends React.Component<INavigationEntryProps, any> {

  public render() {
    return (
      <a
        onClick={this.props.onClick}
        className="main-navigation__link"
      >
        {/*activeClassName="main-navigation__link--active"*/}
        <Icon name={this.props.icon} />
        {this.props.text}
      </a>
    );
  }

}
