import Handlebars from "handlebars";

export function injectVariables(text: string, variables: any): string {
  const template = Handlebars.compile(text);
  return template(variables);
}
