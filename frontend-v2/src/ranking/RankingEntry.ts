import { v4 as uuid } from 'uuid'

export class RankingEntry {

  id: string = uuid();
  teamName: string;
  teamFlag: string;
  rank: number;
  rankOneYearChange: number;
  rating: number;
  matchesTotal: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  
  static fromJson(json) {
    let rankingEntry = new RankingEntry();
    rankingEntry.teamName = json['team']['name'];
    rankingEntry.teamFlag = json['team']['flag'];
    rankingEntry.rank = json['rank'];
    rankingEntry.rankOneYearChange = json['rankOneYearChange'];
    rankingEntry.rating = json['rating'];
    rankingEntry.matchesTotal = json['matchesTotal'];
    rankingEntry.wins = json['wins'];
    rankingEntry.draws = json['draws'];
    rankingEntry.losses = json['losses'];
    rankingEntry.goalsFor = json['goalsFor'];
    rankingEntry.goalsAgainst = json['goalsAgainst'];
    rankingEntry.goalDifference = json['goalDifference'];

    return rankingEntry;
  }

}