import * as React from 'react';
import { paths } from '../app/Config';
import { DateUtils } from '../common/DateUtils';
import { StringUtils } from '../common/StringUtils';
import { Match, MatchTeamInfo } from './Match';
import { Link } from 'react-router';
import { Icon } from '../common/Icon';
import * as classNames from 'classnames';
import { Flag } from '../common/Flag';

interface ResultProps {
  match: Match;
}

export class Result extends React.Component<ResultProps, {}> {

  render() {
    const match = this.props.match;

    return (
      <div className="result">
        <div className="result__row result__row--details">
          <div className="result__detail result__detail--date">
            <Link to={`${paths.ranking}/${DateUtils.stringify(match.date, true, false)}`}>
              {DateUtils.stringify(match.date, false, true)}
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
          <RankingChange teamInfo={match.teamInfos[0]} />
          <div className="result__score-extra">
            {match.resultExtra}
          </div>
          <RankingChange teamInfo={match.teamInfos[1]} />
        </div>
      </div>
    )
  }

}

const Team = (props: { teamInfo: MatchTeamInfo }) => {
  const teamClassNames = classNames({
    'result__team': true,
    'result__team--left': props.teamInfo.idx == 0,
    'result__team--right': props.teamInfo.idx == 1,
    'result__team--winner': props.teamInfo.isWinner
  });
  const teamLinkPath = `${paths.teams}/${StringUtils.urlfriendlify(props.teamInfo.name)}`;

  return (
    <div className={teamClassNames}>
      <Link className={teamClassNames} to={teamLinkPath}>
        <Flag code={props.teamInfo.flag} className="flag result__team-flag" />
        <span className='result__team-name'>
          {props.teamInfo.name}
        </span>
      </Link>
      <span className="result__rating">
        {props.teamInfo.rank > 0 ? props.teamInfo.rating : '–'	
}
      </span>
      <span className="result__rank">
        {props.teamInfo.rank || '–'}
      </span>
    </div>
  )
}

const RankingChange = (props: { teamInfo: MatchTeamInfo }) => {
  let ratingChangeClassModifier = undefined;
  if (props.teamInfo.ratingChange > 0) {
    ratingChangeClassModifier = 'positive';
  } else if (props.teamInfo.ratingChange == 0) {
    ratingChangeClassModifier = 'neutral';
  } else {
    ratingChangeClassModifier = 'negative';
  }

  let rankChangeClassModifier = undefined;
  let rankChangeIcon = undefined;
  if (props.teamInfo.rankChange > 0) {
    rankChangeClassModifier = 'positive';
    rankChangeIcon = 'arrow-top-right';
  } else if (props.teamInfo.rankChange < 0) {
    rankChangeClassModifier = 'negative';
    rankChangeIcon = 'arrow-bottom-right';
  } else {
    rankChangeClassModifier = 'neutral';
  }

  const rankingChangeClassNames = classNames({
    'result__ranking-change': true,
    'result__ranking-change--left': props.teamInfo.idx == 0,
    'result__ranking-change--right': props.teamInfo.idx == 1,
  });

  return (
    <div className={rankingChangeClassNames}>
      {/*<span className={classNames('result__rank-change', `result__rank-change--${rankChangeClassModifier}`)}>
        {rankChangeIcon ? <Icon name={rankChangeIcon} /> : '–'}
        {(props.teamInfo.rankChange != null && props.teamInfo.rankChange != 0) && Math.abs(props.teamInfo.rankChange)}
      </span>*/}
      {props.teamInfo.rank > 0 &&
      <span className={classNames('result__rating-change', `result__rating-change--${ratingChangeClassModifier}`)}>
        {props.teamInfo.ratingChange}
      </span>
      }
    </div>
  )
}