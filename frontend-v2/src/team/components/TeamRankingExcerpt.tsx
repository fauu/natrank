import * as React from "react";

import { _b } from "utils/BemHelper";
import { RankingTable } from "ranking/components/RankingTable";
import { Ranking } from "ranking/Ranking";

interface ITeamRankingExcerptProps {
  readonly teamId: number;
  readonly rankingExcerpt: Ranking;
}

const b = _b("team-ranking-excerpt");

export function TeamRankingExcerpt({ rankingExcerpt, teamId }: ITeamRankingExcerptProps) {
  return (
    <div className={b}>
      <div className={b("header")}>
        Ranking position
      </div>
      <RankingTable ranking={rankingExcerpt} highlightedTeamId={teamId} />
    </div>
  );
}
