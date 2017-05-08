import { parseDate } from "common/DateUtils";
import { RankingEntry } from "ranking/RankingEntry";

export class Ranking {

  public static fromJson(json): Ranking {
    const ranking = new Ranking();

    ranking.date = parseDate(json.date);
    ranking.entries = [];
    for (const jsonEntry of json.entries) {
      const entry = RankingEntry.fromJson(jsonEntry);
      ranking.entries.push(entry);
    }
    // FIXME: Hacky
    ranking.isFull = (json.fullVariantAvailable === undefined);

    return ranking;
  }

  public date: Date;
  public entries: RankingEntry[];
  public isFull: boolean;

}
