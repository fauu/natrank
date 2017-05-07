import { Icon } from "common/components/Icon";
import * as React from "react";
import { Link } from "react-router";

export interface INavigationEntryProps {
  key: number;
  link: string;
  icon: string;
  text: string;
}

export class NavigationEntry extends React.Component<INavigationEntryProps, any> {

  public render() {
    return (
      <Link
        to={this.props.link}
        className="main-navigation__link"
        activeClassName="main-navigation__link--active"
      >
        <Icon name={this.props.icon} />
        {this.props.text}
      </Link>
    );
  }

}
