import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './App';
import { RouterStore } from './RouterStore';
import { STORE_ROUTER } from './constants';
import '../../assets/styles/main.scss';

useStrict(true);

const routerStore = new RouterStore(browserHistory);
const rootStores = {
  [STORE_ROUTER]: routerStore
};

const RankingPage = () => <span>Ranking page</span>
const ResultsPage = () => <span>Results page</span>
const NotFoundPage = () => <span>404 page</span>

ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={browserHistory} >
      <Route path='/' component={App}>
        <IndexRoute component={RankingPage} />
        <Route path='/results' component={ResultsPage} />
        <Route path='*' component={NotFoundPage} />
      </Route>
    </Router>
  </Provider >,
  document.getElementById('root')
);