import { action } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { paths } from "../app/Config";
import { RouterStore } from "../app/RouterStore";
import { DateUtils } from "../common/DateUtils";
import { RankingDatePickerSection } from "./RankingDatePickerSection";
import { RankingSection } from "./RankingSection";
import { RankingStore } from "./RankingStore";

interface IRankingViewProps {
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
    this.routerStore.push(`${paths.ranking}/${DateUtils.stringify(newValue)}`);
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
        this.handleDateChange(DateUtils.parse(pathDate));
      } else {
        this.rankingStore.loadRanking();
        this.routerStore.push(paths.ranking);
      }
    }
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

}
