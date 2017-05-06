import { debounce } from 'lodash';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { paths } from '../app/Config';
import ReactPaginate = require('react-paginate');
import { RouterStore } from '../app/RouterStore';
import { ResultsStore } from './ResultsStore';
import { Icon } from '../common/Icon'

interface ResultsPagePickerProps {
  routerStore?: RouterStore;
  resultsStore?: ResultsStore;
  pageNo: number;
  totalPages: number;
}

@inject('routerStore', 'resultsStore')
@observer
export class ResultsPagePicker extends React.Component<ResultsPagePickerProps, {}> {
  render() {
    return (
      <ReactPaginate 
          pageCount={this.props.totalPages}
          forcePage={this.props.pageNo}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          previousLabel={<Icon name="chevron-left" />}
          nextLabel={<Icon name="chevron-right" />}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          onPageChange={debounce(this.handlePageChange, 500)}
          disableInitialCallback={true}
          containerClassName={"pagination"}
          activeClassName={"active"} /> 
    )
  }
  
  handlePageChange = (e: { selected: number }) => {
    this.props.resultsStore.loadMatchPage(e.selected);
    this.props.routerStore.push(paths.results + '/page/' + (e.selected + 1));
  }
}