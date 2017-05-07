import { action, observable } from 'mobx';
import { ApiClient } from '../app/ApiClient';
import { Page } from '../common/Page';
import { Match } from './Match';

export class ResultsStore {

  @observable matchPage: Page<Match>;
  @observable isMatchPageLoading: boolean;

  apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  @action
  loadMatchPage(pageNo: number) {
    this.isMatchPageLoading = true;

    const matchesJson = this.apiClient.getMatchesJson(pageNo);
    matchesJson.then(json => {
      this.handleMatchesLoad(json)
    });
  }

  @action
  handleMatchesLoad(json: {}, date?: Date) {
    const matchesJson = json['content'];
    this.matchPage = Page.fromJson<Match>(json, Match.fromJson);

    this.isMatchPageLoading = false;
  }

  @action
  clear() {
    this.matchPage = undefined;
    this.isMatchPageLoading = false;
  }
  
};