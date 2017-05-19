import { paths } from "app/Config";
import { DatePicker } from "common/components/DatePicker";
import { parseDate, stringifyDate } from "common/DateUtils";
import { action } from "mobx";
import { inject, observer } from "mobx-react";
import { RankingDatePickerSection } from "ranking/components/RankingDatePickerSection";
import { RankingTable } from "ranking/components/RankingTable";
import { RankingStore } from "ranking/RankingStore";
import * as React from "react";

function RankingView(props) {
  const datePicker = this.props.initialDate && (
    <DatePicker
      minYear={1873} // TODO: Get from the API
      value={this.props.initialDate}
      onChange={this.props.appStore.viewStore.showHistoricalRankingView}
    />
  );

  const rankingTable = this.props.ranking && (
    <RankingTable ranking={this.props.ranking} />
  );

  return (
    <div className="page page--ranking">
      {datePicker}
      {rankingTable}
    </div>
  );
}

// tslint:disable-next-line:align
export default inject("appStore")(observer(RankingView));

/*interface IRankingViewProps {
  routerStore: RouterStore;
  rankingStore: RankingStore;
  params: { date };
}

@inject("routerStore", "rankingStore")
@observer
export class RankingView extends React.Component<IRankingViewProps, {}> {

  public rankingStore: RankingStore;
  public routerStore: RouterStore;

  public handleDateChange = action((newValue: Date) => {
    this.rankingStore.loadRanking(newValue);
    this.routerStore.push(`${paths.ranking}/${stringifyDate(newValue)}`);
  });

  public componentWillMount() {
    this.rankingStore = this.props.rankingStore;
    this.routerStore = this.props.routerStore;
  }

  public componentDidMount() {
    const pathDate = this.props.params.date;

    if (!pathDate) {
      this.rankingStore.loadRanking();
    } else {
      // TODO: Better regex, better date validation across the whole app in general
      const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

      if (dateRegex.exec(pathDate)) {
        this.handleDateChange(parseDate(pathDate));
      } else {
        this.rankingStore.loadRanking();
        this.routerStore.push(paths.ranking);
      }
    }
  }

  public componentWillUnmount() {
    this.rankingStore.clear();
  }

  public render() {
    return (
      <div className="page page--ranking">
        <RankingDatePickerSection
          initialDate={this.rankingStore.initialDate}
          onDateChange={this.handleDateChange}
        />
        <RankingSection />
      </div>
    );
  }

}*/
