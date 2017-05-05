import { inject } from 'mobx-react';
import * as React from 'react';
import { paths } from './Config';
import { RouterStore } from './RouterStore';
import { NavigationEntry, NavigationEntryProps } from './NavigationEntry';

interface NavigationProps {
  routerStore?: RouterStore;
}

@inject('routerStore')
export class Navigation extends React.Component<NavigationProps, {}> {

  navigationEntries: NavigationEntryProps[] = [
    { key: 1, link: `${paths.ranking}`, icon: 'trophy-variant', text: 'Ranking' },
    { key: 2, link: `${paths.results}`, icon: 'soccer', text: 'Results' }
  ];

  render() {
    const currentPathname = this.props.routerStore.location.pathname;

    return (
      <div className="main-navigation">
        {this.navigationEntries.map(entry => {
          return <NavigationEntry {...entry} />
        })}
      </div>
    )
  }

}