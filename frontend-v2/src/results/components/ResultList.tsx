import * as React from "react";

import { _b } from "utils/BemHelper";
import { Result } from "results/components/Result";
import { Match } from "results/Match";

interface IResultListProps {
  readonly results: Match[];
  readonly povTeamId?: number;
}

const b = _b("result-list");

export function ResultList({ results, povTeamId }: IResultListProps): JSX.Element {
  return (
    <div className={b({ "for-team": povTeamId !== undefined })}>
      {results.map((match) => ( <Result match={match} povTeamId={povTeamId} key={match.id} /> ))}
    </div>
  );
}
