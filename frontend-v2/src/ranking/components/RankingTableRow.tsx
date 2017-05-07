import * as classNames from "classnames";
import { Flag } from "common/components/Flag";
import { Icon } from "common/components/Icon";
import { RankingEntry } from "ranking/RankingEntry";
import * as React from "react";
import { Link } from "react-router";

interface IRankingTableRowProps {
  data?: RankingEntry;
  isAlternate: boolean;
  isFull: boolean;
}

export class RankingTableRow extends React.Component<IRankingTableRowProps, any> {

  public render() {
    const data = this.props.data;

    const rowClassName = classNames({
      "ranking-row": true,
      "ranking-row--alternate": this.props.isAlternate,
    });

    const cellsForExtraColumns = this.props.isFull ? [
      (
        <td className="ranking-row__cell ranking-row__cell--total" key={1}>
          {data.matchesTotal}
        </td>
      ),
      (
        <td className="ranking-row__cell ranking-row__cell--wins" key={2}>
          {data.wins}
        </td>
      ),
      (
        <td className="ranking-row__cell ranking-row__cell--draws" key={3}>
          {data.draws}
        </td>
      ),
      (
        <td className="ranking-row__cell ranking-row__cell--losses" key={4}>
          {data.losses}
        </td>
      ),
      (
        <td className="ranking-row__cell ranking-row__cell--goals-for" key={5}>
          {data.goalsFor}
        </td>
      ),
      (
        <td className="ranking-row__cell ranking-row__cell--goals-against" key={6}>
          {data.goalsAgainst}
        </td>
      ),
      (
        <td className="ranking-row__cell ranking-row__cell--goal-difference" key={7}>
          <GoalDifference value={data.goalDifference} />
        </td>
      ),
    ] : null;

    return (
      <tr className={rowClassName}>
        <td className="ranking-row__cell ranking-row__cell--rank">
          {data.rank > 0 && data.rank}
        </td>
        <td className="ranking-row__cell ranking-row__cell--rank-one-year-change">
          <RankChange rank={data.rank} rankChange={data.rankOneYearChange} />
        </td>
        <td className="ranking-row__cell ranking-row__cell--team-flag">
          <Flag code={data.teamFlag} className="flag" />
        </td>
        <td className="ranking-row__cell ranking-row__cell--team-name">
          <Link to={`/teams/${data.teamName.toLowerCase()}`}>
            {data.teamName}
          </Link>
        </td>
        <td className="ranking-row__cell ranking-row__cell--rating">
          {data.rating > 0 ? data.rating : ""}
        </td>
        {cellsForExtraColumns}
      </tr>
    );
  }

}

const RankChange = ({rank, rankChange}) => {
  const delta = rankChange;

  if (delta > 0) {
    return (
      <span className="rank-change rank-change--positive">
        <Icon name="arrow-top-right"/> {delta}
      </span>
    );
  } else if (delta < 0) {
    return (
      <span className="rank-change rank-change--negative">
        <Icon name="arrow-bottom-right"/> {Math.abs(delta)}
      </span>
    );
  } else if (delta == null && rank > 0) {
    return (
      <span className="new-ranking-entry-indicator">
        New
      </span>
    );
  } else {
    return null;
  }
};

const GoalDifference = ({value}) => {
  const delta = value;

  const goalDifferenceClassName = classNames({
    "goal-difference": true,
    "goal-difference--negative": delta < 0,
    "goal-difference--neutral": delta === 0,
    "goal-difference--positive": delta > 0,
  });
  const sign = (delta > 0) ? "+" : "";

  return (
    <span className={goalDifferenceClassName}>
      {sign}{delta}
    </span>
  );
};
