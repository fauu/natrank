import { DateUtils } from "common/DateUtils";

export class ApiClient {

  private static baseUrl = "http://localhost:8080";

  public getRankingJson(date?: Date): Promise<{}> {
    const param = date ? DateUtils.stringify(date, true) : "latest";

    return this.fetchJson(`/rankings/${param}`);
  }

  public getMatchesJson(pageNo: number): Promise<{}> {
    return this.fetchJson(`/matches?page=${pageNo}`);
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
