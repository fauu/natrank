import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { browserHistory, IndexRoute, Route, Router } from "react-router";
import "../resources/styles/main.scss";
import { ApiClient } from "./app/ApiClient";
import { App } from "./app/App";
import { paths } from "./app/Config";
import { NotFoundPage } from "./app/NotFoundPage";
import { RouterStore } from "./app/RouterStore";
import { RankingStore } from "./ranking/RankingStore";
import { RankingView } from "./ranking/RankingView";
import { ResultsStore } from "./results/ResultsStore";
import { ResultsView } from "./results/ResultsView";

useStrict(true);

const routerStore = new RouterStore(browserHistory);
const apiClient = new ApiClient();
const rankingStore = new RankingStore(apiClient);
const resultsStore = new ResultsStore(apiClient);
const stores = { routerStore, rankingStore, resultsStore };

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
