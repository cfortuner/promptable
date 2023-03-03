import { marked } from "marked";
import { Parser } from "./Parser";

export class MarkdownParser implements Parser<string> {
  /**
   * Parses the input Markdown text into an HTML string.
   *
   * @param text the input Markdown text to parse
   * @returns an HTML string representing the parsed Markdown content
   */
  parse(text: string): string {
    return marked.parse(text);
  }
}
