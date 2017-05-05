import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouterStore } from '../app/RouterStore';
import { ResultsStore } from './ResultsStore';
import { Result } from './Result';

interface ResultsPageProps {
  routerStore?: RouterStore;
  resultsStore?: ResultsStore;
  params: string[];
}

@inject('routerStore', 'resultsStore')
@observer
export class ResultsPage extends React.Component<ResultsPageProps, {}> {

  componentWillMount() {
    this.props.resultsStore.loadMatches();
  }

  render() {
    const matchPage = this.props.resultsStore.matchPage;

    return (
      <div className="page page--results">
        <div className="result-list">
          {matchPage && 
           matchPage.content.map((match) => {
             return <Result match={match} key={match.id} />;
           })
          }
        </div>
      </div>
    );
  }

}