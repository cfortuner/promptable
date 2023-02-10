import { Prompt } from "@prompts/Prompt";

export enum ModelProviderType {
  OpenAI,
}

export abstract class ModelProvider {
  type: ModelProviderType;

  constructor(type: ModelProviderType) {
    this.type = type;
  }
}

export interface CompletionsModelProvider extends ModelProvider {
  generate(
    prompt: Prompt,
    variables: { [key: string]: any },
    ...args: any[]
  ): Promise<string>;
}
