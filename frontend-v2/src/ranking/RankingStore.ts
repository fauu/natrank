import { ApiClient } from "app/ApiClient";
import { AppStore } from "app/AppStore";
import { action, observable } from "mobx";
import { Ranking } from "ranking/Ranking";

export class RankingStore {

  @observable
  public isLoading = true;

  @observable
  public ranking: Ranking;

  @observable
  public newestRankingDate: Date;

  @observable
  public latestRankingDate: Date;

  private appStore: AppStore;

  public constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  public loadRanking(date?: Date) {
    this.isLoading = true;
    const rankingJson = this.appStore.apiClient.getRankingJson(date);
    rankingJson.then(action((json) => {
      this.ranking = Ranking.fromJson(json);
      if (!date) {
        this.newestRankingDate = this.ranking.date;
        this.latestRankingDate = this.newestRankingDate;
      } else {
        this.latestRankingDate = date;
      }
      this.isLoading = false;
    }));
  }

}
