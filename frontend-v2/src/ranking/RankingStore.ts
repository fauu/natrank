import { action, reaction, observable } from 'mobx';
import { Api } from '../app/Api';
import { Ranking } from './Ranking';

export class RankingStore {

  @observable latestRankingDate: Date; // The date of the ranking at /rankings/latest
  @observable selectedDate: Date;
  @observable ranking: Ranking;

  api: Api;

  constructor(api: Api) {
    this.api = api;
    this.loadRanking();
  }

  @action
  loadRanking(date?: Date) {
    this.ranking = undefined;

    // FIXME: Hacky
    // Force loading of full ranking when we know we have it available
    if (date && (date.getTime() == this.latestRankingDate.getTime())) {
      date = undefined;
    }
    const rankingJson = this.api.getRankingJson(date);
    rankingJson.then(json => {
      this.handleRankingLoad(json, date)
    });
  }

  @action
  handleRankingLoad(json: {}, date: Date) {
    this.ranking = Ranking.fromJson(json);
    if (date > this.latestRankingDate) {
      // FIXME: Hacky as fuck
      this.ranking.entries = [];
    }

    if (!date) {
      this.latestRankingDate = this.ranking.date;
    }
  }

  handleSelectedDateChange = reaction(
    () => this.selectedDate,
    (date) => {
      this.loadRanking(date);
    }
  );
  
};