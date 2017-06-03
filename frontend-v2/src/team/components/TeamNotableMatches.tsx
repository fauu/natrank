import * as React from "react";

import { Icon } from "common/components/Icon";
import { ResultList } from "results/components/ResultList";
import { Match } from "results/Match";
import { ITeamNotableMatchCategory } from "team/ITeamNotableMatchCategory";
import { ITeamNotableMatchGroup } from "team/ITeamNotableMatchGroup";
import { Team } from "team/Team";
import { _b } from "utils/BemHelper";
import { urlfriendlifyString } from "utils/StringUtils";

interface ITeamNotableMatchesProps {
  readonly team: Team;
  readonly notableMatchGroups: ITeamNotableMatchGroup[];
}

const b = _b("team-notable-matches");

export function TeamNotableMatches({ team, notableMatchGroups }: ITeamNotableMatchesProps): JSX.Element {
  const matchGroups = notableMatchGroups.map((group) =>
    <MatchesForCategory category={group.category} matches={group.matches} povTeamId={team.id} />
  );

  return (
    <div className={b}>
      <div className={b("top-group")}>
        <div className={b("header")}>
          Notable matches
        </div>

        <div className={b("see-all-link")}>
          <a href={`/results/${urlfriendlifyString(team.name)}`}>
            See all matches
            <Icon className={b("see-all-link-icon")} name="chevron-right" />
          </a>
        </div>
      </div>

      {matchGroups}
    </div>
  );
}

interface IMatchesForCategoryProps {
  readonly category: ITeamNotableMatchCategory;
  readonly matches: Match[];
  readonly povTeamId: number;
}
const MatchesForCategory = ({ category, matches, povTeamId }: IMatchesForCategoryProps) => (
  <div className={b("category")}>
    <div className={b("category-header")}>
      {category.name}
    </div>
    <ResultList results={matches} povTeamId={povTeamId} />
  </div>
);
