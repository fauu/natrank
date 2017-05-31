export class Team {

  public static fromJson(json): Team {
    const team = new Team();

    team.id = json.id;
    team.name = json.currentCountry.name;

    return team;
  }

  public id: number;
  public name: number;

}
