import { Parser } from "./Parser";

export class ArrayParser implements Parser<any[]> {
  private readonly delimiter: string;

  /**
   * Constructs a new ArrayParser with the given delimiter.
   *
   * @param delimiter the delimiter used to separate values in the input text
   */
  constructor(delimiter = ",") {
    this.delimiter = delimiter;
  }

  /**
   * Parses the input text into an array.
   *
   * @param text the input text to parse
   * @returns an array representing the parsed text
   * @throws an error if the input text is not valid
   */
  parse(text: string): any[] {
    const lines = text.trim().split(/\r?\n/);
    if (!lines.length) {
      return [];
    }

    const data = lines.map((line) => {
      return line.split(this.delimiter);
    });

    return data;
  }
}
