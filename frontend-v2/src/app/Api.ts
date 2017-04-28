import { DateUtils } from '../common/DateUtils';

export class Api {

  private static baseUrl = "http://localhost:8080";

  getRankingJson(date?: Date): Promise<{}> {
    let param = date ? DateUtils.stringify(date, true) : 'latest';

    return this.fetchJson(`/rankings/${param}`);
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