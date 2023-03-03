import { injectVariables } from "@utils/inject-variables";
import { ExtractFormatObject } from "@utils/type-utils";

export type PromptVariables<T extends string> = {
  [K in keyof ExtractFormatObject<T>]: Required<ExtractFormatObject<T>[K]>;
};

export interface PromptConfiguration {
  stop?: string[] | string | null;
  temperature?: number | undefined;
  max_tokens?: number | undefined;
}

export const DEFAULT_PROMPT_CONFIGURATION: PromptConfiguration = {
  stop: null,
  temperature: 0.7,
  max_tokens: 128,
};

export class Prompt<T extends string, V extends PromptVariables<T>> {
  readonly template: PromptTemplate<T, V>;
  constructor(
    initTemplate: PromptTemplate<T, V> | T,
    readonly variables: V,
    readonly configuration: PromptConfiguration = DEFAULT_PROMPT_CONFIGURATION
  ) {
    if (typeof initTemplate === "string") {
      this.template = new PromptTemplate(initTemplate);
    } else {
      this.template = initTemplate;
    }

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

export class PromptTemplate<T extends string, V extends PromptVariables<T>> {
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
  build(variables: V, configuration?: PromptConfiguration) {
    return new Prompt<T, V>(this, variables, configuration);
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
  variables: PromptVariables<T>,
  configuration?: PromptConfiguration
) => {
  return new PromptTemplate(template, configuration).build(variables);
};
