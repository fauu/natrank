import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { paths } from '../app/Config';
import * as Spinner from 'react-spinner';
import { RouterStore } from '../app/RouterStore';
import { ResultsStore } from './ResultsStore';
import { Result } from './Result';
import { ResultsPagePicker } from './ResultsPagePicker';

interface ResultsViewProps {
  routerStore?: RouterStore;
  resultsStore?: ResultsStore;
  params: string[];
}

@inject('routerStore', 'resultsStore')
@observer
export class ResultsView extends React.Component<ResultsViewProps, {}> {

  componentWillMount() {
    const pageNo = this.props.params['pageNo'];
    if (pageNo && isNaN(pageNo)) {
      this.props.routerStore.push(paths.results);
    } else {
      this.props.resultsStore.loadMatchPage(pageNo - 1);
    }
  }

  componentWillUpdate() {
    const totalPages = this.props.resultsStore.totalPages;
    const pathPageNo = this.props.params['pageNo'];

    if (pathPageNo < 1 || (totalPages && (pathPageNo > totalPages))) {
      this.props.routerStore.push(paths.results);
      this.props.resultsStore.loadMatchPage(0);
    }
  }


  render() {
    const matchPage = this.props.resultsStore.matchPage;

    return (
      <div className="page page--results">
        {matchPage &&
          <div className="result-list">
            <ResultsPagePicker pageNo={matchPage.no} totalPages={matchPage.totalPages} />
            {!this.props.resultsStore.isMatchPageLoading && matchPage.content.map((match) => {
              return <Result match={match} key={match.id} />;
            })
            }
            {this.props.resultsStore.isMatchPageLoading && <Spinner />}
            {!this.props.resultsStore.isMatchPageLoading && <ResultsPagePicker pageNo={matchPage.no} totalPages={matchPage.totalPages} />}
          </div>
        }
        {!matchPage &&
          <Spinner />}
      </div>
    );
  }

  componentWillUnmount() {
    this.props.resultsStore.clear();
  }
}