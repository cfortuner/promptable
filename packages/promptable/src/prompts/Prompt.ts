import * as z from "zod";
export class Prompt {
  text: string;
  variableNames: string[];

  constructor(text: string, variableNames: string[]) {
    this.text = text;
    this.variableNames = variableNames;
  }

  format(variables: { [name: string]: any }) {
    return this.injectVariables(variables);
  }

  private injectVariables(variables: { [name: string]: any }) {
    return Object.entries(variables)?.reduce((acc, [name, value]) => {
      return acc.replaceAll(`{{${name}}}`, value);
    }, this.text);
  }

  toJson() {
    return {
      text: this.text,
      variableNames: this.variableNames,
    };
  }
}
