import { RankingEntry } from './RankingEntry';

export class Ranking {

  date: Date;
  entries: RankingEntry[];

  static fromJson(json): Ranking {
    let ranking = new Ranking();

    ranking.date = new Date(1900, 1, 1);
    ranking.entries = [];
    for (var jsonEntry of json.entries) {
      let entry = RankingEntry.fromJson(jsonEntry);
      ranking.entries.push(entry);
    }

    return ranking;
  }
  
}