import { load as cheerioLoad } from "cheerio";
import { Parser } from "./Parser";

export class HTMLParser implements Parser<any> {
  /**
   * Parses the input HTML text into an object that represents the parsed HTML content.
   *
   * @param text the input HTML text to parse
   * @returns an object representing the parsed HTML content
   * @throws an error if the input text is not valid HTML
   */
  parse(text: string): any {
    try {
      return cheerioLoad(text);
    } catch (error) {
      throw new Error(`Failed to parse HTML text: ${(error as any).message}`);
    }
  }
}
