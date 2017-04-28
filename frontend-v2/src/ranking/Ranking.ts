import { DateUtils } from '../common/DateUtils';
import { RankingEntry } from './RankingEntry';

export class Ranking {

  date: Date;
  entries: RankingEntry[];
  isFull: boolean;

  static fromJson(json): Ranking {
    const ranking = new Ranking();

    ranking.date = DateUtils.parse(json['date']);
    ranking.entries = [];
    for (const jsonEntry of json.entries) {
      const entry = RankingEntry.fromJson(jsonEntry);
      ranking.entries.push(entry);
    }
    // FIXME: Hacky
    ranking.isFull = (json['fullVariantAvailable'] === undefined);

    return ranking;
  }
  
}