import { action, reaction, observable } from 'mobx';
import { paths } from '../app/Config';
import { RouterStore } from '../app/RouterStore';
import { ApiClient } from '../app/ApiClient';
import { Page } from '../common/Page';
import { Match } from './Match';

export class ResultsStore {

  @observable matchPage: Page<Match>;
  totalPages: number;
  @observable isMatchPageLoading: boolean;

  routerStore: RouterStore;
  apiClient: ApiClient;

  constructor(apiClient: ApiClient, routerStore: RouterStore) {
    this.routerStore = routerStore;
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

    if (!this.totalPages) {
      this.totalPages = this.matchPage.totalPages;
    }

    this.isMatchPageLoading = false;
  }

  handleMatchPageChange = reaction(
    () => this.matchPage,
    (matchPage) => {
      // this.routerStore.push(`${paths.results}/page/${matchPage.no + 1}`);
    }
  );

  @action
  clear() {
    this.matchPage = undefined;
    this.isMatchPageLoading = false;
  }
  
};