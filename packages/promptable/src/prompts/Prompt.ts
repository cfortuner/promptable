import { injectVariables } from "@utils/inject-variables";
import { ExtractFormatObject } from "@utils/type-utils";

export type PromptVariables<TPromptText extends string> = {
  [K in keyof ExtractFormatObject<TPromptText>]: Required<ExtractFormatObject<TPromptText>[K]>;
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

export class Prompt<TPromptText extends string, TPromptVariables extends PromptVariables<TPromptText>> {
  readonly template: PromptTemplate<TPromptText, TPromptVariables>;
  constructor(
    initTemplate: PromptTemplate<TPromptText, TPromptVariables> | TPromptText,
    readonly variables: TPromptVariables,
    readonly configuration: PromptConfiguration = DEFAULT_PROMPT_CONFIGURATION
  ) {
    if (typeof initTemplate === "string") {
      this.template = new PromptTemplate(initTemplate, configuration);
    } else {
      this.template = initTemplate;
    }

    this.variables = variables;
    this.configuration = configuration;
  }

  clone({
    variables = {},
    configuration = {},
  }: {
    variables?: Partial<TPromptVariables> | TPromptVariables;
    configuration?: Partial<PromptConfiguration> | PromptConfiguration;
  } = {}): Prompt<TPromptText, TPromptVariables> {
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

export class PromptTemplate<TPromptText extends string, TPromptVariables extends PromptVariables<TPromptText>> {
  readonly text: TPromptText;
  readonly configuration: PromptConfiguration;

  constructor(
    text: TPromptText,
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
  build(variables: TPromptVariables, configuration?: PromptConfiguration) {
    return new Prompt<TPromptText, TPromptVariables>(this, variables, configuration);
  }

  toJSON() {
    return {
      text: this.text,
      configuration: this.configuration,
    };
  }
}

export const prompt = <TPromptText extends string>(
  template: TPromptText,
  variables: PromptVariables<TPromptText>,
  configuration?: PromptConfiguration
) => {
  return new PromptTemplate(template, configuration).build(variables);
};
