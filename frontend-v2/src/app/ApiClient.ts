import { stringifyDate } from "common/DateUtils";

export class ApiClient {

  private static readonly baseUrl = "http://localhost:8080";

  public async getRankingJson(date?: Date): Promise<{}> {
    const param = date ? stringifyDate(date, true) : "latest";

    return this.fetchJson(`/rankings/${param}`);
  }

  public async getMatchPageJson(no: number, team?: string, year?: number): Promise<{}> {
    const modifier = team ? `/team/${team}` : (year ? `/year/${year}` : "");

    return this.fetchJson(`/matches${modifier}?page=${no}`);
  }

  public async getTeamJson(name: string): Promise<{}> {
    return this.fetchJson(`/teams/${name}`);
  }

  public async getTeamForm(name: string): Promise<number[]> {
    return this.fetchJson(`/matches/form/team/${name}`) as Promise<number[]>;
  }

  private async fetchJson(url: string): Promise<{} | any[]> {
    const fullUrl = ApiClient.baseUrl + url;
    const options: RequestInit = { mode: "cors" };

    const response = await fetch(fullUrl, options);
    const json = await response.json();

    return response.ok ? json : Promise.reject(json);
  }

}
