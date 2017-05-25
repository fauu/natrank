import { observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { parseDate, stringifyDate } from "common/DateUtils";
import { RankingDatePicker } from "ranking/components/RankingDatePicker";
import { RankingTable } from "ranking/components/RankingTable";
import { RankingStore } from "ranking/RankingStore";

interface IRankingViewProps {
  readonly appStore: AppStore;
}

function RankingView({ appStore }: IRankingViewProps) {
  const { rankingStore, viewStore } = appStore;

  const datePicker = rankingStore.lastViewedRankingDate && (
    <RankingDatePicker viewStore={viewStore} />
  );

  const rankingTable = !rankingStore.isLoading && (
    <RankingTable ranking={rankingStore.ranking} />
  );

  return (
    <div className="view view--ranking">
      {datePicker}
      {rankingTable}
    </div>
  );
}

const rankingView = observer(RankingView);
export { rankingView as RankingView };
