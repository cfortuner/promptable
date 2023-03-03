import { Parser } from "./Parser";
import { parse as cssParse } from "css";

export class CSSParser implements Parser<any> {
  /**
   * Parses the input CSS text into an object that represents the parsed CSS content.
   *
   * @param text the input CSS text to parse
   * @returns an object representing the parsed CSS content
   * @throws an error if the input text is not valid CSS
   */
  parse(text: string): any {
    try {
      return cssParse(text);
    } catch (error) {
      throw new Error(`Failed to parse CSS text: ${(error as any).message}`);
    }
  }
}
