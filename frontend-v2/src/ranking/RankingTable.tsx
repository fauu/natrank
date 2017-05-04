import { inject, observer } from 'mobx-react';
import * as React from 'react';
import * as classNames from 'classnames';
import { Ranking } from './Ranking';
import { RankingTableRow } from './RankingTableRow';

interface RankingTableProps {
  ranking: Ranking
}

export class RankingTable extends React.Component<RankingTableProps, any> {

  static columns = [
    { label: 'Rank',   classModifier: 'rank',                 props: { }            },
    { label: '1y +-',  classModifier: 'rank-one-year-change', props: { }            },
    { label: 'Team',   classModifier: 'team',                 props: { colSpan: 2 } },
    { label: 'Rating', classModifier: 'rating',               props: { }            },
    { label: 'Played',      classModifier: 'total',                props: { }            },
    { label: 'Won',      classModifier: 'wins',                 props: { }            },
    { label: 'Tied',      classModifier: 'draws',                props: { }            },
    { label: 'Lost',      classModifier: 'losses',               props: { }            },
    { label: 'GF',     classModifier: 'goals-for',            props: { }            },
    { label: 'GA',     classModifier: 'goals-against',        props: { }            },
    { label: 'GD',     classModifier: 'goal-difference',      props: { }            }
  ];

  render() {
    const ranking = this.props.ranking;
    const thClassPrefix = 'ranking-header__cell ranking-header__cell--';

    const columns = ranking.isFull ? RankingTable.columns : RankingTable.columns.slice(0, 4);

    return (
      <table className={classNames('ranking', { 'ranking--full': ranking.isFull})}>
        <thead>
          <tr className="ranking-header">
            {columns.map((column, idx) => {
              return (
                <th className={thClassPrefix + column.classModifier} {...column.props} key={idx} >
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ranking.entries.map((entry, idx) => { 
            return <RankingTableRow data={entry} isAlternate={idx % 2 != 0} isFull={ranking.isFull} key={entry.id} />;
          })}
        </tbody>
      </table>
    );
  }

}