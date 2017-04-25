export class Api {

  private static baseUrl = "http://localhost:8080";

  getLatestRankingJson(): Promise<{}> {
    return this.fetchJson('/rankings/latest');
  }

  private fetchJson(url: string): Promise<{}> {
    let fullUrl = Api.baseUrl + url;
    let options = { mode: 'cors' };

    return fetch(fullUrl, options).then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      })
    });
  }

}