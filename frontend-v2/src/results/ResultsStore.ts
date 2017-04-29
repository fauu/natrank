import { action, observable } from 'mobx';
import { paths } from '../app/Config';
import { RouterStore } from '../app/RouterStore';
import { Api } from '../app/Api';
// import { DateUtils } from '../common/DateUtils';
import { Page } from '../common/Page';
import { Match } from './Match';

export class ResultsStore {

  @observable matchPage: Page<Match>;

  routerStore: RouterStore;
  api: Api;

  constructor(api: Api, routerStore: RouterStore) {
    this.routerStore = routerStore;
    this.api = api;
  }

  loadMatches() {
    const matchesJson = this.api.getMatchesJson();
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