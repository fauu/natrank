import { ApiClient } from "app/ApiClient";
import { action, observable } from "mobx";

import { AppStore } from "app/AppStore";
import { Ranking } from "ranking/Ranking";

export class RankingStore {

  @observable public isLoading = true;

  @observable public ranking: Ranking;

  // TODO: Get from the API
  public newestRankingDate: Date = new Date(1950, 5, 24);
  public oldestRankingDate: Date = new Date(1872, 10, 30);

  @observable public lastViewedRankingDate: Date;

  public constructor(private appStore: AppStore) { }

  public loadRanking(date?: Date, dateCallback?: (date: Date) => void) {
    console.log("load" + date);
    this.isLoading = true;

    const rankingJson = this.appStore.apiClient.getRankingJson(date);
    rankingJson.then(
      action((json) => {
        this.ranking = Ranking.fromJson(json);

        if (!date) {
          this.lastViewedRankingDate = this.ranking.date;
          if (dateCallback) {
            dateCallback(this.ranking.date);
          }
        } else {
          this.lastViewedRankingDate = date;
        }

        this.isLoading = false;
    }));
  }

}
