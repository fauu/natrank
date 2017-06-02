import { isEmpty } from "lodash";
import { action, observable } from "mobx";

import { ApiClient } from "app/ApiClient";
import { IPageJson, Page } from "common/Page";
import { IMatchJson, Match } from "results/Match";
import { Team } from "team/Team";

export class ResultsStore {

  @observable
  public isLoading: boolean = true;
  @observable
  public completedInitialLoad: boolean = false;

  @observable
  public matchPage: Page<Match>;
  @observable
  public povTeam?: Team;

  constructor(private apiClient: ApiClient) {}

  @action
  public async loadMatchPage(pageNo: number, team?: string, year?: number) {
    this.isLoading = true;

    const calls: [Promise<IPageJson<IMatchJson>>, Promise<any>] = [
      this.apiClient.getMatchPageJson(pageNo, team, year),
      team && this.apiClient.getTeamJson(team),
    ];

    const [matchPageJson, teamJson] = await Promise.all(calls);

    this.handleMatchPageLoad(matchPageJson, teamJson);
  }

  @action
  private handleMatchPageLoad(matchPageJson: IPageJson<IMatchJson>, teamJson?: {}) {
    this.matchPage = Page.fromJson<Match>(matchPageJson, Match.fromJson);
    this.povTeam = !isEmpty(teamJson) && Team.fromJson(teamJson);

    this.completedInitialLoad = true;
    this.isLoading = false;
  }

}
