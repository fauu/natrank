import * as React from 'react';
import { Link } from 'react-router';
import { Icon } from '../common/Icon';
import { Flag } from '../common/Flag';
import { RankingEntry } from './RankingEntry';

interface RankingTableRowProps {
  data?: RankingEntry;
  isAlternate: boolean;
}

export class RankingTableRow extends React.Component<RankingTableRowProps, any> {

  render() {
    let data = this.props.data;
    let rowClassName = 'ranking-row ranking-row' + 
      (this.props.isAlternate ? '--alternate' : '');

    // TODO: Refactor both of these as methods
    let renderRankChange = () => {
      let delta = data.rankOneYearChange;

      if (delta > 0) {
        return (
          <span className="rank-change rank-change--positive">
            <Icon name="arrow-up"/> {delta}
          </span>
        );
      } else if (delta < 0) {
        return (
          <span className="rank-change rank-change--negative">
            {/* TODO: Make it possible to provide a custom className */}
            <Icon name="arrow-down"/> {Math.abs(delta)}
          </span>
        );
      } else if (delta == 0) {
        ;
      } else if (data.rank > 0) {
        return (
          <span className="new-ranking-entry-indicator">New</span>
        );
      }
    }

    let renderGoalDifference = () => {
      let delta = data.goalDifference;

      let sign = (delta > 0) ? '+' : '';
      let modifier = (delta > 0) 
                     ? 'positive' 
                     : ((delta < 0) ? 'negative' : 'neutral');

      return (
        <span className={"goal-difference goal-difference--" + modifier}>
          {sign}{delta}
        </span>
      )
    }

    return (
      <tr className={rowClassName}>
        <td className="ranking-row__cell ranking-row__cell--rank">
          {data.rank > 0 ? data.rank : ''}
        </td>
        <td className="ranking-row__cell ranking-row__cell--rank-one-year-change">
          {renderRankChange()}
        </td>
        <td className="ranking-row__cell ranking-row__cell--team-flag">
          <Flag code={data.teamFlag} className="flag" />
        </td>
        <td className="ranking-row__cell ranking-row__cell--team-name">
          <Link to={"/teams/" + data.teamName.toLowerCase()}>
            {data.teamName}
          </Link>
        </td>
        <td className="ranking-row__cell ranking-row__cell--rating">
          {data.rating > 0 ? data.rating : ''}
        </td>
        <td className="ranking-row__cell ranking-row__cell--total">
          {data.matchesTotal}
        </td>
        <td className="ranking-row__cell ranking-row__cell--wins">
          {data.wins}
        </td>
        <td className="ranking-row__cell ranking-row__cell--draws">
          {data.draws}
        </td>
        <td className="ranking-row__cell ranking-row__cell--losses">
          {data.losses}
        </td>
        <td className="ranking-row__cell ranking-row__cell--goals-for">
          {data.goalsFor}
        </td>
        <td className="ranking-row__cell ranking-row__cell--goals-against">
          {data.goalsAgainst}
        </td>
        <td className="ranking-row__cell ranking-row__cell--goals-against">
          {renderGoalDifference()}
        </td>
      </tr>
    )
  }

}