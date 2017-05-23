// tslint:disable:object-literal-key-quotes
import { Router } from "director/build/director";
import { reaction, useStrict } from "mobx";
import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppStore } from "app/AppStore";
import { App } from "app/components/App";

import { RankingView } from "ranking/components/RankingView";
import { RankingStore } from "ranking/RankingStore";
import { ResultsView } from "results/components/ResultsView";
import { ResultsStore } from "results/ResultsStore";

import "../resources/styles/main.scss";

useStrict(true);

const appStore = new AppStore();

reaction(
  () => appStore.viewStore.currentUrl,
  (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }
  },
);

ReactDOM.render(
  <Provider appStore={appStore}>
    <App appStore={appStore} />
  </Provider>,
  document.getElementById("root"),
);

const viewStore = appStore.viewStore;
new Router({
  "/ranking": {
    "/:date": {
      on: viewStore.showRanking,
    },
    on: viewStore.showRanking,
  },
}).configure({
  html5history: true,
}).init();