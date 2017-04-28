import * as React from 'react';
import { Link } from 'react-router';
import { Icon } from '../common/Icon';

export interface NavigationEntryProps {
  key: number;
  link: string;
  icon: string;
  text: string;
}

export class NavigationEntry extends React.Component<NavigationEntryProps, any> {

  render() {
    return (
      <Link to={this.props.link} 
            className='main-navigation__link'
            activeClassName='main-navigation__link--active'>
        <Icon name={this.props.icon} />
        {this.props.text}
      </Link>
    )
  }

}