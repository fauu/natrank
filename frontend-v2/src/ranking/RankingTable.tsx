import * as React from 'react';
import { Ranking } from './Ranking';
import { RankingTableRow } from './RankingTableRow';

interface RankingTableProps {
  data?: Ranking;
}

export class RankingTable extends React.Component<RankingTableProps, any> {

  render() {
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
          {this.props.data.entries.map((entry, idx) => { 
            return <RankingTableRow data={entry} isAlternate={idx % 2 != 0} key={entry.id} />
          })}
        </tbody>
      </table>
    );
  }

}