import { action, reaction, observable } from 'mobx';
import { Api } from '../app/Api';
import { Ranking } from './Ranking';

export class RankingStore {

  @observable latestRankingDate: Date; // The date of the ranking at /rankings/latest
  @observable selectedDate: Date;
  @observable ranking: Ranking;

  private api: Api;

  constructor(api: Api) {
    this.api = api;
    this.loadRanking();
  }

  @action
  private loadRanking(date?: Date) {
    this.ranking = undefined;

    const rankingJson = this.api.getRankingJson(date);
    rankingJson.then(json => {
      this.handleRankingLoad(json, date)
    });
  }

  @action
  private handleRankingLoad(json: {}, date: Date) {
    this.ranking = Ranking.fromJson(json);

    if (!date) {
      this.latestRankingDate = this.ranking.date;
    }
  }

  private handleSelectedDateChange = reaction(
    () => this.selectedDate,
    () => {
      this.loadRanking(this.selectedDate);
    }
  );
  
};