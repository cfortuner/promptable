import { Parser } from "./Parser";

export class JSONParser implements Parser<object> {
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
