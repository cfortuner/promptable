import { parse } from "csv-parse/sync";

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
      console.error(e as any);
      throw e;
    }
  }
}

/**
 * Parser that parses CSV text into an array of objects
 */
export class CSVParser extends Parser {
  constructor() {
    super();
  }

  parse(text: string) {
    try {
      return parse(text, {
        relax_column_count: true,
        relax_quotes: true,
        columns: true,
        skip_empty_lines: true,
      });
    } catch (e) {
      console.error(e as any);
      throw e;
    }
  }
}
