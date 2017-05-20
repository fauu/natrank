import { AppStore } from "app/AppStore";
import { paths } from "app/Config";
import { DatePicker } from "common/components/DatePicker";
import { parseDate, stringifyDate } from "common/DateUtils";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import { RankingDatePickerSection } from "ranking/components/RankingDatePickerSection";
import { RankingTable } from "ranking/components/RankingTable";
import { RankingStore } from "ranking/RankingStore";
import * as React from "react";

interface IRankingViewProps {
  appStore?: AppStore;
}

function RankingView({ appStore }: IRankingViewProps) {
  const rankingStore = appStore.rankingStore;

  const datePicker = rankingStore.latestRankingDate && (
    <DatePicker
      minYear={1873}                                                                          // TODO: Get from the API
      value={rankingStore.ranking.date}
      onChange={appStore.viewStore.showRanking}
    />
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

export default inject("appStore")(observer(RankingView));
