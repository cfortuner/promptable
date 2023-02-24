import { injectVariables } from "@utils/inject-variables";
import { NoopParser, Parser } from "@prompts/Parser";
import { ExtractFormatObject, ExtractVariableNames } from "@utils/type-utils";
import { extractVariableNames } from "@utils/extract-variable-names";

export type PromptVariables<T extends string> = {
  [K in keyof ExtractFormatObject<T>]: Required<ExtractFormatObject<T>[K]>;
};

export interface PromptConfiguration {
  stop?: string[] | string | null;
  temperature?: number | undefined;
  maxTokens?: number | undefined;
}

export const DEFAULT_PROMPT_CONFIGURATION: PromptConfiguration = {
  stop: null,
  temperature: 0.7,
  maxTokens: 128,
};

export class Prompt<T extends string, V extends ExtractFormatObject<T>> {
  private constructor(
    readonly template: PromptTemplate<T, V>,
    readonly variables: V,
    readonly configuration: PromptConfiguration = DEFAULT_PROMPT_CONFIGURATION
  ) {
    this.template = template;
    this.variables = variables;
    this.configuration = configuration;
  }

  clone({
    variables,
    configuration,
  }: {
    variables?: Partial<V> | V;
    configuration?: Partial<PromptConfiguration> | PromptConfiguration;
  }): Prompt<T, V> {
    return new Prompt(
      this.template,
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

  static fromTemplate<T extends string, V extends ExtractFormatObject<T>>(
    template: PromptTemplate<T, V>,
    variables: V,
    configuration?: PromptConfiguration
  ) {
    return new Prompt(template, variables, configuration);
  }

  get text() {
    return injectVariables(this.template.text, this.variables || {});
  }

  toJSON() {
    return {
      template: this.template.toJSON(),
      text: this.text,
      variables: this.variables,
      configuration: this.configuration,
    };
  }
}

export class PromptTemplate<
  T extends string,
  V extends ExtractFormatObject<T>
> {
  readonly text: T;
  readonly configuration: PromptConfiguration;

  constructor(
    text: T,
    configuration: PromptConfiguration = DEFAULT_PROMPT_CONFIGURATION
  ) {
    this.text = text;
    this.configuration = configuration;
  }

  /**
   * Returns a new prompt with the given variables injected into the template.
   *
   * @param variables
   * @returns  Prompt
   */
  build(variables: V, configuration?: PromptConfiguration): Prompt<T, V> {
    return Prompt.fromTemplate(this, variables, configuration);
  }

  toJSON() {
    return {
      text: this.text,
      configuration: this.configuration,
    };
  }
}

export const prompt = <T extends string>(
  template: T,
  variables: ExtractFormatObject<T>,
  configuration?: PromptConfiguration
) => {
  return new PromptTemplate(template, configuration).build(variables);
};

const p = prompt("Hello, my name is {{name}}. I am a {{occupation}}.", {
  name: "John",
  occupation: "programmer",
});

const promptTemplate = new PromptTemplate(
  "Hello, my name is {{name}}. I am a {{occupation}}."
);
