import * as React from 'react';
import { RankingStore } from './RankingStore';
import { inject, observer } from 'mobx-react';
import { autorun, action, observable } from 'mobx';

interface RankingPageProps {
  rankingStore?: RankingStore;
}

@inject('rankingStore')
@observer
export class RankingPage extends React.Component<RankingPageProps, any> {

  render() {
    let ranking = this.props.rankingStore.ranking;
    let rk = (rs) => {
      switch (rs.ranking === undefined) {
        case true:
          return <span>Loading</span>;
        case false:
          return <span>date: {rs.ranking.date.toString()}</span>
      }
    }

    return (
      <div>
        {rk(this.props.rankingStore)}
      </div>
    );
  }

}