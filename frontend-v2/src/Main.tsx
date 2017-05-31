// tslint:disable:object-literal-key-quotes
import { Router } from "director/build/director";
import { reaction, useStrict } from "mobx";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppStore } from "app/AppStore";
import { App } from "app/components/App";

import { RankingView } from "ranking/components/RankingView";
import { RankingStore } from "ranking/RankingStore";
import { ResultsView } from "results/components/ResultsView";
import { ResultsStore } from "results/ResultsStore";

import "styles/main.scss";

useStrict(true);

const appStore = new AppStore();

reaction(
  () => appStore.currentUrl,
  (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }
  },
);

// TODO: Simplify
new Router({
  "/": () => appStore.showView("Ranking"),
  "/ranking": {
    "/(\\d{4}-(?:[1-9]|1[012])-(?:[1-9]|[12][0-9]|3[01]))$": {
      on: (date) => appStore.showView("Ranking", { dateStr: date }),
    },
    on: () => appStore.showView("Ranking"),
  },
  "/results": {
    "/(\[a-z\\-]+)": {
      "/page/(\\d+)": {
        on: (team, page) => appStore.showView("Results", { pageStr: page, teamStr: team }),
      },
      on: (team) => appStore.showView("Results", { teamStr: team }),
    },
    "/page/(\\d+)": {
      on: (page) => appStore.showView("Results", { pageStr: page }),
    },
    "/year/(\\d{4})": {
      "/page/(\\d+)": {
        on: (year, page) => appStore.showView("Results", { pageStr: page, yearStr: year }),
      },
      on: (year) => appStore.showView("Results", { yearStr: year }),
    },
    on: () => appStore.showView("Results"),
  },
  "/teams/(\[a-z\\-]+)": (team) => appStore.showView("Team", { teamStr: team }),
}).configure({
  html5history: true,
  notfound: () => appStore.showView("NotFound"),
  strict: false,
}).init();

ReactDOM.render(
  <App appStore={appStore} />,
  document.getElementById("root"),
);
