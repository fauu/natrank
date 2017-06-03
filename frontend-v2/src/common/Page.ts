export class Page<T> {

  public static fromJson<J, T>(json: IPageJson<J>, elementDeserializer: (({}) => T)) {
    const page = new Page<T>();

    page.no = json.number;
    page.totalPages =  json.totalPages;

    page.content = [];
    for (const elementJson of json.content) {
      page.content.push(elementDeserializer(elementJson));
    }

    return page;
  }

  public no: number;
  public totalPages: number;
  public content: T[];

}

export interface IPageSortJson {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}

export interface IPageJson<J> {
  content: J[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  sort: IPageSortJson[];
  size: number;
  number: number;
}
