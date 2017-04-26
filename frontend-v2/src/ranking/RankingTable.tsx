import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as Spinner from 'react-spinner';
import { Ranking } from './Ranking';
import { RankingStore } from './RankingStore';
import { RankingTableRow } from './RankingTableRow';

interface RankingTableProps {
  rankingStore?: RankingStore
}

@inject('rankingStore')
@observer
export class RankingTable extends React.Component<RankingTableProps, any> {

  render() {
    const ranking = this.props.rankingStore.ranking;

    if (!ranking) {
      return <Spinner />;
    } else {
      return (
        <table className="ranking">
          <thead>
            <tr className="ranking-header">
              <th className="ranking-header__cell ranking-header__cell--rank">Rank</th>
              <th className="ranking-header__cell ranking-header__cell--rank-one-year-change">1y +-</th>
              <th className="ranking-header__cell ranking-header__cell--team" colSpan={2}>Team</th>
              <th className="ranking-header__cell ranking-header__cell--rating">Rating</th>
              <th className="ranking-header__cell ranking-header__cell--total">P</th>
              <th className="ranking-header__cell ranking-header__cell--wins">W</th>
              <th className="ranking-header__cell ranking-header__cell--draws">D</th>
              <th className="ranking-header__cell ranking-header__cell--losses">L</th>
              <th className="ranking-header__cell ranking-header__cell--goals-for">GF</th>
              <th className="ranking-header__cell ranking-header__cell--goals-against">GA</th>
              <th className="ranking-header__cell ranking-header__cell--goal-difference">GD</th>
            </tr>
          </thead>
          <tbody>
            {ranking.entries.map((entry, idx) => { 
              return <RankingTableRow data={entry} isAlternate={idx % 2 != 0} key={entry.id} />
            })}
          </tbody>
        </table>
      );
    }
  }

}