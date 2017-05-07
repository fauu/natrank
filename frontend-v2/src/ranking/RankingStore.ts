import { ApiClient } from "app/ApiClient";
import { RouterStore } from "app/RouterStore";
import { action, observable } from "mobx";
import { Ranking } from "ranking/Ranking";

export class RankingStore {

  @observable public initialDate: Date;
  @observable public ranking: Ranking;

  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  @action
  public loadRanking(date?: Date) {
    this.ranking = undefined;

    const rankingJson = this.apiClient.getRankingJson(date);
    rankingJson.then((json) => {
      this.handleRankingLoad(json);
    });
  }

  @action
  public handleRankingLoad(json: {}) {
    this.ranking = Ranking.fromJson(json);

    if (!this.initialDate) {
      this.initialDate = this.ranking.date;
    }
  }

}
