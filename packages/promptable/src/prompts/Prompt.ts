export type PromptVariables = { [name: string]: string };
export class Prompt {
  text: string;
  variables: PromptVariables;

  constructor(text: string, variables: { [name: string]: string }) {
    this.text = text;
    this.variables = variables;
  }

  format() {
    return this.injectVariables();
  }

  private injectVariables() {
    return Object.entries(this.variables)?.reduce((acc, [name, value]) => {
      return acc.replaceAll(`{{${name}}}`, value);
    }, this.text);
  }
}
