export class Page<T> {

  no: number;
  totalPages: number;
  content: T[];

  static fromJson<T>(json, elementDeserializer: (({}) => T)) {
    const page = new Page<T>();

    page.no = json['number'];
    page.totalPages =  json['totalPages'];

    page.content = [];
    for (const elementJson of json['content']) {
      page.content.push(elementDeserializer(elementJson));
    }

    return page;
  }

}