/**
 * Parsers are used to parse the user input into a specific type.
 *
 * @example
 * const parser = new RegexParser(/hello (.*)/));
 * const result = parser.parse("hello world");
 *
 * console.log(result); // "world"
 *
 * These are useful for Large Language Models that return text as the output
 * that needs to be parsed into a specific type.
 */
export interface Parser<T extends any> {
  parse(text: string): T;
}
