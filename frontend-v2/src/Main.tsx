// tslint:disable:object-literal-key-quotes
import { ApiClient } from "app/ApiClient";
import { AppStore } from "app/AppStore";
import { App } from "app/components/App";
import { NotFoundPage } from "app/components/NotFoundPage";
import { paths } from "app/Config";
import { Router } from "director/build/director";
import { reaction, useStrict } from "mobx";
import { Provider } from "mobx-react";
import RankingView from "ranking/components/RankingView";
import { RankingStore } from "ranking/RankingStore";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ResultsView } from "results/components/ResultsView";
import { ResultsStore } from "results/ResultsStore";
import "../resources/styles/main.scss";

useStrict(true);

const appStore = new AppStore();

ReactDOM.render(
  <Provider appStore={appStore}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

new Router({
  "/ranking": {
    "/:date": {
      on: appStore.viewStore.showRanking,
    },
    on: appStore.viewStore.showRanking,
  },
}).configure({
  html5history: true,
}).init();

reaction(
  () => appStore.viewStore.currentUrl,
  (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }
  },
);
