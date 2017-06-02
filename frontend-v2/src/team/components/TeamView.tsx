import * as React from "react";

import { Flag } from "common/components/Flag";
import { observer } from "mobx-react";
import { TeamRankingHistory } from "team/components/TeamRankingHistory";
import { TeamStats } from "team/components/TeamStats";
import { TeamStore } from "team/TeamStore";
import { TeamViewStore } from "team/TeamViewStore";

interface ITeamViewProps {
  teamStore: TeamStore;
  viewStore: TeamViewStore;
}

function TeamView({ teamStore, viewStore }: ITeamViewProps): JSX.Element {
  const isLoading = viewStore.isLoading;
  const team = teamStore.team;

  return !isLoading && (
    <div className="view view--team">
      <div className="team-header">
        <Flag code={team.code} large={true} className="team-header__flag" />
        <span className="team-header__name">{team.name}</span>
      </div>
      <TeamStats stats={team.stats} />
      <TeamRankingHistory rankHistory={team.rankHistory} ratingHistory={team.ratingHistory}/>
    </div>
  );
}

const teamView = observer(TeamView);
export { teamView as TeamView };
