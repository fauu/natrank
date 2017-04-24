import * as React from 'react';
import { Link } from 'react-router';

export class App extends React.Component<any, any> {

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  Header = () => (
    <nav id="top-bar">
      <span className="logo">
        natrank  
      </span>

      <Link to="/">
        <i className="fa fa-trophy" aria-hidden="true"></i>
        Ranking
      </Link>
      <Link to="/results">
        <i className="fa fa-futbol-o" aria-hidden="true"></i>
        Results
      </Link>
    </nav>
  )

  render() {
    return (
      <div className="main-container">
        <this.Header />
        <div id="page">
          {this.props.children}
        </div>
        {this.renderDevTool()}
      </div>
    );
  }
};