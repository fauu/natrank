import { action, reaction, observable } from 'mobx';
import { paths } from '../app/Config';
import { RouterStore } from '../app/RouterStore';
import { ApiClient } from '../app/ApiClient';
import { DateUtils } from '../common/DateUtils';
import { Ranking } from './Ranking';

export class RankingStore {

  @observable initialDate: Date;
  @observable selectedDate: Date;
  @observable ranking: Ranking;

  routerStore: RouterStore;
  apiClient: ApiClient;

  constructor(apiClient: ApiClient, routerStore: RouterStore) {
    this.routerStore = routerStore;
    this.apiClient = apiClient;
  }

  @action
  loadRanking(date?: Date) {
    this.ranking = undefined;

    const rankingJson = this.apiClient.getRankingJson(date);
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
  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }

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

  @action
  clear() {
    this.initialDate = undefined;
    this.selectedDate = undefined;
    this.ranking = undefined;
  }
  
};