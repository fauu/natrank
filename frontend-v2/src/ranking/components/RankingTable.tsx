import * as React from "react";

import { Ranking } from "ranking/Ranking";
import { RankingTableRow } from "ranking/components/RankingTableRow";
import { _b } from "utils/BemHelper";

interface IRankingTableProps {
  readonly ranking: Ranking;
  readonly isExcerpt?: boolean;
  readonly highlightedTeamId?: number;
}

const b = _b;

export function RankingTable({ ranking, isExcerpt, highlightedTeamId }: IRankingTableProps): JSX.Element {
  const visibleColumnData = ranking.isFull ? columnData : columnData.slice(0, 4);

  const headerCells =
    visibleColumnData.map((column, idx) => (
      <th
        key={idx}
        className={b("ranking-header")("cell", { [`${column.classModifier}`]: true })}
        {...column.props}
      >
        {column.label}
      </th>
    ));

  const rows =
    ranking.entries.map((entry, idx) => (
      <RankingTableRow
        data={entry}
        isAlternate={idx % 2 !== 0}
        isFull={ranking.isFull}
        isHighlighted={entry.teamId === highlightedTeamId}
        key={entry.id}
      />
    ));

  return (
    <table className={b("ranking")({ full: ranking.isFull, excerpt: isExcerpt })}>
      <thead>
        <tr className="ranking-header">
          {headerCells}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

const columnData = [
  { label: "Rank",   classModifier: "rank",                 props: { }            },
  { label: "1y +-",  classModifier: "rank-one-year-change", props: { }            },
  { label: "Team",   classModifier: "team",                 props: { colSpan: 2 } },
  { label: "Rating", classModifier: "rating",               props: { }            },
  { label: "P",      classModifier: "total",                props: { }            },
  { label: "W",      classModifier: "wins",                 props: { }            },
  { label: "D",      classModifier: "draws",                props: { }            },
  { label: "L",      classModifier: "losses",               props: { }            },
  { label: "GF",     classModifier: "goals-for",            props: { }            },
  { label: "GA",     classModifier: "goals-against",        props: { }            },
  { label: "GD",     classModifier: "goal-difference",      props: { }            },
];
