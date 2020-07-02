export type TeamRankingHistoryJson = ITeamRankingHistoryJsonEntry[];
export type TeamRankHistoryJson = TeamRankingHistoryJson;
export type TeamRatingHistoryJson = TeamRankingHistoryJson;

export interface ITeamRankingHistoryJsonEntry {
  id: number;
  date: string;
  value: number;
}
