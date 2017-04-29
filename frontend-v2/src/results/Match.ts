import { DateUtils } from '../common/DateUtils';

export class Match {

  id: number;
  date: Date;
  type: string;
  city: string;
  country: string;
  countryFlag: string;
  goalCounts: [number, number];
  resultExtra: string;
  winnerId: number;
  penaltyShootout: boolean;
  ratings: [number, number];
  ratingChanges: [number, number];
  ranks: [number, number];
  rankChanges: [number, number];
  teamNames: [string, string];
  teamFlags: [string, string];

  static fromJson(json) {
    const match = new Match();

    match.id = json['id'];
    match.date = DateUtils.parse(json['date']);
    match.type = json['type'];
    match.city = json['city'];
    match.country = json['country'];
    match.countryFlag = json['countryFlag'];
    match.goalCounts = [json['team1Goals'], json['team2Goals']];
    match.resultExtra = json['resultExtra'];
    match.winnerId = json['idWinner'];
    match.penaltyShootout = json['penaltyShootout'];
    match.ratings = [json['team1Rating'], json['team2Rating']];
    match.ratingChanges = [json['team1RatingChange'], json['team2RatingChange']];
    match.ranks = [json['team1Rank'], json['team2Rank']];
    match.rankChanges = [json['team1RankChange'], json['team2RankChange']];
    match.teamNames = [json['team1']['name'], json['team2']['name']];
    match.teamFlags = [json['team1']['flag'], json['team2']['flag']];

    return match;
  }

}