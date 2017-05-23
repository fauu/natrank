import * as classNames from "classnames";
import * as React from "react";
import { Link } from "react-router";

import { Flag } from "common/components/Flag";
import { Icon } from "common/components/Icon";
import { stringifyDate } from "common/DateUtils";
import { urlfriendlifyString } from "common/StringUtils";
import { IMatchTeamInfo, Match } from "results/Match";

interface IResultProps {
  readonly match: Match;
}

export function Result({ match }: IResultProps) {
  return (
    <div className="result">
      <div className="result__row result__row--details">
        <div className="result__detail result__detail--date">
          <Link to={`/ranking/${stringifyDate(match.date, true, false)}`}>
            {stringifyDate(match.date, false, true)}
          </Link>
        </div>
        <div className="result__detail result__detail--venue">
          {match.city}, {match.country}
        </div>
        <div className="result__detail result__detail--type">
          {match.type}
        </div>
      </div>
      <div className="result__row result__row--main">
        <Team teamInfo={match.teamInfos[0]} />
        <div className="result__score">
          {match.teamInfos[0].goalCount} : {match.teamInfos[1].goalCount}
        </div>
        <Team teamInfo={match.teamInfos[1]} />
      </div>
      <div className="result__row result__row--secondary">
        {<RankingChange teamInfo={match.teamInfos[0]} />}
        <div className="result__score-extra">
          {match.resultExtra}
        </div>
        {<RankingChange teamInfo={match.teamInfos[1]} />}
      </div>
    </div>
  );
}

const Team = (props: { teamInfo: IMatchTeamInfo }) => {
  const teamClassNames = classNames({
    "result__team": true,
    "result__team--left": props.teamInfo.idx === 0,
    "result__team--right": props.teamInfo.idx === 1,
    "result__team--winner": props.teamInfo.isWinner,
  });
  const teamLinkPath = `/teams/${urlfriendlifyString(props.teamInfo.name)}`;

  return (
    <div className={teamClassNames}>
      <Link className={teamClassNames} to={teamLinkPath}>
        <Flag code={props.teamInfo.flag} className="flag result__team-flag" />
        <span className="result__team-name">
          {props.teamInfo.name}
        </span>
      </Link>
      <span className="result__rating">
        {props.teamInfo.rank > 0 ? props.teamInfo.rating : "–"}
      </span>
      <span className="result__rank">
        {props.teamInfo.rank || "–"}
      </span>
    </div>
  );
};

const RankingChange = (props: { teamInfo: IMatchTeamInfo }) => {
  let ratingChangeClassModifier;
  if (props.teamInfo.ratingChange > 0) {
    ratingChangeClassModifier = "positive";
  } else if (props.teamInfo.ratingChange === 0) {
    ratingChangeClassModifier = "neutral";
  } else {
    ratingChangeClassModifier = "negative";
  }

  let rankChangeClassModifier;
  let rankChangeIcon;
  if (props.teamInfo.rankChange > 0) {
    rankChangeClassModifier = "positive";
    rankChangeIcon = "arrow-top-right";
  } else if (props.teamInfo.rankChange < 0) {
    rankChangeClassModifier = "negative";
    rankChangeIcon = "arrow-bottom-right";
  } else {
    rankChangeClassModifier = "neutral";
  }

  const rankingChangeClassName = classNames({
    "result__ranking-change": true,
    "result__ranking-change--left": props.teamInfo.idx === 0,
    "result__ranking-change--right": props.teamInfo.idx === 1,
  });

  const ratingChangeClassName = classNames(
    "result__rating-change",
    `result__rating-change--${ratingChangeClassModifier}`,
  );

  const ratingChange = props.teamInfo.rank > 0 && (
    <span className={ratingChangeClassName}>
      {props.teamInfo.ratingChange}
    </span>
  );

  return (
    <div className={rankingChangeClassName}>
      {ratingChange}
    </div>
  );
};
