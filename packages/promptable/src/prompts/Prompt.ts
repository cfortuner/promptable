import { injectVariables } from "@utils/inject-variables";
import { NoopParser, Parser } from "@prompts/Parser";
import { ExtractFormatObject } from "@utils/type-utils";
import { ModelProviderType } from "dist";

export type PromptVariables<T extends string> = {
  [K in keyof ExtractFormatObject<T>]: Required<ExtractFormatObject<T>[K]>;
};
export interface PromptConfiguration {
  stop?: string[] | string | undefined;
  temperature?: number | undefined;
  maxTokens?: number | undefined;
}

export const DEFAULT_PROMPT_CONFIGURATION: PromptConfiguration = {
  stop: undefined,
  temperature: 0.7,
  maxTokens: 128,
};

/**
 * A prompt is is container for a string that can be formatted with variables.
 *
 *
 * @example
 * const prompt = prompt("Hello {{name}}!", { name: "World" });
 * console.log(prompt.text); // "Hello World!"
 *
 * @example
 * const prompt = prompt("Hello {{name}}!", { name: "World" });
 * const newPrompt = prompt.format({ name: "Universe" });
 * console.log(newPrompt.text); // "Hello Universe!"
 *
 * @example
 * const prompt = prompt("Hello {{name}}!", { name: "World" });
 * const newPrompt = prompt.configure({ temperature: 0.5 });
 * console.log(newPrompt.text); // "Hello World!"
 *
 */
export class Prompt<T extends string, V extends PromptVariables<T>> {
  readonly template: T;
  readonly configuration: PromptConfiguration;
  readonly variables: PromptVariables<T>;

  constructor(
    template: T,
    variables: V,
    configuration: PromptConfiguration = DEFAULT_PROMPT_CONFIGURATION
  ) {
    this.template = template;
    this.variables = variables;
    this.configuration = configuration;
  }

  clone({
    template,
    variables,
    configuration,
  }: {
    template?: T;
    variables?: V;
    configuration?: Partial<PromptConfiguration> | PromptConfiguration;
  }) {
    return new Prompt(
      template || this.template,
      {
        ...this.variables,
        ...variables,
      },
      {
        ...this.configuration,
        ...configuration,
      }
    );
  }

  get text() {
    return injectVariables(this.template, this.variables);
  }

  /**
   * Configure the prompt with a new configuration
   *
   * @param configuration
   * @returns
   */
  configure(configuration: Partial<PromptConfiguration> | PromptConfiguration) {
    return new Prompt(this.template, this.variables, {
      ...this.configuration,
      ...configuration,
    });
  }

  /**
   * Returns a new prompt with the given variables injected into the template.
   *
   * @param variables
   * @returns  Prompt
   */
  format(variables: Partial<V>) {
    return this.clone(variables);
  }
}

/**
 * This function creates a new prompt with the given template and variables.
 *
 * @example
 * prompt("Hello {{name}}!", { name: "World" });
 * prompt("Hello {{name}}!", { name: "World" }, { temperature: 0.5 });
 *
 *
 * @example // Cloning
 * const prompt = prompt("Hello {{name}}!", { name: "World" });
 * const newPrompt = prompt.clone({ variables: { name: "Universe" } });
 * console.log(newPrompt.text); // "Hello Universe!"
 *
 * @example // Formatting:
 * const prompt = prompt("Hello {{name}}!", { name: "World" });
 * const newPrompt = prompt.format({ name: "Universe" });
 * console.log(newPrompt.text); // "Hello Universe!"
 *
 * @example // Configuring:
 * const prompt = prompt("Hello {{name}}!", { name: "World" });
 * const newPrompt = prompt.configure({ temperature: 0.5 });
 * console.log(newPrompt.text); // "Hello World!"
 *
 * @param template - template to use for the prompt
 * @param variables - variables to inject into the template
 * @param configuration - configuration for the prompt
 * @returns Prompt
 */
export function prompt<T extends string, V extends PromptVariables<T>>(
  template: T,
  variables: V,
  configuration: PromptConfiguration = DEFAULT_PROMPT_CONFIGURATION
) {
  return new Prompt(template, variables, configuration);
}
