import { Parser } from "./Parser";

export class RegexParser<T> implements Parser<T> {
  private readonly regex: RegExp;
  private readonly parseFunc: (matches: RegExpMatchArray) => T;

  /**
   * Constructs a new RegexParser with the given regular expression and parse function.
   *
   * @param regex the regular expression used to match the input text
   * @param parseFunc a function that takes the RegExpMatchArray produced by matching the input text
   * with the regular expression and returns a parsed object
   */
  constructor(regex: RegExp, parseFunc: (matches: RegExpMatchArray) => T) {
    this.regex = regex;
    this.parseFunc = parseFunc;
  }

  /**
   * Parses the input text using the regular expression and parse function.
   *
   * @param text the input text to parse
   * @returns the parsed object
   * @throws an error if the input text doesn't match the regular expression
   */
  parse(text: string): T {
    const matches = text.match(this.regex);
    if (!matches) {
      throw new Error(
        `Failed to parse text '${text}' with regular expression '${this.regex}'`
      );
    }
    return this.parseFunc(matches);
  }
}
