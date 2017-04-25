import * as React from 'react';
import { Link } from 'react-router';
import { Icon } from '../common/Icon';

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

    return (
      <Link to={this.props.link} className={linkClassName}>
        <Icon name={this.props.icon} />
        {this.props.text}
      </Link>
    )
  }

}