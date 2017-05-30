import { stringifyDate } from "common/DateUtils";

export class ApiClient {

  private static readonly baseUrl = "http://localhost:8080";

  public async getRankingJson(date?: Date): Promise<{}> {
    const param = date ? stringifyDate(date, true) : "latest";

    return this.fetchJson(`/rankings/${param}`);
  }

  public async getMatchPageJson(pageNo: number, team?: string, year?: number): Promise<{}> {
    const modifier = team ? `/team/${team}` : (year ? `/year/${year}` : "");

    return this.fetchJson(`/matches${modifier}?page=${pageNo}`);
  }

  private async fetchJson(url: string): Promise<{}> {
    const fullUrl = ApiClient.baseUrl + url;
    const options: RequestInit = { mode: "cors" };

    const response = await fetch(fullUrl, options);
    const json = await response.json();

    return response.ok ? json : Promise.reject(json);
  }

}
