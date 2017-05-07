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

  private static cellClassName = (modifier) => `ranking-row__cell ranking-row__cell--${modifier}`;

  public render() {

    const data = this.props.data;

    const rowClassName = classNames({
      "ranking-row": true,
      "ranking-row--alternate": this.props.isAlternate,
    });

    let i = 0;

    const cellsForBaseColumns = [
      (
        <td className={RankingTableRow.cellClassName("rank")} key={i++}>
          {data.rank > 0 && data.rank}
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("rank-one-year-change")} key={i++}>
          <RankChange rank={data.rank} rankChange={data.rankOneYearChange} />
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("team-flag")} key={i++}>
          <Flag code={data.teamFlag} className="flag" />
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("team-name")} key={i++}>
          <Link to={`/teams/${data.teamName.toLowerCase()}`}>
            {data.teamName}
          </Link>
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("rating")} key={i++}>
          {data.rating > 0 ? data.rating : ""}
        </td>
      ),
    ];

    const cellsForExtraColumns = this.props.isFull ? [
      (
        <td className={RankingTableRow.cellClassName("total")} key={i++}>
          {data.matchesTotal}
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("wins")} key={i++}>
          {data.wins}
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("draws")} key={i++}>
          {data.draws}
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("losses")} key={i++}>
          {data.losses}
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("goals-for")} key={i++}>
          {data.goalsFor}
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("goals-against")} key={i++}>
          {data.goalsAgainst}
        </td>
      ),
      (
        <td className={RankingTableRow.cellClassName("goal-difference")} key={i++}>
          <GoalDifference value={data.goalDifference} />
        </td>
      ),
    ] : null;

    return (
      <tr className={rowClassName}>
        {cellsForBaseColumns}
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
