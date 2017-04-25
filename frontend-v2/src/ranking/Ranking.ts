import { RankingEntry } from './RankingEntry';

export class Ranking {

  date: Date;
  entries: RankingEntry[];

  static fromJson(json): Ranking {
    let ranking = new Ranking();

    ranking.date = this.parseDate(json['date']);
    ranking.entries = [];
    for (var jsonEntry of json.entries) {
      let entry = RankingEntry.fromJson(jsonEntry);
      ranking.entries.push(entry);
    }

    return ranking;
  }

  // http://stackoverflow.com/a/2587398
  private static parseDate(dateString: string): Date {
    let parts: number[] = dateString.split('-').map(part => Number(part));

    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  
}