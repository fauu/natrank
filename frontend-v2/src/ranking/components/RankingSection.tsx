import { FadeTransition } from "common/components/FadeTransition";
import { inject, observer } from "mobx-react";
import { RankingTable } from "ranking/components/RankingTable";
import { RankingStore } from "ranking/RankingStore";
import * as React from "react";

interface IRankingSectionProps {
  rankingStore?: RankingStore;
}

@inject("rankingStore")
@observer
export class RankingSection extends React.Component<IRankingSectionProps, {}> {

  public render() {
    const ranking = this.props.rankingStore.ranking;

    const content = (
      <div key="table">
        <RankingTable ranking={this.props.rankingStore.ranking} />
      </div>
    );

    return (
      <FadeTransition>
        {(ranking && ranking.entries.length > 0) && content}
      </FadeTransition>
    );
  }

}
