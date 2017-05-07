import { debounce } from 'lodash';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { paths } from '../app/Config';
import * as Spinner from 'react-spinner';
import { RouterStore } from '../app/RouterStore';
import { ResultsStore } from './ResultsStore';
import { Result } from './Result';
import { ResultsPagePicker } from './ResultsPagePicker';

interface ResultsViewProps {
  routerStore: RouterStore;
  resultsStore: ResultsStore;
  params: string[];
}

@inject('routerStore', 'resultsStore')
@observer
export class ResultsView extends React.Component<ResultsViewProps, {}> {

  componentWillMount() {
    const pathPageNo = this.props.params['pageNo'];
    
    if (pathPageNo && isNaN(pathPageNo)) {
      this.props.routerStore.push(paths.results);
    } else {
      this.props.resultsStore.loadMatchPage(pathPageNo - 1);
    }
  }

  componentWillUpdate() {
    const pathPageNo = this.props.params['pageNo'];

    if (pathPageNo && isNaN(pathPageNo)) {
      this.selectFirstPage();
      return;
    }

    const matchPage = this.props.resultsStore.matchPage;

    if (matchPage) {
      const totalPages = matchPage.totalPages;

      if (pathPageNo < 1 || pathPageNo > totalPages) {
        this.selectFirstPage();
      }
    }
  }

  selectFirstPage() {
    this.props.routerStore.push(paths.results);
    this.props.resultsStore.loadMatchPage(0);
  }

  render() {
    const matchPage = this.props.resultsStore.matchPage;
    const isLoading = this.props.resultsStore.isMatchPageLoading;

    return (
      <div className="page page--results">
        {matchPage ?
          <div className="result-list">
            <ResultsPagePicker 
              onChange={this.debouncedHandlePageChange}
              className="results-page-picker results-page-picker--top"
              pageNo={matchPage.no}
              totalPages={matchPage.totalPages} />
            {!isLoading && 
              matchPage.content.map((match) => {
                return <Result match={match} key={match.id} />;
              })
            }
            {isLoading && 
              <Spinner />
            }
            {!isLoading && 
              <ResultsPagePicker 
                onChange={this.debouncedHandlePageChange}
                className="results-page-picker results-page-picker--bottom"
                pageNo={matchPage.no} 
                totalPages={matchPage.totalPages} />
            }
          </div>
        :
          <Spinner />
        }
      </div>
    );
  }

  handlePageChange = (e: { selected: number }) => {
    this.props.resultsStore.loadMatchPage(e.selected);
    this.props.routerStore.push(`${paths.results}/page/${e.selected + 1}`);
  }

  debouncedHandlePageChange = debounce(this.handlePageChange, 500);

}