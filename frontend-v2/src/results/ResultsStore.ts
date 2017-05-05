import { action, observable } from 'mobx';
import { paths } from '../app/Config';
import { RouterStore } from '../app/RouterStore';
import { ApiClient } from '../app/ApiClient';
import { Page } from '../common/Page';
import { Match } from './Match';

export class ResultsStore {

  @observable matchPage: Page<Match>;

  routerStore: RouterStore;
  apiClient: ApiClient;

  constructor(apiClient: ApiClient, routerStore: RouterStore) {
    this.routerStore = routerStore;
    this.apiClient = apiClient;
  }

  loadMatches() {
    const matchesJson = this.apiClient.getMatchesJson();
    matchesJson.then(json => {
      this.handleMatchesLoad(json)
    });
  }

  @action
  handleMatchesLoad(json: {}, date?: Date) {
    const matchesJson = json['content'];
    this.matchPage = Page.fromJson<Match>(json, Match.fromJson);
  }
  
};