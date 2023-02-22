import { injectVariables } from "@utils/inject-variables";
import { NoopParser, Parser } from "@prompts/Parser";
import { ExtractFormatObject } from "@utils/type-utils";

export type PromptVariables<T extends string> = ExtractFormatObject<T>;

/**
 * A prompt is is container for a string that can be formatted with variables.
 *
 * @example
 * const prompt = new Prompt("Hello {{name}}!");
 * const formattedPrompt = prompt.format({ name: "World" });
 *
 * console.log(formattedPrompt.text); // "Hello World!"
 * console.log(formattedPrompt.template); // "Hello {{name}}!"
 */
export class Prompt<T extends string = string> {
  template: T;
  currentVariables: ExtractFormatObject<T> = {} as ExtractFormatObject<T>;

  constructor(
    template: T,
    currentVariables: ExtractFormatObject<T> = {} as ExtractFormatObject<T>
  ) {
    this.template = template;
    this.currentVariables = currentVariables;
  }

  format(variables: ExtractFormatObject<T>) {
    return new Prompt(this.template, variables);
  }

  get text() {
    return injectVariables(this.template, this.currentVariables);
  }
}
