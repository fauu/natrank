import { observable } from "mobx";

export class GlobalStore {

  // TODO: Get from the API
  @observable
  public newestRankingDate: Date = new Date(1950, 5, 24);
  @observable
  public oldestRankingDate: Date = new Date(1872, 10, 30);

}
