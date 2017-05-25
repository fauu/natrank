import { stringifyDate } from "common/DateUtils";

export class ApiClient {

  private static readonly baseUrl = "http://localhost:8080";

  public getRankingJson(date?: Date): Promise<{}> {
    const param = date ? stringifyDate(date, true) : "latest";

    return this.fetchJson(`/rankings/${param}`);
  }

  public getMatchPageJson(pageNo: number, team?: string, year?: number): Promise<{}> {
    let modifier = "";
    if (team) {
      modifier = `/team/${team}`;
    } else if (year) {
      modifier = `/year/${year}`;
    }

    return this.fetchJson(`/matches${modifier}?page=${pageNo}`);
  }

  private fetchJson(url: string): Promise<{}> {
    const fullUrl = ApiClient.baseUrl + url;
    const options: RequestInit = { mode: "cors" };

    return fetch(fullUrl, options).then((response) => {
      return response.json().then((json) => {
        return response.ok ? json : Promise.reject(json);
      });
    });
  }

}
