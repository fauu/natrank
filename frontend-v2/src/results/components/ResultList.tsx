import * as React from "react";

import { Result } from "results/components/Result";
import { Match } from "results/Match";

interface IResultListProps {
  readonly results: Match[];
}

export function ResultList({ results }: IResultListProps): JSX.Element {
  return (
    <div className="result-list">
      {results.map((match) => ( <Result match={match} key={match.id} /> ))}
    </div>
  );
}
