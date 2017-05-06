import { inject, observer } from 'mobx-react';
import * as React from 'react';
import * as Spinner from 'react-spinner';
import { Debounce } from 'react-throttle';
import ReactPaginate = require('react-paginate');
import { RouterStore } from '../app/RouterStore';
import { ResultsStore } from './ResultsStore';
import { Icon } from '../common/Icon'
import { Result } from './Result';

interface ResultsPageProps {
  routerStore?: RouterStore;
  resultsStore?: ResultsStore;
  params: string[];
}

@inject('routerStore', 'resultsStore')
@observer
export class ResultsPage extends React.Component<ResultsPageProps, {}> {

  componentDidMount() {
    this.props.resultsStore.loadMatchPage(0);
  }

  render() {
    const matchPage = this.props.resultsStore.matchPage;

    return (
      <div className="page page--results">
        {matchPage &&
        <div className="result-list">
          <Debounce time={500} handler="onPageChange">
          <ReactPaginate 
              pageCount={matchPage.totalPages}
              initialPage={matchPage.no}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              previousLabel={<Icon name="chevron-left" />}
              nextLabel={<Icon name="chevron-right" />}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              onPageChange={this.handlePageChange}
              disableInitialCallback={true}
              containerClassName={"pagination"}
              activeClassName={"active"} /> 
          </Debounce>
          {!this.props.resultsStore.isMatchPageLoading && matchPage.content.map((match) => {
             return <Result match={match} key={match.id} />;
           })
          }
          {this.props.resultsStore.isMatchPageLoading && <Spinner />}
        </div>
        }
        {!matchPage &&
          <Spinner />}
      </div>
    );
  }

  handlePageChange = (e: { selected: number }) => {
    this.props.resultsStore.loadMatchPage(e.selected);
  }

  componentDidUnmount() {
    this.props.resultsStore.clear();
  }

}