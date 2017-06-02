import { parseDate } from "common/DateUtils";

export type TeamResult = "Win" | "Draw" | "Loss";

export interface IMatchTeamInfo {
  idx: number;
  id: number;
  name: string;
  flag: string;
  goalCount: number;
  teamResult: TeamResult;
  rank: number;
  rankChange: number;
  rating: number;
  ratingChange: number;
}

const getTeamResult = (teamId: number, winnerId: number): TeamResult => {
  if (winnerId === teamId) {
    return "Win";
  } else if (winnerId) {
    return "Loss";
  } else {
    return "Draw";
  }
};

export class Match {

  public static fromJson(json): Match {
    const match = new Match();

    match.id = json.id;
    match.date = parseDate(json.date);
    match.type = json.type;
    match.city = json.city;
    match.country = json.country;
    match.countryFlag = json.countryFlag;
    match.resultExtra = json.resultExtra;
    match.winnerId = json.idWinner;
    match.penaltyShootout = json.penaltyShootout;

    match.teamInfos = [{
      flag: json.team1.flag,
      goalCount: json.team1Goals,
      id: json.team1.id,
      idx: 0,
      name: json.team1.name,
      rank: json.team1Rank,
      rankChange: json.team1RankChange,
      rating: json.team1Rating,
      ratingChange: json.team1RatingChange,
      teamResult: getTeamResult(json.team1.id, match.winnerId),
    },
    {
      flag: json.team2.flag,
      goalCount: json.team2Goals,
      id: json.team2.id,
      idx: 1,
      name: json.team2.name,
      rank: json.team2Rank,
      rankChange: json.team2RankChange,
      rating: json.team2Rating,
      ratingChange: json.team2RatingChange,
      teamResult: getTeamResult(json.team2.id, match.winnerId),
    }];

    return match;
  }

  public id: number;
  public date: Date;
  public type: string;
  public city: string;
  public country: string;
  public countryFlag: string;
  public resultExtra: string;
  public winnerId: number;
  public penaltyShootout: boolean;
  public teamInfos: [IMatchTeamInfo, IMatchTeamInfo];

}

export interface IMatchTeamJson {
  id: number;
  name: string;
  flag: string;
}

export interface IMatchJson {
  id: number;
  date: string;
  type: string;
  city: string;
  team1Goals: number;
  team2Goals: number;
  resultExtra: string;
  idWinner: number;
  penaltyShootout: boolean;
  team1Rating: number;
  team2Rating: number;
  team1RatingChange: number;
  team2RatingChange: number;
  team1Rank?: number;
  team2Rank?: number;
  team1RankChange?: number;
  team2RankChange?: number;
  countryFlag: string;
  country: string;
  team1: IMatchTeamJson;
  team2: IMatchTeamJson;
}
