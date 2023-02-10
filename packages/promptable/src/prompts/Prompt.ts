import { injectVariables } from "@utils/inject-variables";
import { logger } from "@utils/Logger";
import * as z from "zod";
import { NoopParser, Parser } from "./Parser";
export class Prompt {
  text: string;
  variableNames: string[];

  private parser = new NoopParser();

  constructor(text: string, variableNames: string[], parser?: Parser) {
    this.text = text;
    this.variableNames = variableNames;

    if (typeof parser !== "undefined") {
      this.parser = parser;
    }
  }

  parse(completion: string) {
    return this.parser.parse(completion);
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
  parser?: Parser
) => new Prompt(text, variableNames, parser);
