import { inject, observer } from 'mobx-react';
import * as React from 'react';
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

  componentWillMount() {
    this.props.resultsStore.loadMatchPage(0);
  }

  render() {
    const matchPage = this.props.resultsStore.matchPage;

    return (
      <div className="page page--results">
        <div className="result-list">
          {matchPage &&
          <ReactPaginate 
              pageCount={matchPage.totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              previousLabel={<Icon name="chevron-left" />}
              nextLabel={<Icon name="chevron-right" />}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              onPageChange={this.handlePageChange}
              disableInitialCallback={true}
              containerClassName={"pagination"}
              activeClassName={"active"} /> 
          }
          {matchPage && 
           matchPage.content.map((match) => {
             return <Result match={match} key={match.id} />;
           })
          }
        </div>
      </div>
    );
  }

  handlePageChange = (e: { selected: number }) => {
    this.props.resultsStore.loadMatchPage(e.selected);
  }

}