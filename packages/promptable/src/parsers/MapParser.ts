import { Parser } from "./Parser";

export class MapParser implements Parser<Map<any, any>> {
  private readonly delimiter: string;

  /**
   * Constructs a new MapParser with the given delimiter.
   *
   * @param delimiter the delimiter used to separate keys and values in the input text
   */
  constructor(delimiter = "=") {
    this.delimiter = delimiter;
  }

  /**
   * Parses the input text into a Map object.
   *
   * @param text the input text to parse
   * @returns a Map object representing the parsed text
   * @throws an error if the input text is not valid
   */
  parse(text: string): Map<any, any> {
    const lines = text.trim().split(/\r?\n/);
    if (!lines.length) {
      return new Map();
    }

    const map = new Map();
    lines.forEach((line) => {
      const [key, value] = line.split(this.delimiter);

      if (key && value) {
        map.set(key.trim(), value.trim());
      }
    });

    return map;
  }
}
