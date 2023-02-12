import { Prompt } from "@prompts/Prompt";
import { Tokenizer } from "@utils/Tokenizer";

export enum ModelProviderType {
  OpenAI,
}

export abstract class ModelProvider extends Tokenizer {
  type: ModelProviderType;

  constructor(type: ModelProviderType) {
    super();
    this.type = type;
  }
}

export interface CompletionsModelProvider extends ModelProvider {
  generate<T extends string>(
    prompt: Prompt<T>,
    variables: Record<T, string>,
    ...args: any[]
  ): Promise<string>;
}

export interface EmbeddingsModelProvider extends ModelProvider {
  embed(texts: string[]): Promise<any>;
  embed(text: string): Promise<any>;
}
