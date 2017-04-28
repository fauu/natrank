import { action, reaction, observable } from 'mobx';
import { paths } from '../app/Config';
import { RouterStore } from '../app/RouterStore';
import { Api } from '../app/Api';
import { DateUtils } from '../common/DateUtils';
import { Ranking } from './Ranking';

export class RankingStore {

  @observable initialDate: Date;
  @observable selectedDate: Date;
  @observable ranking: Ranking;

  routerStore: RouterStore;
  api: Api;

  constructor(api: Api, routerStore: RouterStore) {
    this.routerStore = routerStore;
    this.api = api;
  }

  @action
  loadRanking(date?: Date) {
    this.ranking = undefined;

    const rankingJson = this.api.getRankingJson(date);
    rankingJson.then(json => {
      this.handleRankingLoad(json, date)
    });
  }

  @action
  handleRankingLoad(json: {}, date?: Date) {
    this.ranking = Ranking.fromJson(json);

    if (!this.initialDate) {
      this.initialDate = this.ranking.date;
    }
  }

  @action
  handleSelectedDateChange = reaction(
    () => this.selectedDate,
    (date) => {
      if (!this.initialDate) {
        this.initialDate = date;
      }

      this.loadRanking(date);

      this.routerStore.push(`${paths.ranking}/${DateUtils.stringify(date)}`);
    }
  );
  
};