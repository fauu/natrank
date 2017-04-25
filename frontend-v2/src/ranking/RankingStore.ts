import { action, observable } from 'mobx';
import { Api } from '../app/Api';
import { Ranking } from './Ranking';

export class RankingStore {

  @observable ranking: Ranking;

  private api: Api;

  constructor(api: Api) {
    this.api = api;
    this.loadLatestRanking();
  }

  private loadLatestRanking() {
    let latestRankingJson = this.api.getLatestRankingJson();
    latestRankingJson.then(json => this.createRankingFromJson(json));
  }

  @action
  private createRankingFromJson(json: {}) {
    this.ranking = Ranking.fromJson(json);
  }
  
};