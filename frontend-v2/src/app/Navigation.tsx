import * as React from 'react';
import { inject } from 'mobx-react';
import { RouterStore } from './RouterStore';
import { NavigationEntry, NavigationEntryProps } from './NavigationEntry';

@inject('routerStore')
export class Navigation extends React.Component<any, any> {

  navigationEntries: NavigationEntryProps[];

  componentWillMount() {
    this.navigationEntries = [
      { key: 1, link: '/', icon: 'trophy', text: 'Ranking', isActive: false },
      { key: 2, link: '/results', icon: 'futbol-o', text: 'Results', isActive: false }
    ];
  }

  render() {
    let currentPathname = this.props.routerStore.location.pathname;

    for (let entry of this.navigationEntries) {
      entry.isActive = (entry.link == currentPathname);
    }

    return (
      <div className="main-navigation">
        {this.navigationEntries.map(entry => {
          return <NavigationEntry {...entry} />
        })}
      </div>
    )
  }

}