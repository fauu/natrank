import { DateUtils } from '../common/DateUtils';

export interface MatchTeamInfo {

  idx: number;
  id: number;
  name: string;
  flag: string;
  goalCount: number;
  isWinner: boolean;
  rank: number;
  rankChange: number;
  rating: number;
  ratingChange: number;

}

export class Match {

  id: number;
  date: Date;
  type: string;
  city: string;
  country: string;
  countryFlag: string;
  resultExtra: string;
  winnerId: number;
  penaltyShootout: boolean;
  teamInfos: [MatchTeamInfo, MatchTeamInfo];

  static fromJson(json) {
    const match = new Match();

    match.id = json['id'];
    match.date = DateUtils.parse(json['date']);
    match.type = json['type'];
    match.city = json['city'];
    match.country = json['country'];
    match.countryFlag = json['countryFlag'];
    match.resultExtra = json['resultExtra'];
    match.winnerId = json['idWinner'];
    match.penaltyShootout = json['penaltyShootout'];

    match.teamInfos = [{
      idx: 0,
      id: json['team1']['id'],
      name: json['team1']['name'],
      flag: json['team1']['flag'],
      goalCount: json['team1Goals'],
      isWinner: match.winnerId == json['team1']['id'],
      rank: json['team1Rank'],
      rankChange: json['team1RankChange'],
      rating: json['team1Rating'],
      ratingChange: json['team1RatingChange']
    },
    {
      idx: 1,
      id: json['team2']['id'],
      name: json['team2']['name'],
      flag: json['team2']['flag'],
      goalCount: json['team2Goals'],
      isWinner: match.winnerId == json['team2']['id'],
      rank: json['team2Rank'],
      rankChange: json['team2RankChange'],
      rating: json['team2Rating'],
      ratingChange: json['team2RatingChange']
    }];

    return match;
  }

}