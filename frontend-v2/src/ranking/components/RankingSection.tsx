import { inject, observer } from "mobx-react";
import { RankingTable } from "ranking/components/RankingTable";
import { RankingStore } from "ranking/RankingStore";
import * as React from "react";
import * as Spinner from "react-spinner";

interface IRankingSectionProps {
  rankingStore?: RankingStore;
}

@inject("rankingStore")
@observer
export class RankingSection extends React.Component<IRankingSectionProps, {}> {

  public render() {
    const ranking = this.props.rankingStore.ranking;

    if (!ranking) {
      return <Spinner />;
    } else if (ranking.entries.length === 0) {
      return <span>Could not generate ranking for the selected date.</span>;
    } else {
      return <RankingTable ranking={this.props.rankingStore.ranking} />;
    }
  }

}
