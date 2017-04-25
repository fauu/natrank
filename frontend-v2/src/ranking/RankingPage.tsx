import * as React from 'react';
import { RankingStore } from './RankingStore';
import { RankingTable } from './RankingTable';
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
    let rk = (rs: RankingStore) => {
      if (rs.ranking === undefined) {
        return <span>Loading...</span>;
      } else {
        return <RankingTable data={rs.ranking}/>;
      }
    }

    return (
      <div>
        {rk(this.props.rankingStore)}
      </div>
    );
  }

}