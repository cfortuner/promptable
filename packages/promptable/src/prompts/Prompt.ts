import { injectVariables } from "@utils/inject-variables";
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
    return injectVariables(this.text, variables);
  }

  toJson() {
    return {
      text: this.text,
      variableNames: this.variableNames,
    };
  }
}
