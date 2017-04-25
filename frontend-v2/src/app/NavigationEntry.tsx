import * as React from 'react';
import { Link } from 'react-router';

export interface NavigationEntryProps {
  key: number;
  link: string;
  icon: string;
  text: string;
  isActive: boolean;
}

export class NavigationEntry extends React.Component<NavigationEntryProps, any> {

  render() {
    let linkClassName = 'main-navigation__link main-navigation__link' + (this.props.isActive ? '--active' : '')
    let iconClassName = 'fa fa-' + this.props.icon;

    return (
      <Link to={this.props.link} className={linkClassName}>
        <i className={iconClassName} aria-hidden="true"></i>
        {this.props.text}
      </Link>
    )
  }

}