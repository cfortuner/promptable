import { injectVariables } from "@utils/inject-variables";
import * as z from "zod";
export class Prompt {
  text: string;
  variableNames: string[];

  constructor(text: string, variableNames: string[]) {
    this.text = text;
    this.variableNames = variableNames;
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
