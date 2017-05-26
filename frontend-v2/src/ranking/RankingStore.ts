import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { Ranking } from "ranking/Ranking";

export class RankingStore {

  @observable
  public isLoading = true;

  @observable
  public ranking: Ranking;

  // TODO: Get from the API
  public newestRankingDate: Date = new Date(1950, 5, 24);
  public oldestRankingDate: Date = new Date(1872, 10, 30);

  @observable
  public lastViewedRankingDate: Date;

  public constructor(private apiClient: ApiClient) {}

  public loadRanking(date?: Date) {
    this.isLoading = true;

    const rankingJson = this.apiClient.getRankingJson(date);
    rankingJson.then(
      action((json) => {
        this.ranking = Ranking.fromJson(json);
        this.lastViewedRankingDate = date ? date : this.ranking.date;

        this.isLoading = false;
    }));
  }

}
