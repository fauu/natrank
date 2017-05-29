import * as Koa from "koa";
import * as serve from "koa-static";

import { when } from "mobx";

import * as React from "react";
import { renderToString } from "react-dom/server";

import { AppStore } from "app/AppStore";
import { App } from "app/components/App";
import { RankingViewStore } from "../../src/ranking/RankingViewStore";

const app = new Koa();

app.use(serve("public"));

app.use(async (ctx) => {
  const appStore = new AppStore();
  (appStore.viewStores.Ranking as RankingViewStore).selectedDate = appStore.rankingStore.newestRankingDate;
  await appStore.rankingStore.loadRankingAsync();

  const rendered = renderToString(<App appStore={appStore} />);

  const stateSetter = `window.__INITIAL_STATE__ = ${JSON.stringify(appStore)}`;

  const HTML = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>natrank</title>
        <script>${stateSetter}</script>
      </head>
      <body>
        <div id="root">${rendered}</div>
        <script type="text/javascript" src="/vendor.bundle.js"></script>
        <script type="text/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;

  ctx.body = HTML;
});

app.listen(9001);
console.log("Listening on port 9001");
