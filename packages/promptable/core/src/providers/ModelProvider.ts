import { Prompt } from "@prompts/Prompt";
import { Document } from "src";

export enum ModelProviderType {
  OpenAI,
}

export abstract class ModelProvider {
  type: ModelProviderType;

  constructor(type: ModelProviderType) {
    this.type = type;
  }
}

export interface CompletionRequest<T extends string> {
  prompt: Prompt<T, any>;
  variables: Record<T, string>;
  topP?: number;
  n?: number;
  maxTokens?: number;
  stop?: string[] | string;
}

export interface CompletionsModelProvider extends ModelProvider {
  generate(req: CompletionRequest<any>): Promise<string>;
}

export interface CompletionStreamModelProvider extends ModelProvider {
  stream<T extends string>(
    prompt: Prompt<T>,
    variables: Record<T, string>,
    ...args: any[]
  ): Promise<string>;
}

export interface EmbeddingsModelProvider extends ModelProvider {
  embed(texts: string[], ...args: any[]): Promise<number[][]>;
  embed(text: string, ...args: any[]): Promise<number[]>;
}

export interface Tokenizer {
  encode(text: string): { tokens: number[]; texts: string[] };
  decode(tokens: number[]): string;
  truncate(text: string, maxTokens: number): string;
  countTokens(text: string): number;
  countDocumentTokens(doc: Document): number;
}
