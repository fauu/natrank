import { observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { DatePicker } from "common/components/DatePicker";
import { parseDate, stringifyDate } from "common/DateUtils";
import { RankingTable } from "ranking/components/RankingTable";
import { RankingStore } from "ranking/RankingStore";

interface IRankingViewProps {
  readonly appStore: AppStore;
}

function RankingView({ appStore }: IRankingViewProps) {
  const { rankingStore, viewStore } = appStore;

  const datePicker = rankingStore.lastViewedRankingDate && (
    <DatePicker viewStore={viewStore} />
  );

  const rankingTable = !rankingStore.isLoading && (
    <RankingTable ranking={rankingStore.ranking} />
  );

  return (
    <div className="page page--ranking">
      {datePicker}
      {rankingTable}
    </div>
  );
}

const rankingView = observer(RankingView);
export { rankingView as RankingView };
