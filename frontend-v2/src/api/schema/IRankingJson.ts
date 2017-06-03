import { IRankingEntryJson } from "api/schema/IRankingEntryJson";

export interface IRankingJson {
  id: number;
  date: string;
  fullVariantAvailable?: boolean;
  entries: IRankingEntryJson[];
}
