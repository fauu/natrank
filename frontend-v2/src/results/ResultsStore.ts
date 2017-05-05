import { action, reaction, observable } from 'mobx';
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

  loadMatchPage(pageNo: number) {
    const matchesJson = this.apiClient.getMatchesJson(pageNo);
    matchesJson.then(json => {
      this.handleMatchesLoad(json)
    });
  }

  @action
  handleMatchesLoad(json: {}, date?: Date) {
    const matchesJson = json['content'];
    this.matchPage = Page.fromJson<Match>(json, Match.fromJson);
  }

  handleMatchPageChange = reaction(
    () => this.matchPage,
    (matchPage) => {
      // this.routerStore.push(`${paths.results}/page/${matchPage.no + 1}`);
    }
  );
  
};