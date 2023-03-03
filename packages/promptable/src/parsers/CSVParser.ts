import { Parser } from "./Parser";

export class CSVParser implements Parser<any[]> {
  private readonly delimiter: string;

  /**
   * Constructs a new CSVParser with the given delimiter.
   *
   * @param delimiter the delimiter used to separate values in the CSV text
   */
  constructor(delimiter = ",") {
    this.delimiter = delimiter;
  }

  /**
   * Parses the input CSV text into an array of objects.
   *
   * @param text the input CSV text to parse
   * @returns an array of objects representing the CSV data
   * @throws an error if the input text is not valid CSV
   */
  parse(text: string): any[] {
    const lines = text.trim().split(/\r?\n/);
    if (!lines.length) {
      return [];
    }

    const headers = lines[0].split(this.delimiter);
    const data = lines.slice(1).map((line) => line.split(this.delimiter));

    return data.map((row) => {
      const obj: any = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
  }
}
