import * as React from "react";

import { Ranking } from "ranking/Ranking";
import { RankingTable } from "ranking/components/RankingTable";
import { _b } from "utils/BemHelper";

interface ITeamRankingExcerptProps {
  readonly teamId: number;
  readonly rankingExcerpt: Ranking;
}

const b = _b("team-ranking-excerpt");

export function TeamRankingExcerpt({ rankingExcerpt, teamId }: ITeamRankingExcerptProps): JSX.Element {
  return (
    <div className={b}>
      <div className={b("header")}>
        Ranking position
      </div>
      <RankingTable ranking={rankingExcerpt} highlightedTeamId={teamId} />
    </div>
  );
}
