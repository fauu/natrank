import * as React from 'react';
import { TopBar } from './TopBar';

export class App extends React.Component<any, any> {

  render() {
    return (
      <div className="main-container">
        <TopBar />

        {this.props.children}

        {this.renderDevTool()}
      </div>
    );
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;

      return <DevTools />;
    }
  };

};