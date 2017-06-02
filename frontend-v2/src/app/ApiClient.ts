import { stringifyDate } from "common/DateUtils";
import { IPageJson } from "common/Page";
import { IRankingJson } from "ranking/Ranking";
import { IMatchJson } from "results/Match";
import { ITeamJson, TeamFormData, TeamRankHistoryData, TeamRatingHistoryData } from "team/Team";

export class ApiClient {

  private static readonly baseUrl = "http://localhost:8080";

  public async getRankingJson(date?: Date): Promise<IRankingJson> {
    const param = date ? stringifyDate(date, true) : "latest";

    return this.fetchJson(`/rankings/${param}`);
  }

  public async getMatchPageJson(no: number, team?: string, year?: number): Promise<IPageJson<IMatchJson>> {
    const modifier = team ? `/team/${team}` : (year ? `/year/${year}` : "");

    return this.fetchJson(`/matches${modifier}?page=${no}`);
  }

  public async getTeamJson(name: string): Promise<ITeamJson> {
    return this.fetchJson(`/teams/${name}`);
  }

  public async getTeamFormData(name: string): Promise<TeamFormData> {
    return this.fetchJson(`/matches/form/team/${name}`);
  }

  public async getTeamRankHistoryData(name: string): Promise<TeamRankHistoryData> {
    return this.fetchJson(`/teams/${name}/ranks`);
  }

  public async getTeamRatingHistoryData(name: string): Promise<TeamRatingHistoryData> {
    return this.fetchJson(`/teams/${name}/ratings`);
  }

  private async fetchJson(url: string): Promise<any> {
    const fullUrl = ApiClient.baseUrl + url;
    const options: RequestInit = { mode: "cors" };

    const response = await fetch(fullUrl, options);
    const json = await response.json();

    return response.ok ? json : Promise.reject(json);
  }

}
