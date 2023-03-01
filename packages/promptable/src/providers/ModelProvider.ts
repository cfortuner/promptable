import { Document } from "src";
import { EmbeddedDocument } from "src/embeddings";

export enum ModelProviderType {
  OpenAI,
}

export abstract class ModelProvider {
  type: ModelProviderType;

  constructor(type: ModelProviderType) {
    this.type = type;
  }
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}
export type CreateChatRequest = {
  messages: ChatMessage[];
};

export type CreateChatResponse<T extends any> = {
  message: ChatMessage & { role: "assistant" };
  providerResponse: T;
};
export interface ChatModelProvider extends ModelProvider {
  chat(
    req: CreateChatRequest,
    ...args: any[]
  ): Promise<CreateChatResponse<any>>;
}

export type CreateCompletionRequest = {
  text: string;
};

export type CreateCompletionResponse<T extends any> = {
  text: string;
  providerResponse: T;
} & { [key: string]: any };

export interface CompletionsModelProvider extends ModelProvider {
  generate(
    req: CreateCompletionRequest,
    ...args: any[]
  ): Promise<CreateCompletionResponse<any>>;
}

export type CreateEmbeddingsRequest = {
  input: Document[] | Document | string | string[];
};

export type CreateEmbeddingsResponse<T> = {
  documents: EmbeddedDocument[];
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

export interface TranscriptionModelProvider extends ModelProvider {
  transcribe(
    req: CreateTranscriptionRequest,
    ...args: any[]
  ): Promise<CreateTranscriptionResponse<any>>;
}

export interface CreateTranscriptionResponse<T extends any> {
  text: string;
  providerResponse: T;
}

export interface CreateTranscriptionRequest {
  filePath: string;
}

export interface TranslationModelProvider extends ModelProvider {
  translate(
    text: string,
    ...args: any[]
  ): Promise<{ text: string; providerResponse: any }>;
}
