import * as React from 'react';
import { Match } from './Match';

interface ResultProps {
  match: Match;
}

export class Result extends React.Component<ResultProps, {}> {
  
  render() {
    const match = this.props.match;

    return (
      <div className="result">
        {match.teamNames[0]} v {match.teamNames[1]}
      </div>
    )
  }

}