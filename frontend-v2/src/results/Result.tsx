import * as React from 'react';
import { DateUtils } from '../common/DateUtils';
import { Match, MatchTeamInfo } from './Match';
import { Link } from 'react-router';
import * as classNames from 'classnames';
import { Flag } from '../common/Flag';

interface ResultProps {
  match: Match;
}

export class Result extends React.Component<ResultProps, {}> {

  Team = (props: { teamInfo: MatchTeamInfo }) => {
    const teamClassNames = classNames({
      'result__team': true,
      'result__team--left': props.teamInfo.idx == 0,
      'result__team--right': props.teamInfo.idx == 1,
      'result__team--winner': props.teamInfo.isWinner
    });

    return (
      <div className={teamClassNames}>
        <Flag code={props.teamInfo.flag} className="flag result__team-flag" />
        <Link to={"/teams/" + props.teamInfo.name.toLowerCase()}>
          {props.teamInfo.name}
        </Link>
      </div>
    )
  }

  RankingInfo = (props: { teamInfo: MatchTeamInfo }) => {
    let ratingChangeClassModifier = null;
    if (props.teamInfo.ratingChange > 0) {
      ratingChangeClassModifier = 'positive';
    } else if (props.teamInfo.ratingChange == 0) {
      ratingChangeClassModifier = 'neutral';
    } else {
      ratingChangeClassModifier = 'negative';
    }

    const rankingInfoClassNames = classNames({
      'result__ranking-info': true,
      'result__ranking-info--left': props.teamInfo.idx == 0,
      'result__ranking-info--right': props.teamInfo.idx == 1,
    });

    return (
      <div className={rankingInfoClassNames}>
        {props.teamInfo.rating}
        <span className={classNames('result__rating-change', `result__rating-change--${ratingChangeClassModifier}`)}>
          {props.teamInfo.ratingChange}
        </span>
      </div>
    )
  }
  
  render() {
    const match = this.props.match;

    return (
      <div className="result">
        <div className="result__row result__row--details">
          <div className="result__detail result__detail--date">
            {DateUtils.stringify(match.date, false, true)}
          </div>
          <div className="result__detail result__detail--venue">
            {match.city}, {match.country}
          </div>
          <div className="result__detail result__detail--type">
            {match.type}
          </div>
        </div>
        <div className="result__row result__row--main">
          <this.Team teamInfo={match.teamInfos[0]} />
          <div className="result__score">
            {match.teamInfos[0].goalCount} : {match.teamInfos[1].goalCount}
          </div>
          <this.Team teamInfo={match.teamInfos[1]} />
        </div>
        <div className="result__row result__row--secondary">
          <this.RankingInfo teamInfo={match.teamInfos[0]} />
          <div className="result__score-extra">
            {/* AET / PEN */}
          </div>
          <this.RankingInfo teamInfo={match.teamInfos[1]} />
        </div>
      </div>
    )
  }

  }