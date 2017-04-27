import { RankingEntry } from './RankingEntry';

export class Ranking {

  date: Date;
  entries: RankingEntry[];
  isFull: boolean;

  static fromJson(json): Ranking {
    const ranking = new Ranking();

    ranking.date = this.parseDate(json['date']);
    ranking.entries = [];
    for (const jsonEntry of json.entries) {
      const entry = RankingEntry.fromJson(jsonEntry);
      ranking.entries.push(entry);
    }
    // FIXME: Hacky
    ranking.isFull = (json['fullVariantAvailable'] === undefined);

    return ranking;
  }

  // http://stackoverflow.com/a/2587398
  static parseDate(dateString: string): Date {
    const parts: number[] = dateString.split('-').map(part => Number(part));

    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  
}