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

export type CreateCompletionRequest<T extends string> = {
  text: string;
};

export type CreateCompletionResponse<T extends any> = {
  text: string;
  providerResponse: T;
} & { [key: string]: any };

export interface CompletionsModelProvider extends ModelProvider {
  generate(
    req: CreateCompletionRequest<any>,
    ...args: any[]
  ): Promise<CreateCompletionResponse<any>>;
}

export type CreateEmbeddingsRequest = {
  input: Document[] | Document | string | string[];
};

export type CreateEmbeddingsResponse<T> = {
  documents: Document[];
  embeddings: number[][];
  providerResponse: T;
} & { [key: string]: any };

export interface EmbeddingsModelProvider extends ModelProvider {
  createEmbeddings(
    req: CreateEmbeddingsRequest,
    ...args: any[]
  ): Promise<CreateEmbeddingsResponse<any>>;
}

export interface Tokenizer {
  encode(text: string): { tokens: number[]; texts: string[] };
  decode(tokens: number[]): string;
  truncate(text: string, maxTokens: number): string;
  countTokens(text: string): number;
  countDocumentTokens(doc: Document): number;
}
