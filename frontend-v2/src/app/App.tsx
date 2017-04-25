import * as React from 'react';
import { TopBar } from './TopBar';

export class App extends React.Component<any, any> {

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  render() {
    return (
      <div className="main-container">
        <TopBar />
        <div className="page">
          {this.props.children}
        </div>
        {this.renderDevTool()}
      </div>
    );
  }

};