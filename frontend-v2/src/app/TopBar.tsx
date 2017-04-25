import * as React from 'react';
import { Navigation } from './Navigation';

export class TopBar extends React.Component<any, any> {

  render() {
    return (
      <nav className="top-bar">
        <span className="site-logo">
          natrank  
        </span>

        <Navigation />
      </nav>
    )
  }

}