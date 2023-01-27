export abstract class Parser {
  abstract parse(text: string): any;
}

export class NoopParser extends Parser {
  parse(text: string) {
    return text;
  }
}

export class JSONParser extends Parser {
  constructor() {
    super();
  }

  parse(text: string) {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export class CSVParser extends Parser {
  constructor() {
    super();
  }

  parse(text: string) {
    try {
      return text.split(",").map((t) => t.trim());
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
