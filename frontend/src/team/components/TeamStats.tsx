import * as React from "react";

import { TeamRecords } from "team/components/TeamRecords";
import { ITeamStats } from "team/Team";
import { _b } from "utils/BemHelper";

interface ITeamStatsProps {
  stats: ITeamStats;
}

const b = _b("team-stats");

export function TeamStats({ stats }: ITeamStatsProps): JSX.Element {
  const formValueEntries = stats.form.map((e, idx) => {
    switch (e) {
      case "Win":
        return <span className={b("form-value-entry", { win: true })} key={idx} />;
      case "Draw":
        return <span className={b("form-value-entry", { draw: true })} key={idx} />;
      case "Loss":
        return <span className={b("form-value-entry", { loss: true })} key={idx} />;
    }
  });

  return (
    <div className={b}>
      <div className={b("header")}>Statistics</div>

      <div className={b("content")}>
        <div className={b("form")}>
          <div className={b("form-label")}>Form:</div>
          <div className={b("form-value")}>{formValueEntries}</div>
        </div>

        <div className={b("match-stats")}>
          <div className={b("matches-played")}>
            <span className={b("matches-played-amount")}>{stats.matchesTotal} </span>
            <span className={b("matches-played-label")}>matches played:</span>
          </div>

          <div className={b("results-breakdown")}>
            <div className={b("results-breakdown-category")}>
              <div className={b("results-breakdown-amount")}>{stats.wins}</div>
              <div className={b("results-breakdown-label")}>wins</div>
            </div>
            <div className={b("results-breakdown-category")}>
              <div className={b("results-breakdown-amount")}>{stats.draws}</div>
              <div className={b("results-breakdown-label")}>draws</div>
            </div>
            <div className={b("results-breakdown-category")}>
              <div className={b("results-breakdown-amount")}>{stats.losses}</div>
              <div className={b("results-breakdown-label")}>losses</div>
            </div>
          </div>
        </div>

        <div className={b("goals-breakdown")}>
          <div className={b("goals-breakdown-category")}>
            <div className={b("goals-breakdown-label")}>Goals scored:</div>
            <div className={b("goals-breakdown-amount")}>{stats.goalsFor}</div>
          </div>
          <div className={b("goals-breakdown-category")}>
            <div className={b("goals-breakdown-label")}>Goals conceded:</div>
            <div className={b("goals-breakdown-amount")}>{stats.goalsAgainst}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
