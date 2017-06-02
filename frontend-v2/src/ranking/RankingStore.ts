import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { IRankingJson, Ranking } from "ranking/Ranking";

export class RankingStore {

  @observable
  public isLoading = true;

  @observable
  public ranking: Ranking;

  @observable
  public lastViewedRankingDate: Date;

  public constructor(private apiClient: ApiClient) {}

  public async fetchData(date?: Date) {
    this.isLoading = true;

    const rankingJson = await this.apiClient.fetchRankingJson({ date });
    this.handleFetchedData(rankingJson, date);
  }

  @action
  private handleFetchedData(json: IRankingJson, date?: Date) {
    this.ranking = Ranking.fromJson(json);
    this.lastViewedRankingDate = date ? date : this.ranking.date;

    this.isLoading = false;
  }

}
