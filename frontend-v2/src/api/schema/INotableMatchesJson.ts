import { IMatchJson } from "api/schema/IMatchJson";

export interface INotableMatchesJson {
  [categoryId: string]: IMatchJson[];
}
