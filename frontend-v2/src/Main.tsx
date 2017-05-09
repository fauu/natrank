import { ApiClient } from "app/ApiClient";
import { AppStore } from "app/AppStore";
import { App } from "app/components/App";
import { NotFoundPage } from "app/components/NotFoundPage";
import { paths } from "app/Config";
import { RouterStore } from "app/RouterStore";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import { RankingView } from "ranking/components/RankingView";
import { RankingStore } from "ranking/RankingStore";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory, IndexRoute, Route, Router } from "react-router";
import { ResultsView } from "results/components/ResultsView";
import { ResultsStore } from "results/ResultsStore";
import "../resources/styles/main.scss";

useStrict(true);

const routerStore = new RouterStore(browserHistory);
const apiClient = new ApiClient();
const rankingStore = new RankingStore(apiClient);
const resultsStore = new ResultsStore(apiClient);
const appStore = new AppStore(routerStore, rankingStore, resultsStore);
const stores = { appStore, routerStore, rankingStore, resultsStore };

ReactDOM.render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path={paths.ranking} component={RankingView}>
          <Route path={":date"} component={RankingView} />
        </Route>
        <Route path={paths.results} component={ResultsView}>
          <Route path={"page/:pageNo"} component={ResultsView} />
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
