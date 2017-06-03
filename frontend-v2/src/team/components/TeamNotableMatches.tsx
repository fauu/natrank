import * as React from "react";

import { Match } from "results/Match";
import { ResultList } from "results/components/ResultList";
import { ITeamNotableMatchCategory } from "team/ITeamNotableMatchCategory";
import { ITeamNotableMatchGroup } from "team/ITeamNotableMatchGroup";

interface ITeamNotableMatchesProps {
  notableMatchGroups: ITeamNotableMatchGroup[];
}

export function TeamNotableMatches({ notableMatchGroups }: ITeamNotableMatchesProps): JSX.Element {
  return (
    <div className="panel">
      {notableMatchGroups.map((group) => <MatchesForCategory category={group.category} matches={group.matches} />)}
    </div>
  );
}

interface IMatchesForCategoryProps {
  readonly category: ITeamNotableMatchCategory;
  readonly matches: Match[];
}
const MatchesForCategory = ({ category, matches }: IMatchesForCategoryProps) => (
  <div className="category">
    <div className="header">
      {category.name}
    </div>
    <ResultList results={matches} />
  </div>
);
