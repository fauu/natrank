import * as React from "react";

import { _b } from "common/BemHelper";
import { ITeamStats } from "team/Team";

interface ITeamStatsProps {
  stats: ITeamStats;
}

const b = _b("team-stats");

export function TeamStats({ stats }: ITeamStatsProps): JSX.Element {
  const formValueEntries = stats.form.map((e) => {
    switch (e) {
      case "Win":
        return <span className={b("form-value-entry", { win: true })} />;
      case "Draw":
        return <span className={b("form-value-entry", { draw: true })} />;
      case "Loss":
        return <span className={b("form-value-entry", { loss: true })} />;
    }
  });

  return (
    <div className={b}>
      <div className={b("header")}>
        Statistics
      </div>
      <div className={b("matches-played")}>
        <span className={b("matches-played-amount")}>{stats.matchesTotal} </span>
        <span className={b("matches-played-label")}>matches played:</span>
        {/*({stats.matchesHomePercentage}% on home turf):*/}
      </div>

      <div className={b("results-breakdown")}>
        <div className={b("results-breakdown-category")}>
          <div className={b("results-breakdown-amount")}>
            {stats.wins}
            {/*<div className={b("results-breakdown-percentage")}>
              ({stats.winPercentage}%)
            </div>*/}
          </div>
          <div className={b("results-breakdown-label")}>
            wins
          </div>
        </div>
        <div className={b("results-breakdown-category")}>
          <div className={b("results-breakdown-amount")}>
            {stats.draws}
          </div>
          <div className={b("results-breakdown-label")}>
            draws
          </div>
        </div>
        <div className={b("results-breakdown-category")}>
          <div className={b("results-breakdown-amount")}>
            {stats.losses}
          </div>
          <div className={b("results-breakdown-label")}>
            losses
          </div>
        </div>
      </div>

      <div className={b("goals-breakdown")}>
        <div className={b("goals-breakdown-category")}>
          <div className={b("goals-breakdown-label")}>Goals scored: </div>
          <div className={b("goals-breakdown-amount")}>{stats.goalsFor} </div>
        </div>
        <div className={b("goals-breakdown-category")}>
          <div className={b("goals-breakdown-label")}>Goals conceded: </div>
          <div className={b("goals-breakdown-amount")}>{stats.goalsAgainst} </div>
        </div>
      </div>

      <div className={b("form")}>
        <div className={b("form-label")}>
          Form:
        </div>
        <div className={b("form-value")}>
          {formValueEntries}
        </div>
      </div>

      <table className={b("records")}>
        <thead>
          <tr>
            <th />
            <th>Highest</th>
            <th>Lowest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rank</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
