import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { paths } from './app/Config';
import { App } from './app/App';
import { Api } from './app/Api';
import { RouterStore } from './app/RouterStore';
import { RankingStore } from './ranking/RankingStore';
import { RankingPage } from './ranking/RankingPage';
import '../resources/styles/main.scss';

useStrict(true);

const routerStore = new RouterStore(browserHistory);
const rankingStore = new RankingStore(new Api(), routerStore);
const stores = { routerStore, rankingStore };

const ResultsPage = () => <span>Results page</span>
const NotFoundPage = () => <span>404 page</span>

ReactDOM.render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path={paths.ranking} component={RankingPage}>
          <Route path={'(:date)'} component={RankingPage} />
        </Route>
        <Route path={paths.result} component={ResultsPage} />
        <Route path='*' component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);