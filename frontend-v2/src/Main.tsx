import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { paths } from './app/Config';
import { App } from './app/App';
import { ApiClient } from './app/ApiClient';
import { RouterStore } from './app/RouterStore';
import { RankingStore } from './ranking/RankingStore';
import { ResultsStore } from './results/ResultsStore';
import { NotFoundPage } from './app/NotFoundPage';
import { RankingPage } from './ranking/RankingPage';
import { ResultsPage } from './results/ResultsPage';
import '../resources/styles/main.scss';

useStrict(true);

const routerStore = new RouterStore(browserHistory);
const apiClient = new ApiClient();
const rankingStore = new RankingStore(apiClient, routerStore);
const resultsStore = new ResultsStore(apiClient, routerStore);
const stores = { routerStore, rankingStore, resultsStore };

ReactDOM.render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path={paths.ranking} component={RankingPage}>
          <Route path={'(:date)'} component={RankingPage} />
        </Route>
        <Route path={paths.results} component={ResultsPage} />
        <Route path='*' component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);