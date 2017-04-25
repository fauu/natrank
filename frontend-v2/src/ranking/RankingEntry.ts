import { v4 as uuid } from 'uuid'

export class RankingEntry {

  id: string = uuid();
  rank: number;
  
  static fromJson(json) {
    let rankingEntry = new RankingEntry();
    rankingEntry.rank = json['rank'];

    return rankingEntry;
  }

}