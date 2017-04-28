import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouterStore } from '../app/RouterStore'
import { paths } from '../app/Config';

interface ResultsPageProps {
  routerStore?: RouterStore;
  params: string[];
}

@inject('routerStore')
export class ResultsPage extends React.Component<ResultsPageProps, {}> {

  render() {
    return (
      <div className="page page--results">
        Results page
      </div>
    );
  }

}