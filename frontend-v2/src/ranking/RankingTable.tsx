import * as classNames from "classnames";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { Ranking } from "./Ranking";
import { RankingTableRow } from "./RankingTableRow";

interface IRankingTableProps {
  ranking: Ranking;
}

export class RankingTable extends React.Component<IRankingTableProps, any> {

  private static columnData = [
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
    { label: "GD",     classModifier: "goal-difference",      props: { }            }
  ];

  public render() {
    const ranking = this.props.ranking;
    const thClassPrefix = "ranking-header__cell ranking-header__cell--";

    const visibleColumnData =
      ranking.isFull
        ? RankingTable.columnData
        : RankingTable.columnData.slice(0, 4);

    const headerCells =
      visibleColumnData.map((column, idx) => (
        <th className={thClassPrefix + column.classModifier} {...column.props} key={idx}>
          {column.label}
        </th>
      ));

    const rows =
      ranking.entries.map((entry, idx) => (
        <RankingTableRow
          data={entry}
          isAlternate={idx % 2 !== 0}
          isFull={ranking.isFull}
          key={entry.id}
        />
      ));

    return (
      <table className={classNames("ranking", { "ranking--full": ranking.isFull})}>
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

}
