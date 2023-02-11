import { injectVariables } from "@utils/inject-variables";
import { NoopParser, Parser } from "@utils/Parser";
export class Prompt<
  T extends string = string,
  P extends Parser<any> = NoopParser
> implements Parser<any>
{
  text: string;
  variableNames: T[];

  private parser: P;

  constructor(text: string, variableNames: T[], parser?: P) {
    this.text = text;
    this.variableNames = variableNames;

    this.parser = new NoopParser() as P;
    if (typeof parser !== "undefined") {
      this.parser = parser;
    }
  }

  parse(completion: string): any;
  parse(completions: string[]): any[];
  parse(completions: string | string[]) {
    if (typeof completions === "string") {
      return this.parser.parse(completions);
    }

    if (completions.length === 0) {
      return;
    }

    if (completions.length === 1) {
      return this.parser.parse(completions[0]);
    }

    return completions.map((completion) => this.parser.parse(completion));
  }

  format(variables: { [name: string]: any }) {
    const formattedPrompt = injectVariables(this.text, variables);
    return formattedPrompt;
  }

  toJson() {
    return {
      text: this.text,
      variableNames: this.variableNames,
    };
  }
}

export const prompt = (
  text: string,
  variableNames: string[],
  parser?: Parser<any>
) => new Prompt(text, variableNames, parser);
