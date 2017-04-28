// import { action } from 'mobx';
import { inject, /*observer*/ } from 'mobx-react';
import * as React from 'react';
// import { paths } from '../app/Config';
import { RouterStore } from '../app/RouterStore';
import { ResultsStore } from './ResultsStore';

interface ResultsPageProps {
  routerStore?: RouterStore;
  resultsStore?: ResultsStore;
  params: string[];
}

@inject('routerStore', 'resultsStore')
export class ResultsPage extends React.Component<ResultsPageProps, {}> {

  componentWillMount() {
    this.props.resultsStore.loadMatches();
  }

  render() {
    return (
      <div className="page page--results">
        Results page
      </div>
    );
  }

}