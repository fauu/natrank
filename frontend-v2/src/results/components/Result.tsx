// tslint:disable:object-literal-sort-keys
import * as React from "react";

import { _b } from "common/BemHelper";
import { Flag } from "common/components/Flag";
import { Icon } from "common/components/Icon";
import { stringifyDate } from "common/DateUtils";
import { urlfriendlifyString } from "common/StringUtils";
import { IMatchTeamInfo, Match, TeamResult } from "results/Match";

interface IResultProps {
  readonly match: Match;
  readonly povTeamId?: number;
}

const b = _b("result");

export function Result({ match, povTeamId }: IResultProps): JSX.Element {
  let povTeamResult: TeamResult;
  if (match.teamInfos[0].id === povTeamId) {
    povTeamResult = match.teamInfos[0].teamResult;
  } else if (match.teamInfos[1].id === povTeamId) {
    povTeamResult = match.teamInfos[1].teamResult;
  }

  const classNames = b({
    "pov-team-won": povTeamResult === "Win",
    "pov-team-drawn": povTeamResult === "Draw",
    "pov-team-lost": povTeamResult === "Loss",
  });

  return (
    <div className={classNames}>
      <div className={b("row", { details: true })}>
        <div className={b("detail", { date: true })}>
          <a href={`/ranking/${stringifyDate(match.date, { padded: false, friendly: false })}`}>
            {stringifyDate(match.date, { padded: false, friendly: true })}
          </a>
        </div>
        <div className={b("detail", { venue: true })}>
          {match.city}, {match.country}
        </div>
        <div className={b("detail", { type: true })}>
          {match.type}
        </div>
      </div>
      <div className={b("row", { main: true })}>
        <Team teamInfo={match.teamInfos[0]} />
        <div className={b("score")}>
          {match.teamInfos[0].goalCount} : {match.teamInfos[1].goalCount}
        </div>
        <Team teamInfo={match.teamInfos[1]} />
      </div>
      <div className={b("row", { secondary: true })}>
        {<RankingChange teamInfo={match.teamInfos[0]} />}
        <div className={b("score-extra")}>
          {match.resultExtra}
        </div>
        {<RankingChange teamInfo={match.teamInfos[1]} />}
      </div>
    </div>
  );
}

interface ITeamProps {
  readonly teamInfo: IMatchTeamInfo;
}
const Team = ({ teamInfo }: ITeamProps) => {
  const teamClassNames = b("team", {
    left: teamInfo.idx === 0,
    right: teamInfo.idx === 1,
    winner: teamInfo.teamResult === "Win",
  });
  const teamLinkPath = `/teams/${urlfriendlifyString(teamInfo.name)}`;

  return (
    <div className={teamClassNames}>
      <a className={teamClassNames} href={teamLinkPath}>
        <Flag code={teamInfo.flag} className={b("team-flag").mix("flag")} />
        <span className={b("team-name")}>
          {teamInfo.name}
        </span>
      </a>
      <span className={b("rating")}>
        {teamInfo.rank > 0 ? teamInfo.rating : "–"}
      </span>
      <span className={b("rank")}>
        {teamInfo.rank || "–"}
      </span>
    </div>
  );
};

interface IRankingChangeProps {
  teamInfo: IMatchTeamInfo;
}
const RankingChange = ({ teamInfo }: IRankingChangeProps) => {
  const rankingChangeClassName = b("ranking-change", {
    left: teamInfo.idx === 0,
    right: teamInfo.idx === 1,
  });

  const ratingChangeClassName = b("rating-change", {
    negative: teamInfo.ratingChange < 0,
    neutral: teamInfo.ratingChange === 0,
    positive: teamInfo.ratingChange > 0,
  });

  const ratingChange = teamInfo.rank > 0 && (
    <span className={ratingChangeClassName}>
      {teamInfo.ratingChange}
    </span>
  );

  return (
    <div className={rankingChangeClassName}>
      {ratingChange}
    </div>
  );
};
