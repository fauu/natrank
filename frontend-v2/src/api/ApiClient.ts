import { IMatchJson } from "api/schema/IMatchJson";
import { INotableMatchesJson } from "api/schema/INotableMatchesJson";
import { IRankingJson } from "api/schema/IRankingJson";
import { ITeamJson } from "api/schema/ITeamJson";
import { TeamFormJson } from "api/schema/TeamFormJson";
import { TeamRankHistoryJson, TeamRatingHistoryJson } from "api/schema/TeamRankingHistoryJson";
import { IPageJson } from "common/Page";
import { stringifyDate } from "utils/DateUtils";

export class ApiClient {

  private static readonly baseUrl = "http://localhost:8080";

  public async fetchRankingJson({ date, teamName }: { date?: Date, teamName?: string }): Promise<IRankingJson> {
    let param;
    if (date) {
      param = stringifyDate(date, { padded: true });
    } else if (teamName) {
      param = `excerpt/${teamName}`;
    } else {
      param = "latest";
    }

    return this.fetchJson(`/rankings/${param}`);
  }

  public async fetchMatchPageJson({ pageNo, teamName, year }: {
    pageNo: number,
    teamName?: string,
    year?: number,
  }): Promise<IPageJson<IMatchJson>> {
    const modifier = teamName ? `/team/${teamName}` : (year ? `/year/${year}` : "");

    return this.fetchJson(`/matches${modifier}?page=${pageNo}`);
  }

  public async fetchTeamJson(teamName: string): Promise<ITeamJson> {
    return this.fetchJson(`/teams/${teamName}`);
  }

  public async fetchTeamFormJson(teamName: string): Promise<TeamFormJson> {
    return this.fetchJson(`/matches/form/team/${teamName}`);
  }

  public async fetchTeamRankHistoryJson(teamName: string): Promise<TeamRankHistoryJson> {
    return this.fetchJson(`/teams/${teamName}/ranks`);
  }

  public async fetchTeamRatingHistoryJson(teamName: string): Promise<TeamRatingHistoryJson> {
    return this.fetchJson(`/teams/${teamName}/ratings`);
  }

  public async fetchTeamNotableMatches(teamName: string): Promise<INotableMatchesJson> {
    return this.fetchJson(`/matches/notable/team/${teamName}`);
  }

  private async fetchJson(url: string): Promise<any> {
    const fullUrl = ApiClient.baseUrl + url;
    const options: RequestInit = { mode: "cors" };

    const response = await fetch(fullUrl, options);
    const json = await response.json();

    return response.ok ? json : Promise.reject(json);
  }

}
