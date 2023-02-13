import { injectVariables } from "@utils/inject-variables";
import { NoopParser, Parser } from "@prompts/Parser";

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

//TODO: This is very unweildy. I need to figure out a better way to do this.
// how to handle injecting documents / context into the base prompt.
// How to select context for the prompt?, Ranking?
// how to check the token size of the prompt + context?

// Maybe a builder pattern?
// like this:
// const prompt = new PromptBuilder()
//   .text("What is your name?")
//   .variable("name")
//   .examples(["John", "Jane", "Joe"])
//   .build();
//
// Instead of a builder pattern, I could use a
// factory function:
// const prompt = prompt("What is your name?", ["name"], ["John", "Jane", "Joe"]);
//
// Or I could use a class factory:
// const prompt = Prompt("What is your name?", ["name"], ["John", "Jane", "Joe"]);
//

export const prompt = (
  text: string,
  variableNames: string[],
  parser?: Parser<any>
) => new Prompt(text, variableNames, parser);
