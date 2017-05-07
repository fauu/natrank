import { action, observable } from 'mobx';
import { RouterStore } from '../app/RouterStore';
import { ApiClient } from '../app/ApiClient';
import { Ranking } from './Ranking';

export class RankingStore {

  @observable initialDate: Date;
  @observable ranking: Ranking;

  apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  @action
  loadRanking(date?: Date) {
    this.ranking = undefined;

    const rankingJson = this.apiClient.getRankingJson(date);
    rankingJson.then(json => {
      this.handleRankingLoad(json)
    });
  }

  @action
  handleRankingLoad(json: {}) {
    this.ranking = Ranking.fromJson(json);

    if (!this.initialDate) {
      this.initialDate = this.ranking.date;
    }
  }

};