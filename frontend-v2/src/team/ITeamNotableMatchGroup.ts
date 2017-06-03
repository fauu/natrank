import { Match } from "results/Match";
import { ITeamNotableMatchCategory } from "team/ITeamNotableMatchCategory";

export interface ITeamNotableMatchGroup {
  category: ITeamNotableMatchCategory;
  matches: Match[];
}
