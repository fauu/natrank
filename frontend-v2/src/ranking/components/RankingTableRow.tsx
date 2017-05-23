import * as classNames from "classnames";
import * as React from "react";

import { Flag } from "common/components/Flag";
import { Icon } from "common/components/Icon";
import { RankingEntry } from "ranking/RankingEntry";

interface IRankingTableRowProps {
  readonly data?: RankingEntry;
  readonly isAlternate: boolean;
  readonly isFull: boolean;
}

export function RankingTableRow({ data, isAlternate, isFull}: IRankingTableRowProps): JSX.Element {
  const rowClassName: string = classNames({
    "ranking-row": true,
    "ranking-row--alternate": isAlternate,
  });

  let i = 0;

  const cellsForBaseColumns = [
    (
      <td className={cellClassName("rank")} key={i++}>
        {data.rank > 0 && data.rank}
      </td>
    ),
    (
      <td className={cellClassName("rank-one-year-change")} key={i++}>
        <RankChange rank={data.rank} rankChange={data.rankOneYearChange} />
      </td>
    ),
    (
      <td className={cellClassName("team-flag")} key={i++}>
        <Flag code={data.teamFlag} className="flag" />
      </td>
    ),
    (
      <td className={cellClassName("team-name")} key={i++}>
        <a href={`/teams/${data.teamName.toLowerCase()}`}>
          {data.teamName}
        </a>
      </td>
    ),
    (
      <td className={cellClassName("rating")} key={i++}>
        {data.rating > 0 ? data.rating : ""}
      </td>
    ),
  ];

  const cellsForExtraColumns = isFull ? [
    (
      <td className={cellClassName("total")} key={i++}>
        {data.matchesTotal}
      </td>
    ),
    (
      <td className={cellClassName("wins")} key={i++}>
        {data.wins}
      </td>
    ),
    (
      <td className={cellClassName("draws")} key={i++}>
        {data.draws}
      </td>
    ),
    (
      <td className={cellClassName("losses")} key={i++}>
        {data.losses}
      </td>
    ),
    (
      <td className={cellClassName("goals-for")} key={i++}>
        {data.goalsFor}
      </td>
    ),
    (
      <td className={cellClassName("goals-against")} key={i++}>
        {data.goalsAgainst}
      </td>
    ),
    (
      <td className={cellClassName("goal-difference")} key={i++}>
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

const cellClassName = (modifier: string): string =>
  `ranking-row__cell ranking-row__cell--${modifier}`;

interface IRankChangeProps {
  readonly rank: number;
  readonly rankChange: number;
}
function RankChange({rank, rankChange}: IRankChangeProps): JSX.Element {
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
}

interface IGoalDifferenceProps {
  readonly value: number;
}
function GoalDifference({value}): JSX.Element {
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
}
