import { logger } from "src/internal/Logger";
import { parse } from "csv-parse/sync";

export interface Parser<T extends any> {
  parse(iterable: Iterable<string>): T;
}

export class NoopParser implements Parser<string> {
  parse(text: string) {
    return text;
  }
}

export class JSONParser implements Parser<any> {
  /**
   * Parses JSON text into an object
   *
   * @example
   * const parser = new JSONParser();
   * parser.parse('{"a": 1, "b": 2, "c": 3}'); // outputs {a: 1, b: 2, c: 3}
   *
   * @param text a string of JSON text
   * @returns an object
   */
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
export class CSVParser implements Parser<any> {
  /**
   * Parses CSV text into an array of objects
   *
   * @example
   * const parser = new CSVParser();
   * parser.parse("a,b,c\n1,2,3"); // outputs [{a: 1, b: 2, c: 3}]
   *
   * @param text a string of CSV text
   * @returns an array of objects
   */
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

export class ListParser implements Parser<Array<any>> {
  /**
   * Parses a list of items separated by a character
   *
   * @example
   * const parser = new ListParser();
   * parser.parse("a, b, c"); // outputs ["a", "b", "c"]
   *
   * @param text a string of items separated by a character
   * @param char a character to split the text by
   * @returns an array of items
   */
  parse(text: string, char = ",") {
    try {
      return text.split(char).map((t) => t.trim());
    } catch (e) {
      logger.error(e as any);
      throw e;
    }
  }
}
