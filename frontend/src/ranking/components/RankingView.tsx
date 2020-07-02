import { observer } from "mobx-react";
import * as React from "react";

import { AppStore } from "app/AppStore";
import { RankingDatePicker } from "ranking/components/RankingDatePicker";
import { RankingTable } from "ranking/components/RankingTable";
import { RankingStore } from "ranking/RankingStore";
import { RankingViewStore } from "ranking/RankingViewStore";

interface IRankingViewProps {
  readonly rankingStore: RankingStore;
  readonly viewStore: RankingViewStore;
}

function RankingView({ rankingStore, viewStore }: IRankingViewProps): JSX.Element {
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
